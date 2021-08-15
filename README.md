<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## 简介

[Nest8](https://github.com/nestjs/nest) rest api 模板项目

其它参考：[官网文档](https://docs.nestjs.com/) || [Nest8中文文档](https://docs.nestjs.cn/8/introduction) 

## 快速开始

```bash
# 项目初始化
$ git clone git@github.com:gavin1995/nest-api-boilerplate.git your-project

# 移除.git
$ cd your-project && rm -rf .git

# 安装依赖
$ npm install

# 配置mysql、redis、启动信息等
$ vim config/config.dev.ts

# 本地调试
$ npm run start:dev
```

## 使用

### 项目结构说明

```txt
nestjs-rest-api-boilerplate
│── config # 区分环境的全局配置
│── src
│   │── decorators # 自定义装饰器，主要用于：传递数据、使用管道
│   │── exceptions # 自定义错误处理，用于：自定义异常类
│   │── filters # 自定义异常过滤器，用于：处理不同的异常，通常不同异常响应内容可能不同(status、code、message)
│   │── interceptors # 自定义拦截器
│   │── interfaces # 存放全局interface
│   │── modules # nest模块，通过控制器、服务等处理请求
│   │── pipes # 自定义管道，主要用于：数据转换、验证
│   │── providers # 自定义provider，主要用于：提供各种通用服务。如：缓存、es、日志等
│   │── public # 需要直接展示访问的文件可以放到这里，访问示例：http://localhost:7009/public/demo.html
│   │── shared # 公共函数、枚举、常量等
│   │── views # 支持使用ejs模板做服务端页面渲染
```

### Swagger

启动项目后，默认地址：[http://localhost:7009/swagger](http://localhost:7009/swagger)

### 接口调用示例

**创建用户**

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"phoneNumber":"18888888888","password":"pwd123456"}' \
  http://localhost:7009/user
```

**其它示例接口请参考[swagger](http://localhost:7009/swagger)**

## 响应数据格式说明

统一格式目的：方便客户端做统一处理

### 正常数据返回，统一格式：

```json
{
    "//success": "success+code用于做是否展示错误信息的判断",
    "success": true,
    "code": 200,
    "//data": "data的类型为any。对于不需要返回数据的修改接口，修改状态请使用data，不要使用success",
    "data": {}
}
```

### 错误数据返回，普通格式：

```json
{
    "success": false,
    "//code": "code 除了可以为http响应状态码，还可以为前后端商议拟定的特殊code，如一些不需要展示错误信息的一些特殊场景：1.强制用户token失效，跳转到登录页；2.APP处理特殊code，跳转强制更新等",
    "code": 400,
    "message": "用户已存在"
}
```

## 错误处理

### 尽可能使用nest内置异常

参考：[https://docs.nestjs.com/exception-filters#built-in-http-exceptions](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)

### 特殊code错误

使用场景示例：

* 应用拿到特殊code，直接跳转到登录页
* 应用拿到特殊code，需要强制更新

```ts
// 通常不会直接像如下直接写值，而是使用一堆定义好的常量（通常为前后端一起拟定）
throw new SpecialException({ status: 400, message: '需要强制更新', code: 1001 })
```

### 针对不同类型内置错误做不同错误响应

**controller类或方法加如下装饰器**

```ts
import { HandleErrorMessage } from '@/decorators/handle-error-message.decorator';

// 当`UserController`中触发`SequelizeUniqueConstraintError`错误时，响应的message为`用户已存在`
@HandleErrorMessage({
  SequelizeUniqueConstraintError: '用户已存在'
})
export class UserController {}
```

**为HandleErrorMessage添加更多支持的错误类型**

```ts
// src/shared/constant/error.ts

export type TError = {
  code: number,
  message: string,
  status: number,
}

export type ErrorMessageMap = {
  SequelizeUniqueConstraintError?: string | TError,
  OtherError?: string | TError,
}

// 默认响应
export const defaultErrorMessageMap = {
  SequelizeUniqueConstraintError: '已存在', // string类型，只改变响应的message
  OtherError: { code: 1001, message: '需要强制更新', status: 400 }, // TError可以定义更多的响应信息
}
```

### 针对数据表中Unique属性

**使用UniquePipe防止innodb行锁+unique导致ID自增发生跳跃**

```ts
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new UniquePipe({ // 用于根据某些条件检验数据库是否已经存在相同数据
    selector: { nickname: 'nickname' }, // key为Model对应的属性名，value为用于取值query/body/params的属性名
    errorMessage: '昵称已存在',
    model: UserModel
  }))
  editNickname(@User('id') id: number, @Body body: UserNicknameDto): Promise<Boolean> {
    return this.userService.editUserNickname(id, body.nickname);
  }
}
```

## 日志

### 示例

```ts
@Injectable()
export class TestService {
  constructor(
    private readonly configService: ConfigService
  ) {}
    
