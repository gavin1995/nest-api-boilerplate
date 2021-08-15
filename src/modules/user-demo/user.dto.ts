import { PageRequestDto } from '@/dtos/http.dto';
import { VNumber, VString } from '@/decorators/validate.decorator';
import { IsMobilePhone, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


// 用户注册信息传输对象
export class UserCreateDto {
  // 参考文档：https://github.com/validatorjs/validator.js/blob/master/lib/isMobilePhone.js
  @IsMobilePhone('zh-CN', { strictMode: false }, { message: '请输入正确的手机号' })
  @ApiProperty({ description: '手机号' })
  readonly phoneNumber: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  @MinLength(6, { message: '密码最少为6位' })
  readonly password: string;
}


// 用户列表查询
export class UserListQueryDto extends PageRequestDto {
  @VNumber('用户ID', false)
  readonly id?: number;

  @VString('用户真实姓名', false)
  readonly realName?: string;
}

export class UserSimpleChangeDto {
  @VNumber('用户ID')
  readonly id: number;
}

// 批量查询
export class UserBatchGetDto {
  @IsString()
  @MinLength(1)
  @MaxLength(1024)
  @ApiProperty({ description: '用户ID列表字符串(逗号分隔)' })
  readonly ids: string;
}
