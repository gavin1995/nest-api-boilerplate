import { UnauthorizedException, createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Admin = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (!user.isAdmin) throw new UnauthorizedException('权限不足');
    return data ? user && user[data] : user;
  },
);
