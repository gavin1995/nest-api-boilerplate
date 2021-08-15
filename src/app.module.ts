import { Module } from '@nestjs/common';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from '@/providers/logger';
import * as winston from 'winston';
import { RedisModule } from 'nestjs-redis';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user-demo/user.module';
import { ConfigModule } from './providers/config/config.module';

import cfg from '../config';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
      ]
    }),
    RedisModule.register(cfg.redis),
    ConfigModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
