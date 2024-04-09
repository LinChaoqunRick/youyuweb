import {
  MeshBasicMaterial,
  PlaneGeometry,
  DoubleSide,
  CanvasTexture,
  Mesh,
  RepeatWrapping,
} from "three";

const overflowScale = 1.43;

/**
 * text: 字符串
 */
const measureText = (text: string): number => {
  const chineseRegex = /^[\u4e00-\u9fa5]$/;
  const numberRegex = /^[0-9]$/;
  const upperCaseRegex = /^[A-Z]$/;
  const lowerCaseRegex = /^[a-z]$/;
  let appendPixel = 0;
  for (let i = 0; i < text.length; i++) {
    if (chineseRegex.test(text[i])) {// 如果是中文
      appendPixel += 16;
    } else if (upperCaseRegex.test(text[i])) {// 如果是大写字母
      appendPixel += 14;
    } else if (lowerCaseRegex.test(text[i])) {// 如果是小写字母
      appendPixel += 11;
    } else if (numberRegex.test(text[i])) {// 如果是数字
      appendPixel += 10;
    } else if (text[i] === '.') { // 如果是小数点
      appendPixel += 5;
    } else {
      appendPixel += 12;
    }
  }
  return appendPixel;
}

const createCabinetNameCanvas = (text: string, width: number, height: number): HTMLCanvasElement => {
  // 获取设备的像素比例
  const ratio = 4;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // 测量文本宽度
  const textWidth = Math.ceil(ctx.measureText(text).width * overflowScale);
  // 文本是否会溢出
  canvas._is_overflow = textWidth > width;

  if (canvas._is_overflow) {
    canvas._repeat_x = width / textWidth;
    width = textWidth;
  }

  // 调整canvas的大小以考虑设备像素比，增加绘图分辨率
  canvas.width = width * ratio;
  canvas.height = height * ratio;

  // 使用CSS缩放canvas以适应原始宽高
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  // 缩放绘图上下文以适应设备像素比
  ctx.scale(ratio, ratio);

  // 设置长方形的背景颜色
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, width, height);

  // 设置文本的样式
  ctx.font = '14px Microsoft YaHei';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // 计算文本位置并在长方形中居中显示
  const textX = width / 2;
  const textY = height / 2 + 1;
  ctx.fillText(text, textX, textY);

  // document.documentElement.appendChild(canvas);
  return canvas;
}

const createCabinetNameMesh = (text: string, width: number, height: number = 22) => {
  const canvas = createCabinetNameCanvas(text, width, height);
  const geometry = new PlaneGeometry(width, height);
  const material = new MeshBasicMaterial({// 基础网格材质
    map: new CanvasTexture(canvas, undefined, canvas._is_overflow ? RepeatWrapping : undefined),
    side: DoubleSide,// 选择哪面显示
    transparent: true,// 是否使用透明度
  });

  if (canvas._is_overflow && material.map) {
    material.map.repeat.x = canvas._repeat_x;
    material.map.canvasWidth = Math.ceil(width / canvas._repeat_x);
  }

  return new Mesh(geometry, material);
}

export {createCabinetNameCanvas, createCabinetNameMesh}
