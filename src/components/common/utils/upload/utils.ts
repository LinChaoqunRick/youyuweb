export const isImageFile = (file: File) => {
  // 检查图片类型
  const isJPG = file.type === 'image/jpeg';
  const isPNG = file.type === 'image/png';
  const isBMP = file.type === 'image/bmp';
  const isGIF = file.type === 'image/gif';
  const isWEBP = file.type === 'image/webp';
  return isJPG || isPNG || isBMP || isGIF || isWEBP;
};
