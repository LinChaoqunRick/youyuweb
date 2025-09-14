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
  { label: '昨天', value: [dayjs().add(-1, 'd'), dayjs().add(-1, 'd')] },
  { label: '最近一周', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: '最近一月', value: [dayjs().add(-30, 'd'), dayjs()] },
  { label: '最近三月', value: [dayjs().add(-90, 'd'), dayjs()] },
  { label: '最近一年', value: [dayjs().add(-1, 'y'), dayjs()] },
];
