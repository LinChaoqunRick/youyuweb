export const ApiBase = '/plat';

export const enum LogType {
  INSERT = 1, // 插入日志
  UPDATE = 2, // 修改日志
  QUERY = 3, // 查询日志
  DELETE = 4, // 删除日志
  LOGIN = 5, // 登录日志
  LOGOUT = 6, // 登出日志
  REGISTER = 7, // 注册日志
  ACCESS = 8, // 访问网站
  NOTIFY = 9, // 通知日志
  UPLOAD = 10, // 文件上传
  OTHER = 66, // 其他
}
