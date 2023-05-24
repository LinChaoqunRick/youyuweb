/**
 * 获取图片缩放尺寸
 * @param {number} naturalWidth
 * @param {number} naturalHeight
 * @param {number} maxWidth
 * @param {number} maxHeight
 * @returns
 */
export function getImgSize(naturalWidth: number, naturalHeight: number, maxWidth: number, maxHeight: number) {
  const imgRatio = naturalWidth / naturalHeight;
  const maxRatio = maxWidth / maxHeight;
  let width, height;
  // 如果图片实际宽高比例 >= 显示宽高比例
  if (imgRatio >= maxRatio) {
    if (naturalWidth > maxWidth) {
      width = maxWidth;
      height = maxWidth / naturalWidth * naturalHeight;
    } else {
      width = naturalWidth;
      height = naturalHeight;
    }
  } else {
    if (naturalHeight > maxHeight) {
      width = maxHeight / naturalHeight * naturalWidth;
      height = maxHeight;
    } else {
      width = naturalWidth;
      height = naturalHeight;
    }
  }
  return {width: width, height: height}
}

/**
 * 获取图片缩放尺寸
 * @param {number} naturalWidth
 * @param {number} naturalHeight
 * @param {number} maxWidth
 * @returns
 */
export function getImgSizeByMaxWidth(naturalWidth: number, naturalHeight: number, maxWidth: number) {
  return {width: maxWidth, height: naturalHeight * maxWidth / naturalWidth}
}

/**
 * 获取图片缩放尺寸
 * @param {number} naturalWidth
 * @param {number} naturalHeight
 * @param {number} maxWidth
 * @param {number} maxHeight
 * @returns
 */
export function getImgSizeByMaxHeight(naturalWidth: number, naturalHeight: number, maxHeight: number) {
  return {width: naturalHeight / naturalWidth * maxHeight, height: max}
}
