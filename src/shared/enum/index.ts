// Bool枚举
export enum EBoolean {
  N,
  Y
}

// 删除状态
export enum EDeleteStatus {
  UnDeleted, // 未删除
  Deleted, // 已删除
}

// 性别枚举
export enum EGender {
  Male = 1,
  Female
}

// 应用模板类型
export enum ETemplateAppType {
  OperateAdmin = 1, // 应用后台
  Internal, // 对内后台
  External, // 对外后台
  DataScreen, // 数据大屏
  PC, // PC网页
  Phone, // 手机网页
}

// 页面类型
export enum EPageType {
  PageMenu = 1, // 页面型菜单
  NoPageMenu, // 非页面型菜单
  PageMenuSubPage, // 菜单页面的子页面
}

// 页面Schema类型
export enum EGSchemaType {
  List = 1, // 列表型页面Schema
  Form, // 表格型页面Schema
  Detail, // 详情页型页面Schema
  DataScreen, // 数据大屏型Schema
}

// 应用下用户类型
export enum EAppUserType {
  Manage = 1, // 管理员
  General, // 普通编辑者
}

// 消息类型
export enum EMessageType {
  PagePublish = 1, // 页面发布
  Notice, // 公告
}

// 消息状态
export enum EMessageStatus {
  Untreated = 1, // 未处理
  Passed, // 已通过
  Rejected, // 已拒绝
  Ignored, // 已忽略
}
