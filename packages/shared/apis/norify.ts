import { ApiBase } from '../consts';
// 邮件
export const SEND_EMAIL_CODE = ApiBase + '/mail/open/sendRegisterCode'; // 获取邮箱验证码

// 短信
export const MESSAGE_SEND = ApiBase + '/sms/open/send'; // 发送验证码
export const MESSAGE_VERIFY = ApiBase + '/sms/open/verify'; // 发送验证码
