import { AreaAccessOutput } from '@youyu/shared/types/vo';
import { getAreaNameByCode } from '@youyu/shared/utils/locate-utils.ts';

/**
 * 详细数据转化为省级数据
 * @param data
 */
export function mergeAreaToProvince(data: Array<AreaAccessOutput>) {
  return Object.values(
    data.reduce<Record<string, AreaAccessOutput>>((acc, { areaCode, count }) => {
      // 截取前两位+补0000得到省份代码
      const provinceCode = `${areaCode.slice(0, 2)}0000`;
      // 聚合统计
      if (!acc[provinceCode]) {
        acc[provinceCode] = { areaCode: provinceCode, count: 0, areaName: getAreaNameByCode(provinceCode, false) };
      }
      acc[provinceCode].count += count;
      return acc;
    }, {}),
  );
}
