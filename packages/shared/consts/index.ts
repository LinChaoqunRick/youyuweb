export const ApiBase = '/plat';

export enum LogType {
  INSERT = 1, // 插入日志
  UPDATE = 2, // 修改日志
  QUERY = 3, // 查询日志
  DELETE = 4, // 删除日志
  LOGIN = 5, // 登录日志
  LOGOUT = 6, // 登出日志
  REGISTER = 7, // 注册日志
  ACCESS = 8, // 访问网站
  NOTIFY_SMS = 9, // 短信通知
  NOTIFY_MAIL = 10, // 邮件通知
  UPLOAD = 20, // 文件上传
  OTHER = 66, // 其他
}

interface SMSType {
  name: string;
  label: string;
}

export const SMSTypes: Record<number, SMSType> = {
  0: { name: '通用', label: 'common' },
  1: { name: '注册账号', label: 'register' },
  2: { name: '修改密码', label: 'changePassword' },
  3: { name: '登录系统', label: 'login' },
  4: { name: '变更手机号_前置', label: 'changeTelephonePrev' },
  5: { name: '变更手机号_后置', label: 'changeTelephoneNext' },
};

export enum ActorType {
  USER = 0, // 用户
  VISITOR = 1, // 游客
}
