import { GET_AREA_ACCESS_DATA } from '@youyu/shared/apis/overview';
import { getMapOptions } from '@youyu/shared/components-react/echart/presetOptions';
import ReactEChart from '@youyu/shared/components-react/echart/ReactEChart';
import http from '@youyu/shared/network';
import type { AreaAccessOutput } from '@youyu/shared/types/vo';
import { getAreaNameByCodeLevel } from '@youyu/shared/utils/locate-utils';
import {
  Card, Form, DatePicker, Button,
} from 'antd';
import dayjs from 'dayjs';
import { EChartsOption } from 'echarts';
import React, { useEffect, useState } from 'react';
import './index.css';
import DataItem from '@youyu/shared/components-react/content/DataItem';
import { cloneDeep } from 'lodash';
import { rangePresets } from '@/libs/config/formConfig';
import { mergeAreaToProvince } from '@/utils/dataUtils.ts';

const { RangePicker } = DatePicker;

function Monitor() {
  const [form] = Form.useForm();
  const [accessData, setAccessData] = useState<Array<AreaAccessOutput>>([]);
  const [options, setOptions] = useState<EChartsOption>(getMapOptions());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    form.submit();
  }, [form]);

  const handleSearch = (values: any) => {
    setLoading(true);
    if (values.RangePicker?.length === 2) {
      values.startTime = values.RangePicker[0]?.format('YYYY-MM-DD');
      values.endTime = values.RangePicker[1]?.format('YYYY-MM-DD');
      delete values.RangePicker;
    }
    http
      .get<Array<AreaAccessOutput>>(GET_AREA_ACCESS_DATA, values)
      .then(res => {
        const strictData = cloneDeep(res.data).map(item => {
          item.areaName = getAreaNameByCodeLevel(item.areaCode, 3) || item.areaName;
          return item;
        });
        setAccessData(strictData);
        const areaData = mergeAreaToProvince(res.data);
        const data = areaData.map(item => ({
          name: item.areaName,
          value: item.count,
        }));
        setOptions({
          series: [{ data }],
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="overview-monitor">
      <div className="header-search rounded-sm">
        <Form
          layout="inline"
          form={form}
          initialValues={{ variant: 'filled', layout: 'inline' }}
          onFinish={handleSearch}
        >
          <Form.Item
            label="时间范围"
            name="RangePicker"
            initialValue={[dayjs().startOf('day'), dayjs().endOf('day')]}
            rules={[{ required: true, message: '请选择时间范围' }]}
          >
            <RangePicker presets={rangePresets} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="monitor-content flex flex-row">
        <div className="bg-white rounded-sm h-full flex-1 mr-3">
          <ReactEChart options={options} spinning={loading} />
        </div>
        <Card title="访问量排行" extra={<a href="#">全部</a>} style={{ width: 320 }}>
          {
            accessData.map(item => (
              <DataItem key={item.areaCode} keyName="areaCode" data={item} propName="areaName" valueName="count" />
            ))
          }
        </Card>
      </div>
    </div>
  );
}

export default Monitor;
