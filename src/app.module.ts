import { Module } from '@nestjs/common';
// import { RedisModule } from 'nestjs-redis';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user-demo/user.module';
import { ConfigModule } from './providers/config/config.module';

import cfg from '../config';

@Module({
  imports: [
    // RedisModule.register(cfg.redis),
    ConfigModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
