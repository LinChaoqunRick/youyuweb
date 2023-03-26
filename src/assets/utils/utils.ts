import {nextTick} from 'vue';
import dayjs from "dayjs";
import axios from "axios";
import store from "@/store/index";
import type {ossType} from '../../types/oss'

export function getElementLeft(element: HTMLElement) {
  let actualLeft: number = element.offsetLeft;
  let current: HTMLElement | null = element.offsetParent;

  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }

  return actualLeft;
}

export function getElementTop(element: HTMLElement) {
  let actualTop: number = element.offsetTop;
  let current: HTMLElement | null = element.offsetParent;

  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  return actualTop;
}

export function scrollToEle(top: number, behavior: ScrollBehavior = 'smooth') {
  window.scrollTo({top, behavior})
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
  endPos = startPos
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
  }
) => {
  const {deviationStart = 0, deviationEnd = 0, direct = false, select = false} = params;
  // 返回值
  let res = '';
  if (dom.selectionStart || dom.selectionStart === 0) {
    const startPos = dom.selectionStart;
    const endPos = dom.selectionEnd || 0;

    const {
      prefixVal = dom.value.substring(0, startPos),
      subfixVal = dom.value.substring(endPos, dom.value.length)
    } = params;

    res = prefixVal + tarValue + subfixVal;

    // 设置光标位置
    setPosition(
      dom,
      // 选中值开始位置为设定开始，否者为结束位置
      select ? startPos + deviationStart : startPos + tarValue.length + deviationEnd,
      startPos + tarValue.length + deviationEnd
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

/**
 * 创建文件存储路径
 * @param rootDir bucket的根目录
 * @param fileName 文件名
 */
export function createFileName(fileName: string) {
  return dayjs(new Date()).format('YYYYMMDDHHmmss') + '_' + fileName;
}

/**
 * 创建文件前缀
 * @param fileName
 */
// export function createFileName(fileName: string) {
//   return dayjs(new Date()).format('YYYYMMDDHHmmss') + '_';
// }

interface policy {
  policy: string
  signature: string
  accessKeyId: string
  key: string
  dir: string
  host: string
  success_action_status: string
}

export async function uploadToOss(files: File[]) {
  let data: ossType = {}

  await store.dispatch("getOssPolicy").then(res => {
    data = res.data;
  })

  return await Promise.all(
    files.map((file) => {
      const file_name = createFileName(file.name);
      const form = new FormData();
      form.append('policy', data.policy);
      form.append('signature', data.signature);
      form.append('ossaccessKeyId', data.OSSAccessKeyId);
      form.append('key', data.dir + file_name);
      form.append('dir', data.dir);
      form.append('host', data.host);
      form.append('success_action_status', '200');
      // form.append('callback', '');
      form.append('file', file);

      return axios
        .post(data.host, form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => ({url: `${data.host}/${data.dir}${file_name}`}))
        .catch((error) => error);
    })
  );
}

export function getMarkDownImages(content: string) {
  const images = [];
  const pattern = /!\[(.*?)]\((https?:\/\/.+\.(png|jpe?g|webp|gif|svg))(.*\))/gi;
  let matcher;
  while ((matcher = pattern.exec(content)) !== null) {
    images.push({alt: matcher[1], url: matcher[2]});
  }
  return images;
}


// 给元素添加class名称 el:要添加类名的元素 cn:添加的样式名称
export const addClass = (el: HTMLElement, cn: string) => {
  el.classList.add(cn);
}

// 删除元素class名称 el:要删除类名的元素 cn:删除的样式名称
export const removeClass = (el: HTMLElement, cn: string) => {
  el.classList.remove(cn);
}

// 判断元素是否有某个类名 el:要判断类名的元素 cn:判断的样式名称
function hasClass(el: HTMLElement, cn: string) {
  let reg = new RegExp("\\b" + cn + "\\b")
  return reg.test(el.className)
}

/**
 * 随机颜色
 */
export const randomColor = () => {
  return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}

/**
 * 16进制色值获取反色设置方法
 * @param  {String} oldColor 为16进制色值的字符串（例：'#000000'）
 * @return {String} 返回反色的色值（例：'#ffffff'）
 */
export const colorReverse = (color: string) => {
  const reverseColor: string = '0x' + color.replace(/#/g, '');
  let str = '000000' + (0xFFFFFF - reverseColor).toString(16);
  return '#' + str.substring(str.length - 6, str.length);
}
