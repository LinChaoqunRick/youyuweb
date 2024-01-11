import axios from "axios";
import store from "@/store";
import {message} from "ant-design-vue";
import dayjs from "dayjs";

export const isImageFile = (file: File) => {
  // 检查图片类型
  const isJPG = file.type === 'image/jpeg';
  const isPNG = file.type === 'image/png';
  const isBMP = file.type === 'image/bmp';
  const isGIF = file.type === 'image/gif';
  const isWEBP = file.type === 'image/webp';
  return isJPG || isPNG || isBMP || isGIF || isWEBP;
};

export interface ossType {
  policy?: string,
  signature?: string,
  OSSAccessKeyId?: string,
  dir?: string,
  host?: string,
}

interface policy {
  policy: string
  signature: string
  accessKeyId: string
  key: string
  dir: string
  host: string
  success_action_status: string
}

interface uploadConfig {
  accept?: string,
  maxSize?: number,

}

/**
 * 创建文件存储路径
 * @param rootDir bucket的根目录
 * @param fileName 文件名
 */
export function createFileName(fileName: string) {
  return dayjs(new Date()).format('YYYYMMDDHHmmss') + '_' + fileName;
}

export async function uploadToOss(files: File[], config: uploadConfig) {
  // 文件校验
  for (const file of files) {
    const fileNameArr = file.name.split('.');
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
  let data: ossType = {}
  const hide = message.loading('上传中...', 0);
  await store.dispatch("getOssPolicy").then(res => {
    data = res.data;
  })

  // 上传步骤2： 上传文件至oss
  return await Promise.all(
    files.map(async (file) => {
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

      try {
        const res = await axios
          .post(data.host, form, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        return ({url: `${data.host}/${data.dir}${file_name}`});
      } catch (error) {
        return error;
      } finally {
        hide();
      }
    })
  );
}

/*
const uploadImage = (file: File, config: Config): any => {
  const fileNameArr = file.name.split('.');
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
  const hide = message.loading('上传中...', 0);
  store.dispatch("getOssPolicy").then(res => {
    filename.value = createFileName(file.name);
    res.data.key = res.data.dir + filename.value;
    res.data.success_action_status = 200;
    data.value = res.data;
  }).catch((error) => {
    console.log(error);
  }).finally(() => {
    hide();
  });

  const formData = new FormData();
  formData.append('image', file);

  axios.post('your_upload_url', formData)
    .then(response => {
      // 处理上传成功的逻辑
      console.log('上传成功');
    })
    .catch(error => {
      console.error('上传失败', error);
    });
}*/
