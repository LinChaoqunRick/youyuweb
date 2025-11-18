const domainRegExp = /^((http:\/\/)|(https:\/\/))?([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}(\/?)/;
const telephone = /^(((13[0-9])|(15[0-9])|(18[0-9]))+\d{8})$/;
const emailRegExp = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/;

// 至少八个字符，至少一个字母和一个数字：
const password1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/;
// 至少八个字符，至少一个字母，一个数字和一个特殊字符：
const password2 = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,30}$/;
// 最少八个字符，至少一个大写字母，一个小写字母和一个数字：
const password3 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
// 至少八个字符，至少一个大写字母，一个小写字母，一个数字和一个特殊字符：
const password4 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*?&])[A-Za-z\d$@!%*?&]{8,}$/;

export const checkDomain = async (_rule: any, value: string) => {
  if (!domainRegExp.test(value)) {
    return Promise.reject(new Error('请输入有效的域名如：https://www.youyul.com'));
  }
  return Promise.resolve();
};

export const checkTelephone = async (_rule: any, value: string) => {
  if (!telephone.test(value)) {
    return Promise.reject(new Error('请输入正确的手机号'));
  }
  return Promise.resolve();
};

export const checkPassword = async (_rule: any, value: string) => {
  if (!password2.test(value)) {
    return Promise.reject(new Error('8-30位，必须包含字母、数字、特殊字符'));
  }
  return Promise.resolve();
};

export const checkEmail = async (_rule: any, value: string) => {
  if (!emailRegExp.test(value)) {
    return Promise.reject(new Error('邮箱格式不正确'));
  }
  return Promise.resolve();
};
