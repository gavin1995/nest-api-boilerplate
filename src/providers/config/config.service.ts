import { Injectable } from '@nestjs/common';

import config from '../../../config';

@Injectable()
export class ConfigService {
  get databaseConfig() {
    return config.database;
  }

  get jwtConfig() {
    return { jwtPrivateKey: config.jwtPrivateKey };
  }

  get saltConfig() {
    return config.salt;
  }

  get appConfig() {
    return config.app;
  }

  get crossDomainConfig() {
    return config.crossDomain;
  }

  get redisConfig() {
    return config.redis;
  }

  get loggerConfig() {
    return config.logger;
  }

  get aliCloudConfig() {
    return config.aliCloud;
  }
}
