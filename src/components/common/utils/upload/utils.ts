import axios, {AxiosError} from "axios";
import store from "@/store";
import {message} from "ant-design-vue";
import dayjs from "dayjs";

export const isImageFile = (file: File) => {
  // 检查图片类型
  const isJPG = file.type === "image/jpeg";
  const isPNG = file.type === "image/png";
  const isBMP = file.type === "image/bmp";
  const isGIF = file.type === "image/gif";
  const isWEBP = file.type === "image/webp";
  return isJPG || isPNG || isBMP || isGIF || isWEBP;
};

export interface ossType {
  policy?: string;
  signature?: string;
  OSSAccessKeyId?: string;
  dir?: string;
  host?: string;
}

interface policy {
  policy: string;
  signature: string;
  accessKeyId: string;
  key: string;
  dir: string;
  host: string;
  success_action_status: string;
}

interface uploadConfig {
  accept?: string;
  maxSize?: number;
  needTip?: boolean;
  base?: string;
  progress?: Function;
}

/**
 * 创建文件存储路径
 * @param rootDir bucket的根目录
 * @param fileName 文件名
 */
export function createFileName(fileName: string) {
  return dayjs(new Date()).format("YYYYMMDDHHmmss") + "_" + fileName;
}

const defaultConfig = {
  accept: ".jpg, .jpeg, .png, .JPG, .PNG",
  maxSize: 20,
  needTip: true,
};

export async function uploadToOss(files: File[], config?: uploadConfig) {
  config = Object.assign({}, defaultConfig, config);

  if (!files) {
    throw new Error("parameter 'file' is required");
  }
  if (!Array.isArray(files)) {
    files = [files];
  }
  // 文件校验
  for (const file of files) {
    const fileNameArr = file.name.split(".");
    const suffix = fileNameArr[fileNameArr.length - 1];
    const nameLegal = config.accept.indexOf(suffix) > -1;
    if (!nameLegal) {
      message.error(`只能上传${config.accept}类型的文件`);
      return;
    }
    const sizeExceed = file.size / 1024 / 1024 < config.maxSize;
    if (!sizeExceed) {
      message.error(`文件大小不能大于${config.maxSize}MB`);
      return;
    }
  }

  // 上传步骤1： 获取oss临时凭证
  let data: ossType = {};
  let hide;
  let progressList = Array.from({length: files.length}).map((item) => 0);
  if (config.needTip) {
    hide = message.loading("上传中...", 0);
  }
  await store.dispatch("getOssPolicy", {base: config.base}).then((res) => {
    data = res.data;
  });

  // 上传步骤2： 上传文件至oss
  return await Promise.all(
    files.map(async (file: File, index: number) => {
      const file_name = createFileName(file.name);
      const form = new FormData();
      form.append("policy", data.policy);
      form.append("signature", data.signature);
      form.append("ossaccessKeyId", data.OSSAccessKeyId);
      form.append("key", data.dir + file_name);
      form.append("dir", data.dir);
      form.append("host", data.host);
      form.append("success_action_status", "200");
      // form.append('callback', '');
      form.append("file", file);

      try {
        const res = await axios.post(data.host, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Number(((progressEvent.loaded / progressEvent.total) * 100 | 0).toFixed(2));
            console.log(progress);
            progressList[index] = progress;
            config?.progress?.(progressList);
          },
        });
        return {url: `${data.host}/${data.dir}${file_name}`};
      } catch (error) {
        return error;
      } finally {
        hide && hide();
      }
    })
  ).then((res) => {
    const failedNumber = res.filter(item => item instanceof AxiosError).length;
    const successNumber = res.length - failedNumber;
    if (config.needTip) {
      const resultMessage = `共${res.length}个文件：成功 ${successNumber} 个，失败 ${failedNumber} 个`;
      message.info(resultMessage);
    }
    return res;
  });
}

const parseXml = (xml: string) => {
  const parser = new DOMParser();
  return parser.parseFromString(xml, 'text/xml');
}

export const getXmlTextContent = (xml: string, tag: string) => {
  const xmlDoc = parseXml(xml);
  const tagElement = xmlDoc.getElementsByTagName(tag)[0];
  return tagElement?.textContent;
}
