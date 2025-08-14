import areaData from '../assets/map/area.json';

function getAreaNameByCode(code: string) {
  const area = (areaData as Record<string, Record<string, any>>)[code] || {};
  return area.name ?? code;
}

export { getAreaNameByCode };