  async test(): Promise<Test> {
    try {
      return await fetch.xxxapi();
    } catch (e) {
      this.logger.error('error', e);      
    }
  }
}
```

### 格式修改

```ts
// src/providers/logger/winston.utilities.ts
// 增加format
// 切换配置
```

## 缓存

### 使用示例

```ts
export class CacheTestService {
  constructor(
    private readonly redisService: RedisService,
  ) {}
  
  async test(): Promise<void> {
    const redisClient = await this.redisService.getClient();
    await redisClient.get('redis_test_key');
  }
}
```

## 数据表

**请参考`src/modules/user/user.entity.ts`**

### 增加entity

需要将增加的entity类添加到`src/providers/database/database.provider.ts`中`sequelize.addModels`行的数组中进行绑定

### 注意

默认不开启数据库同步，若开启数据库同步，当`entity`类中属性更改时，相应数据表的字段也会更改，请谨慎操作

## 权限

本模板采用jwt控制权限

### 添加权限控制

```ts
import { Auth } from '@/decorators/auth.decorator';

export class UserController{
  @Auth()
  async authTest() {} 
}
```

### 取出当前登录用户的ID

```ts
import { Auth } from '@/decorators/auth.decorator';
import { User } from '@/decorators/user.decorator';

export class UserController{
  // 不传入参数，默认取出整个user
  @Auth()
  async authTest(@User('id') id: number) {}
}
```

## 接口文档

此模板使用swagger，使用示例（以`Api`打头的装饰器）：

```ts
@Controller('user')
@ApiTags('用户')
export class UserController {
  @Post('/')
  @ApiOperation({ summary: '注册', description: '用户注册' })
  @ApiOkResponse({ type: UserLoginResponse })
  register(@Body() body: UserCreateDto): Promise<UserLoginResponse> {
    return this.userService.create(body);
  }
}
```

### 访问文档

访问：[http://localhost:7009/swagger](http://localhost:7009/swagger)

### 更改访问信息

需要修改`src/main.ts`中，swagger相关的配置

## 其它功能
 
### 敏感词过滤

**使用SensitiveWordFilteredBody**

```ts
/**
* filterKey: 需要做敏感词过滤的属性。如需要做深层过滤，例：{ a: { b: { c: '敏感词' }}}，则：filterKey: 'a.b.c'
* errorMessage: 包含敏感词时的错误提示
*/
editNickname(@User('id') id: number, @SensitiveWordFilteredBody([{ filterKey: 'nickname', errorMessage: '昵称不能包含敏感词' }]) body: UserNicknameDto): Promise<Boolean> {
  return this.userService.editUserNickname(id, body.nickname);
}
```

**添加更多的敏感词库**

词库参考：[https://github.com/fighting41love/funNLP](https://github.com/fighting41love/funNLP)

```ts
// src/shared/constant/sensitive-words.ts

export const sensitiveWords = [
  '敏感词',
  '很敏感'
];
```


