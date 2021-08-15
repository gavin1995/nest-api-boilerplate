CREATE DATABASE IF NOT EXISTS `nest_api_boilerplate`;

USE nest_api_boilerplate;

DROP TABLE IF EXISTS `nab_user`;
CREATE TABLE `nab_user` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `nickname` varchar(64) DEFAULT NULL COMMENT '昵称',
  `real_name` varchar(32) DEFAULT NULL COMMENT '真实姓名',
  `phone_number` varchar(11) DEFAULT NULL COMMENT '手机号',
  `username` varchar(64) NOT NULL COMMENT '用户名',
  `email` varchar(128) DEFAULT NULL COMMENT '邮箱',
  `password` varchar(32) NOT NULL COMMENT '登录密码',
  `avatar` varchar(1024) DEFAULT NULL COMMENT '头像图片地址',
  `gender` TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '性别，1：男，2：女',
  `is_admin` TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否是超管: 0/1 否/是',
  `is_delete` TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '未删除/已删除: 0/1',
  `updater_id` INT(11) DEFAULT NULL COMMENT '最后更新人ID',
  `created_at` DATETIME NOT NULL COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL COMMENT '更新时间',
  KEY(username, is_delete),
  KEY(email, is_delete),
  KEY(real_name, is_delete)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';
