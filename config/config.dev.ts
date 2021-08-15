import { Dialect } from 'sequelize';
import * as path from 'path';

import * as packageJson from '../package.json';

export const config = {
  salt: 'salt',
  jwtPrivateKey: 'jwtPrivateKey',
  aes: {
    key: 'key',
    iv: 'iv',
  },
  database: {
    dialect: 'mysql' as Dialect,
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nest_api_boilerplate',
    logging: false,
    timezone: '+08:00',
  },
  app: {
    port: 7009,
    name: packageJson.name,
    version: packageJson.version,
  },
  crossDomain: {
    allowedOrigins: [],
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
  logger: {
    path: path.join(__dirname, '../logs/nestjs-rest-api-'),
    daysToKeep: 30,
    pattern: 'yyyy-MM-dd.log',
    level: 'debug',
  },
  aliCloud: {
    smsAccessKeyId: 'smsAccessKeyId',
    smsSecretAccessKey: 'smsSecretAccessKey',
    smsSignName: 'smsSignName',
    smsTemplateCode: 'smsTemplateCode',
  },
};
