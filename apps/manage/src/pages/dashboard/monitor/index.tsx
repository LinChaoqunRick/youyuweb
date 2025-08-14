import { GET_AREA_ACCESS_DATA } from '@youyu/shared/apis/overview';
import { getMapOptions } from '@youyu/shared/components-react/echart/presetOptions';
import ReactEChart from '@youyu/shared/components-react/echart/ReactEChart';
import http from '@youyu/shared/network';
import { AreaAccessOutput } from '@youyu/shared/types/vo/overview';
import { getAreaNameByCode } from '@youyu/shared/utils/locate-utils';
import {
  Card, Form, DatePicker, Button,
} from 'antd';
import dayjs from 'dayjs';
import { EChartsOption } from 'echarts';
import React, { useEffect, useState } from 'react';
import './index.css';
import DataItem from '@youyu/shared/components-react/content/DataItem';

const formItemLayout = {
  labelCol: {
    xs: { span: 6 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 18 },
    sm: { span: 18 },
  },
};

const { RangePicker } = DatePicker;

/**
 * 详细数据转化为省级数据
 * @param data
 */
function mergeToProvince(data: Array<AreaAccessOutput>) {
  return Object.values(
    data.reduce<Record<string, AreaAccessOutput>>((acc, { areaCode, count }) => {
      // 截取前两位+补0000得到省份代码
      const provinceCode = `${areaCode.slice(0, 2)}0000`;
      // 聚合统计
      if (!acc[provinceCode]) {
        acc[provinceCode] = { areaCode: provinceCode, count: 0, areaName: getAreaNameByCode(provinceCode) };
      }
      acc[provinceCode].count += count;
      return acc;
    }, {}),
  );
}

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
      .get(GET_AREA_ACCESS_DATA, values)
      .then(res => {
        setAccessData(res.data);
        const areaData = mergeToProvince(res.data);
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
          {...formItemLayout}
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
            <RangePicker />
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
        <Card title="访问量排行" extra={<a href="#">全部</a>} style={{ width: 300 }}>
          {
            accessData.map(item => (
              <DataItem keyName="areaCode" data={item} propName="areaName" valueName="count" />
            ))
          }
        </Card>
      </div>
    </div>
  );
}

export default Monitor;
