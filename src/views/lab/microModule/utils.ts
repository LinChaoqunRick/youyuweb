import {MeshBasicMaterial, PlaneGeometry, DoubleSide, CanvasTexture, Mesh} from "three";

const createCabinetNameCanvas = (text: string, width: number, height: number): HTMLCanvasElement => {
  // 获取设备的像素比例
  const ratio = 4;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

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

  // 测量文本宽度
  const textWidth = ctx.measureText(text).width;
  canvas.isOverflow = textWidth > width;
  return canvas;
}

const createCabinetNameMesh = (text: string, width: number, height: number = 22) => {
  const geometry = new PlaneGeometry(width, height);
  const canvas = createCabinetNameCanvas(text, width, height);
  console.log(canvas.isOverflow);
  const material = new MeshBasicMaterial({// 基础网格材质
    map: new CanvasTexture(canvas),
    side: DoubleSide,// 选择哪面显示
    transparent: true,// 是否使用透明度
  });

  return new Mesh(geometry, material);
}

export {createCabinetNameMesh}
