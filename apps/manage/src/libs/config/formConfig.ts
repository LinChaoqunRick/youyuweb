import type { TimeRangePickerProps } from 'antd';
import dayjs from 'dayjs';

export const formItemLayout = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 16 },
    sm: { span: 16 },
  },
};

export const rangePresets: TimeRangePickerProps['presets'] = [
  { label: '今天', value: [dayjs().add(0, 'd'), dayjs()] },
  { label: '昨天', value: [dayjs().add(-1, 'd'), dayjs()] },
  { label: '最近一周', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: '最近一月', value: [dayjs().add(-30, 'd'), dayjs()] },
  { label: '最近三月', value: [dayjs().add(-90, 'd'), dayjs()] },
  { label: '最近一年', value: [dayjs().add(-1, 'y'), dayjs()] },
];

export const LogTypeOptions = [
  { value: 1, label: '插入日志' },
  { value: 2, label: '修改日志' },
  { value: 3, label: '查询日志' },
  { value: 4, label: '删除日志' },
  { value: 5, label: '登录日志' },
  { value: 6, label: '登出日志' },
  { value: 7, label: '注册日志' },
  { value: 8, label: '访问网站' },
  { value: 66, label: '其他' },
];
