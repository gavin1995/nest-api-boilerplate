import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

export const Auth = () => {
  return applyDecorators(
    ApiBearerAuth(),
    UseGuards(AuthGuard('jwt'))
  );
}
