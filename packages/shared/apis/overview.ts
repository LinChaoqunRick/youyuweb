import { ApiBase } from '../consts';

// 总览-分析页
export const GET_ANALYSIS_DATA = `${ApiBase}/manage/analysis/detail`; // 分析页数据
// 总览-监控页
export const GET_OVERVIEW_DATA = `${ApiBase}/manage/monitor/contentOverview`; // 内容总览数据
export const GET_AREA_ACCESS_DATA = `${ApiBase}/manage/monitor/areaAccess`; // 区域访问量数据
export const GET_SERVER_DATA = `${ApiBase}/manage/monitor/serverInfo`; // 服务器数据数据
export const GET_RECENT_ACCESS = `${ApiBase}/manage/monitor/recentAccess`; // 最近访问数据
