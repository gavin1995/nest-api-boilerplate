import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

export class UserSimple {
  @ApiProperty({ description: '用户ID' })
  readonly id: number;

  @ApiProperty({ description: '真实姓名' })
  readonly realName: string;

  constructor(user: User) {
    this.id = user.id;
    this.realName = user.realName;
  }
}

export class UserBase {
  @ApiProperty({ description: '用户ID' })
  readonly id: number;

  @ApiProperty({ description: '用户昵称' })
  readonly nickname: string;

  @ApiProperty({ description: '真实姓名' })
  readonly realName: string;

  @ApiProperty({ description: 'email' })
  readonly email: string;

  @ApiProperty({ description: '头像图片地址' })
  readonly avatar: string;

  @ApiProperty({ description: '用户名' })
  readonly username: string;

  @ApiProperty({ description: '是否是超管: 0/1 否/是' })
  readonly isAdmin: number;

  @ApiProperty({ description: '最后更新时间' })
  readonly updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.nickname = user.nickname;
    this.realName = user.realName;
    this.email = user.email;
    this.avatar = user.avatar;
    this.username = user.username;
    this.isAdmin = user.isAdmin;
    this.updatedAt = user.updatedAt;
  }
}

export class UserLoginResponse extends UserBase {
  @ApiProperty({ description: 'jwt token' })
  token: string;
  constructor(user: User, token: string) {
    super(user);
    this.token = token;
  }
}

export class UserDetails extends UserBase {
  @ApiProperty({ description: '手机号' })
  readonly phoneNumber: string;

  @ApiProperty({ description: '工作邮箱' })
  readonly email: string;

  @ApiProperty({ description: '性别，1：男，2：女' })
  readonly gender: number;

  @ApiProperty({ description: '最后更新人ID' })
  readonly updaterId: number;

  @ApiProperty({ description: '最后更新人' })
  readonly updater: string;

  @ApiProperty({ description: '创建时间' })
  readonly createdAt: Date;

  constructor(user: User) {
    super(user);
    this.phoneNumber = user.phoneNumber;
    this.email = user.email;
    this.gender = user.gender;
    this.updaterId = user.updaterId;
    this.createdAt = user.createdAt;
  }
}

export interface ISsoUserInfo {
  email: string;
  nickname: string;
  username: string;
  mobile: string;
}
interface IDepartmentItem {
  id: number;
  parentId: number;
  name: string;
  is_leaf: boolean;
}

export interface IEmployeeInfo {
  id: number;
  username: string;
  email: string;
  mobile: string;
  position: string;
  display_name: string;
  is_external: boolean;
  departments: IDepartmentItem[];
}
