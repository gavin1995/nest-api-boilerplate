import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/providers/database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProvider } from './user.provider';
import { JwtStrategy } from '@/modules/user-demo/auth/jwt-strategy';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProvider, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
