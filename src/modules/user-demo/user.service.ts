import { Inject, Injectable, BadRequestException, Logger } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import * as _ from 'lodash';

import { User } from './user.entity';
import { JwtPayload } from './auth/jwt-payload.model';
import { ConfigService } from '@/providers/config/config.service';
import { random, str, md5 } from '@/shared/util';
import { WhereOptions, Op } from 'sequelize';
import { UserBatchGetDto, UserCreateDto, UserListQueryDto } from './user.dto';
import { IHttpResultPagination } from '@/interfaces/http.interface';
import { UserBase, UserLoginResponse } from './user.interface';
import { sequelizeListData, sequelizePaginationData } from '@/shared/util/format';
import { TIdToTextKey } from '@/shared/type';
import { EBoolean } from '@/shared/enum';

@Injectable()
export class UserService {
  private readonly jwtPrivateKey: string;

  constructor(
    @Inject('UserRepository')
    private readonly userRepository: typeof User,
    private readonly configService: ConfigService,
  ) {
    this.jwtPrivateKey = this.configService.jwtConfig.jwtPrivateKey;
  }

  // jwt签名
  private signToken(user: User): string {
    const payload: JwtPayload = {
      id: user.id,
      phoneNumber: user.phoneNumber,
    };

    return sign(payload, this.jwtPrivateKey, {});
  }

  // 根据用户名、密码创建用户
  async create(userCreateDto: UserCreateDto) {
    const user = new User();
    user.phoneNumber = userCreateDto.phoneNumber;
    user.username = userCreateDto.phoneNumber;
    user.nickname = random.generateNickname(str.getPhoneNumberEnd(userCreateDto.phoneNumber));
    user.password = md5.generatePassword(userCreateDto.password);
    const userData: User = await user.save();
    const token = await this.signToken(userData);
    return new UserLoginResponse(userData, token);
  }


  // 根据条件查询用户
  private getUserByWhere($where: WhereOptions): Promise<User> {
    return this.userRepository.findOne<User>({
      where: $where,
    });
  }

  // 获取用户列表
  async getList(userListQueryDto: UserListQueryDto): Promise<IHttpResultPagination<UserBase>> {
    const $where: any = {
      isDelete: EBoolean.N,
    }
    if (userListQueryDto.id) $where.id = userListQueryDto.id;
    if (userListQueryDto.realName) {
      $where.realName = {
        [Op.like]: `%${userListQueryDto.realName}%`
      };
    }
    const res = await this.userRepository.findAndCountAll({
      where: $where,
      offset: (userListQueryDto.page - 1) * userListQueryDto.pageSize,
      limit: userListQueryDto.pageSize,
      order: [['created_at', 'ASC']]
    });
    return sequelizePaginationData(res, UserBase);
  }

  // 根据ID批量获取用户信息
  async batchGet(userBatchGetDto: UserBatchGetDto): Promise<UserBase[]> {
    // TODO: class-validator的@Matches有问题，手动判断
    if (!/^\d+(,\d+)*$/.test(userBatchGetDto.ids)) throw new BadRequestException('用户ID错误');
    const ids = userBatchGetDto.ids.split(',').map(i => parseInt(i));
    if (ids.length > 100) throw new BadRequestException('最多批量查询一百位用户');
    const $where: any = {
      isDelete: EBoolean.N,
      id: ids,
    }
    const res = await this.userRepository.findAll({
      where: $where,
      order: [['created_at', 'ASC']]
    });
    return sequelizeListData(res, UserBase);
  }

  /**
   * DAO
   * @param email 用户邮箱
   */
  async findOneWithEmail(email: string): Promise<User> {
    return this.userRepository.findOne<User>({
      where: { email, isDelete: 0 },
    });
  }

  /**
   * 创建用户（如果已存在则直接返回）&& 返回bearer token
   */
  async createAndReturnToken(employeeId: number, email: string, realName: string, username: string, mobile: string, avatar = '') {
    let userModelData = await this.findOneWithEmail(email);
    if (!userModelData) {
      // 没有用户，新增
      const user = new User();
      user.email = email;
      user.realName = realName;
      user.username = username;
      user.phoneNumber = mobile;
      user.password = md5.generatePassword(random.generateString());
      userModelData = await user.save();
    }
    const token = this.signToken(userModelData);
    return new UserLoginResponse(userModelData, token);
  }

  // 根据手机号获取用户基本信息
  async getUserByPhoneNumber(phoneNumber: string): Promise<UserBase> {
    const user = await this.getUserByWhere({
      phoneNumber,
      isDelete: 0,
    });
    return new UserBase(user);
  }

  // 删除用户
  async deleteUserById(currentUser, id): Promise<boolean> {
    if (!currentUser.isAdmin) throw new BadRequestException('权限不足');
    if (currentUser.id === id) throw new BadRequestException('无法删除自己');
    const res = await this.userRepository.update({
      isDelete: EBoolean.Y,
      updatedAt: new Date(),
      updaterId: currentUser.id,
    }, {
      where: {
        id,
        isDelete: EBoolean.N,
      }
    });
    if (res[0] !== 1) throw new BadRequestException('删除失败，请重试');
    return true;
  }

  // 设置为超管
  async setAdminById(currentUser, id): Promise<boolean> {
    if (!currentUser.isAdmin) throw new BadRequestException('权限不足');
    if (currentUser.id === id) throw new BadRequestException('已是超管');
    const res = await this.userRepository.update({
      isAdmin: EBoolean.Y,
      updatedAt: new Date(),
      updaterId: currentUser.id,
    }, {
      where: {
        id,
        isDelete: EBoolean.N,
      }
    });
    if (res[0] !== 1) throw new BadRequestException('设置失败，请重试');
    return true;
  }

  // 为数据添加用户真实姓名
  async setUsersName(data, keys: Array<TIdToTextKey>): Promise<any> {
    let userIds = [];
    data.forEach(item => {
      keys.forEach(key => {
        if (!key.sourceKey || !item[key.sourceKey]) return;
        userIds.push(item[key.sourceKey]);
      })
    });
    userIds = _.uniq(userIds); // 去重
    if (userIds.length > 1000) throw new BadRequestException('最多批量查询一千位用户');
    const $where: any = {
      isDelete: EBoolean.N,
      id: userIds,
    }
    const res = await this.userRepository.findAll({
      where: $where,
      order: [['created_at', 'ASC']]
    });

    const users = [];
    res.forEach(item => {
      users[item.id] = item.realName;
    });

    data.forEach(item => {
      keys.forEach(key => {
        if (!key.textKey) return;
        item[key.textKey] = users[item[key.sourceKey]];
      })
    });

    return data;
  }
}
