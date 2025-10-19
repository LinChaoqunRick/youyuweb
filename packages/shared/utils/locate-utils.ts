import areaJson from '../assets/map/area.json';
import nationData from '../assets/map/nation.json';
import type { Area, Nation } from '../types/common';

const AreaData = areaJson as unknown as Record<string, Area>;
const NationData = nationData as unknown as Record<string, Nation>;

interface AntOptions {
  value: string | number;
  title?: string;
  children?: AntOptions[];
}

/**
 * 根据行政编码获取区域名称
 * @param code 行政编码
 * @param fullName 是否使用全称
 */
export function getRegionNameByCode(code: string, fullName: boolean = true) {
  const area = AreaData[code];
  return area?.[fullName ? 'fullName' : 'name'];
}

/**
 * 根据国家代码获取国家名称
 * @param code 国家代码+
 */
export function getNationNameByCode(code: string) {
  const area = NationData[code];
  return area?.name;
}

/**
 * 把一个 6 位行政区划码拆成上级链（省/省直辖 → 市 → 区），长度为 1~3
 * 例：350211 → ["350000","350200","350211"]
 *     350200 → ["350000","350200"]
 *     350000 → ["350000"]
 */
function splitAdminCodes(code: string): string[] {
  const c = String(code).trim();
  if (!/^\d{6}$/.test(c)) return [c]; // 非标准 6 位，原样返回

  const prov = `${c.slice(0, 2)}0000`;
  const codes = [prov];

  if (c.slice(2) !== '0000') {
    const city = `${c.slice(0, 4)}00`;
    codes.push(city);
  }

  if (c.slice(4) !== '00') {
    codes.push(c);
  }

  return codes;
}

/**
 * 根据 level 取末尾若干级名称并拼接
 * level=1: 只返回本级；level=2: 市+本级；level=3: 省+市+本级
 * 超过可用层级则取所有。
 * @param code 行政区划码（6 位）
 * @param level 1|2|3，默认 1
 * @param separator 可选分隔符，默认 ""（不加分隔）
 * @param fullName 使用全称
 */
function getAreaNameByCodeLevel(
  code: string,
  level: number = 1,
  separator: string = '',
  fullName: boolean = true,
): string {
  if (code.length === 3) {
    return getNationNameByCode(code);
  }
  const chain = splitAdminCodes(code);
  const lvl = Math.max(1, Math.floor(level)); // 兜底为 >=1 的整数
  const picked = chain.slice(Math.max(0, chain.length - lvl));
  const names = picked.map(c => getRegionNameByCode(c, fullName) ?? c);
  return names.join(separator);
}

/**
 * 根据区域名称获取行政编码
 * @param name 区域名称
 */
function getAreaCodeByName(name: string) {
  const area = Object.values(AreaData).find(area => area.name === name);
  return area?.name;
}

/**
 * 根据行政编码获取区域名称
 * @param code 行政编码
 * @param fullName 使用全称
 */
function getAreaNameByCode(code: string, fullName: boolean = true) {
  const strCode = `${code}`;
  return strCode.length === 3 ? getNationNameByCode(strCode) : getAreaNameByCodeLevel(strCode, 3, '/', fullName);
}

/**
 * 过滤区域并转化成{value: xx, title: xx}
 * @param startStr 开始字符串
 * @param endStr 结束字符串
 * @param areaCode 当前行政编码
 */
function filterAreas(startStr: string, endStr: string, areaCode: string) {
  const areaCodes = Object.keys(AreaData).filter(code => {
    return code.startsWith(startStr) && code.endsWith(endStr) && code !== areaCode;
  });
  return areaCodes.map(code => ({
    title: AreaData[code].name,
    value: code,
  }));
}

/**
 * 获取国家选择器数据
 */
function getSubAreaOptions(baseCode: string = '000000') {
  let startStr = '';
  let endStr = '0000';
  const isMunicipalities = ['110000', '310000', '120000', '500000'].includes(baseCode); // 直辖市
  const isProvince = baseCode.endsWith('0000'); // 省份
  const isCity = baseCode.substring(5, 6) !== '0'; // 省份
  if (baseCode && baseCode !== '000000') {
    startStr = baseCode.substring(0, isProvince ? 3 : 4);
    endStr = baseCode.substring(isMunicipalities ? 6 : isCity ? 0 : isProvince ? 4 : 6, 6);
  }
  return filterAreas(startStr, endStr, baseCode);
}

/**
 * 在树形结构中查找指定 value 并更新 children
 * @param {string|number} code - 要查找的 value
 * @param {Array} treeData - 树形数据
 * @param {Array} data - 要赋值的 children
 * @returns {Array} 更新后的 treeData
 */
function updateChildrenByCode(code: string, treeData: AntOptions[], data: AntOptions[]) {
  for (const item of treeData) {
    if (item.value === code) {
      item.children = data;
    } else if (item.children && item.children.length > 0) {
      updateChildrenByCode(code, item.children, data);
    }
  }
  return treeData;
}

export {
  getAreaNameByCode, getAreaNameByCodeLevel, getAreaCodeByName, getSubAreaOptions, updateChildrenByCode,
};
