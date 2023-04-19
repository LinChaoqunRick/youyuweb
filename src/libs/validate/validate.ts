import type {Rule} from 'ant-design-vue/es/form';

const domainRegExp = new RegExp("^((http://)|(https://))?([a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,6}(/?)");
const telephone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;

// 至少八个字符，至少一个字母和一个数字：
const password1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/;
// 至少八个字符，至少一个字母，一个数字和一个特殊字符：
const password2 = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,30}$/;
// 最少八个字符，至少一个大写字母，一个小写字母和一个数字：
const password3 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
// 至少八个字符，至少一个大写字母，一个小写字母，一个数字和一个特殊字符：
const password4 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;

export const checkDomain = async (_rule: Rule, value: string) => {
  if (!domainRegExp.test(value)) {
    return Promise.reject('请输入有效的域名如：https://www.youyul.com');
  } else {
    return Promise.resolve();
  }
};

export const checkTelephone = async (_rule: Rule, value: string) => {
  if (!telephone.test(value)) {
    return Promise.reject('请输入正确的手机号');
  } else {
    return Promise.resolve();
  }
};

export const checkPassword = async (_rule: Rule, value: string) => {
  if (!password2.test(value)) {
    return Promise.reject('8-30位，必须包含字母、数字、特殊字符');
  } else {
    return Promise.resolve();
  }
};

