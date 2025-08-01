import { nextTick } from 'vue';

import { message } from 'ant-design-vue';

import type { ClipboardCopyOptions } from '@/assets/utils/types';
import store from '@/store/index';

export function getElementLeft(element: HTMLElement) {
  let actualLeft: number = element.offsetLeft;
  let current: HTMLElement = element.offsetParent as HTMLElement;

  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent as HTMLElement;
  }

  return actualLeft;
}

export function getElementTop(element: HTMLElement) {
  let actualTop: number = element.offsetTop;
  let current: HTMLElement = element.offsetParent as HTMLElement;

  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent as HTMLElement;
  }

  return actualTop;
}

export function scrollToTop(top: number, behavior: ScrollBehavior = 'smooth') {
  window.scrollTo({ top, behavior });
}

export function scrollToEle(element: HTMLElement, offset: number = 0, behavior: ScrollBehavior = 'smooth') {
  window.scrollTo({ top: getElementTop(element) - offset, behavior });
}

/**
 *
 * 设置foucs位置/选中元素
 *
 * @param tarDom 目标元素
 * @param startPos 选中开始位置
 * @param endPos 结束位置
 */
export const setPosition = (
  tarDom: HTMLInputElement | HTMLTextAreaElement,
  startPos = 0,
  endPos = startPos,
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (tarDom.setSelectionRange) {
      // setTimeout必须写，不然setSelectionRange无效
      // https://stackoverflow.com/questions/11723420/chrome-setselectionrange-not-work-in-oninput-handler
      setTimeout(() => {
        tarDom.setSelectionRange(startPos, endPos);
        tarDom.focus();
        resolve(true);
      }, 0);
    } else {
      console.error('Can not reset position!');
      reject();
    }
  });
};

/**
 *
 * 从focus位置插入元素
 *
 * @param dom 需要插入的input或textarea元素
 * @param tarValue 插入的目标值
 * @param params 光标定位偏移
 * @returns 插入后的值
 */
export const insert = (
  dom: HTMLInputElement | HTMLTextAreaElement,
  tarValue: string,
  params: {
    deviationStart?: number;
    deviationEnd?: number;
    select?: boolean;
    direct?: boolean;
    prefixVal?: string; // 前半部分内容
    subfixVal?: string; // 后半部分内容
  },
) => {
  const { deviationStart = 0, deviationEnd = 0, direct = false, select = false } = params;
  // 返回值
  let res = '';
  if (dom.selectionStart || dom.selectionStart === 0) {
    const startPos = dom.selectionStart;
    const endPos = dom.selectionEnd || 0;

    const { prefixVal = dom.value.substring(0, startPos), subfixVal = dom.value.substring(endPos, dom.value.length) } =
      params;

    res = prefixVal + tarValue + subfixVal;

    // 设置光标位置
    setPosition(
      dom,
      // 选中值开始位置为设定开始，否者为结束位置
      select ? startPos + deviationStart : startPos + tarValue.length + deviationEnd,
      startPos + tarValue.length + deviationEnd,
    );
  } else {
    res += tarValue;
  }

  if (direct) {
    dom.value = res;
  }

  return res;
};

/**
 * 保持原来的滚动高度
 */
export async function keepScrollTop() {
  const originScrollTop = document.documentElement.scrollTop;
  await nextTick();
  document.documentElement.scrollTop = originScrollTop;
}

export function getMarkDownImages(content: string) {
  const images = [];
  const pattern = /!\[(.*?)]\((https?:\/\/.+\.(png|jpe?g|webp|gif|svg))(.*\))/gi;
  let matcher;
  while ((matcher = pattern.exec(content)) !== null) {
    images.push({ alt: matcher[1], url: matcher[2] });
  }
  return images;
}

// 给元素添加class名称 el:要添加类名的元素 cn:添加的样式名称
export const addClass = (el: HTMLElement, ...cn: string[]) => {
  for (const name of cn) {
    el.classList.add(name);
  }
};

// 删除元素class名称 el:要删除类名的元素 cn:删除的样式名称
export const removeClass = (el: HTMLElement, ...cn: string[]) => {
  for (const name of cn) {
    el.classList.remove(name);
  }
};

// 判断元素是否有某个类名 el:要判断类名的元素 cn:判断的样式名称
function hasClass(el: HTMLElement, cn: string) {
  const reg = new RegExp('\\b' + cn + '\\b');
  return reg.test(el.className);
}

/**
 * 随机颜色
 */
export const randomColor = () => {
  return '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6);
};

/**
 * 16进制色值获取反色设置方法
 * @return {String} 返回反色的色值（例：'#ffffff'）
 * @param color 需要反转的颜色
 */
export const colorReverse = (color: string): string => {
  const reverseColor: number = Number('0x' + color.replace(/#/g, ''));
  const str = '000000' + (0xffffff - reverseColor).toString(16);
  return '#' + str.substring(str.length - 6, str.length);
};

/**
 * 判断body是否存在滚动条
 */

export function hasScroll() {
  return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
}

/**
 * 禁用body滚动
 */
export function disabledBodyScroll() {
  const appScroll = hasScroll();
  addClass(document.body, appScroll ? 'scrolling-effect-scroll' : 'scrolling-effect-noscroll');
}

/**
 * 恢复body滚动
 */
export function enabledBodyScroll() {
  removeClass(document.body, 'scrolling-effect-scroll', 'scrolling-effect-noscroll');
}

/**
 * 检查是否登录，如果没登录，弹出登录框
 * @param e
 */
export const onCheckLogin = (e: Event) => {
  if (!store.getters.isLogin) {
    store.commit('changeLogin', true);
    if (e && e.stopPropagation) {
      e.stopPropagation();
    } else {
      window.event && (window.event.cancelBubble = true);
    }

    if (e && e.preventDefault) {
      e.preventDefault();
    } else {
      window.event && (window.event.returnValue = false);
    }
  }
};

/**
 * 滚动到anchor位置
 */
export const scrollToAnchor = () => {
  let anchor = window.location.hash.slice(1); // 获取URL中的锚点
  if (anchor) {
    anchor = decodeURIComponent(anchor);
    nextTick(() => {
      const anchorElement = document.getElementById(anchor);
      if (anchorElement) {
        scrollToEle(anchorElement, 58, 'smooth');
      }
    });
  }
};

const defaultCopyOptions: ClipboardCopyOptions = {
  showTips: true,
};

/**
 * 复制到粘贴板
 * @param text 需要复制的文本
 * @param config 复制操作的配置
 */
export async function copyToClipboard(text: string, config?: ClipboardCopyOptions) {
  const copyOptions: ClipboardCopyOptions = Object.assign({}, defaultCopyOptions, config);
  let success: boolean = false;
  try {
    // 使用writeText方法复制文本
    await navigator.clipboard.writeText(text);
    success = true;
  } catch (err) {
    // 如果出现错误，比如用户拒绝了权限请求，则会进入catch块
    success = false;
  }

  if (copyOptions.showTips) {
    message.success(success ? '复制成功!' : '复制失败!');
  }

  return success;
}
