import {
  Column,
  Model,
  Table,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { EGender, EBoolean } from '@/shared/enum';

@Table({
  tableName: 'nab_user',
  comment: '用户表',
  charset: 'utf8mb4',
  underscored: true
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, comment: '用户ID' })
  id: number;

  @Column({ type: DataType.STRING(64), defaultValue: null, comment: '昵称' })
  nickname: string;

  @Column({ field: 'real_name', type: DataType.STRING(32), defaultValue: null, comment: '真实姓名' })
  realName: string;

  @Column({ field: 'phone_number', type: DataType.STRING(11), defaultValue: null, comment: '手机号' })
  phoneNumber: string;

  @Column({ type: DataType.STRING(64), allowNull: false, comment: '用户名' })
  username: string;

  @Column({ type: DataType.STRING(128), defaultValue: null, comment: '邮箱' })
  email: string;

  @Column({ type: DataType.STRING(32), allowNull: false, comment: '登录密码' })
  password: string;

  @Column({ type: DataType.STRING(1024), defaultValue: null, comment: '头像图片地址' })
  avatar: string;

  @Column({ type: DataType.TINYINT.UNSIGNED, defaultValue: 0, comment: '性别，1：男，2：女' })
  gender: EGender;

  @Column({ field: 'is_admin', type: DataType.TINYINT.UNSIGNED, defaultValue: EBoolean.N, comment: '是否是超管: 0/1 否/是' })
  isAdmin: EBoolean;

  @Column({ field: 'is_delete', type: DataType.TINYINT.UNSIGNED, defaultValue: EBoolean.N, comment: '未删除/已删除: 0/1' })
  isDelete: EBoolean;

  @Column({ field: 'updater_id', type: DataType.INTEGER, defaultValue: null, comment: '最后更新人' })
  updaterId: number;

  @CreatedAt
  @Column({ field: 'created_at', type: DataType.DATE, allowNull: false, comment: '创建时间' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at', type: DataType.DATE, defaultValue: null, comment: '更新时间' })
  updatedAt: Date;
}
