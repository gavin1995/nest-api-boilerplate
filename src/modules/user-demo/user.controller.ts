import { ApiOperation, ApiTags, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Controller, Get, Body, Put, Request, Response, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { HandleErrorMessage } from '@/decorators/handle-error-message.decorator';
import { Auth } from '@/decorators/auth.decorator';
import { UserSimpleChangeDto, UserListQueryDto, UserBatchGetDto, UserCreateDto } from './user.dto';
import { HttpResultPagination, IHttpResultPagination } from '@/interfaces/http.interface';
import { UserBase, UserLoginResponse } from './user.interface';
import { QueryToNumber } from '@/decorators/query-to-number.decorator';
import { User as UserModel } from './user.entity';
import { Admin } from '@/decorators/admin.decorator';
import { Post } from '@nestjs/common';

@Controller('user')
@ApiTags('用户')
@HandleErrorMessage({
  SequelizeUniqueConstraintError: '用户已存在'
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  @ApiOperation({ summary: '注册', description: '用户注册' })
  @ApiOkResponse({ type: UserLoginResponse })
  register(@Body() body: UserCreateDto): Promise<UserLoginResponse> {
    return this.userService.create(body);
  }

  @Get('/')
  @ApiOperation({ summary: '列表', description: '用户列表' })
  @ApiQuery({ type: UserListQueryDto })
  @ApiOkResponse({ type: HttpResultPagination(UserBase) })
  @Auth()
  list(@Admin() user: UserModel, @QueryToNumber([]) query: UserListQueryDto): Promise<IHttpResultPagination<UserBase>> {
    return this.userService.getList(query);
  }

  @Delete('/')
  @ApiOperation({ summary: '删除', description: '用户删除' })
  @ApiOkResponse({ type: Boolean })
  @Auth()
  delete(@Admin() user: UserModel, @Body() body: UserSimpleChangeDto): Promise<Boolean> {
    return this.userService.deleteUserById(user, body.id);
  }

  @Put('/admin')
  @ApiOperation({ summary: '设置为超管', description: '设置为超管' })
  @ApiOkResponse({ type: Boolean })
  @Auth()
  setAdmin(@Admin() user: UserModel, @Body() body: UserSimpleChangeDto): Promise<Boolean> {
    return this.userService.setAdminById(user, body.id);
  }

  @Get('/batchGet')
  @ApiOperation({ summary: '批量查询', description: '根据ID列表批量查询' })
  @ApiQuery({ type: UserBatchGetDto })
  @ApiOkResponse({ type: [UserBase] })
  @Auth()
  batchGet(@Admin() user: UserModel, @QueryToNumber([]) query: UserBatchGetDto): Promise<UserBase[]> {
    return this.userService.batchGet(query);
  }
}
