import type {Rule} from 'ant-design-vue/es/form';

const domainRegExp = new RegExp("^((http://)|(https://))?([a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,6}(/?)");
const telephone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;

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

