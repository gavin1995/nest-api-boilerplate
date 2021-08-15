import { config as configDev } from './config/config.dev';
import { config as configTest } from './config/config.test';
import { config as configPre } from './config/config.pre';
import { config as configProd } from './config/config.prod';

const env = process.env.RUN_ENV || 'dev';

const configMap = {
  'dev': configDev,
  'test': configTest,
  'pre': configPre,
  'prod': configProd,
};

export default configMap[env];
