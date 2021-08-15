import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { User } from '@/modules/user-demo/user.entity';

import cfg from '../../../config';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({ ...cfg.database });
      sequelize.addModels([
        User,
      ]);
      // await sequelize.sync(); // 不需要同步
      return sequelize;
    },
  },
];
