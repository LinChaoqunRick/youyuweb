import { GET_AREA_ACCESS_DATA } from '@youyu/shared/apis/overview';
import { getMapOptions } from '@youyu/shared/components-react/echart/preset-options.ts';
import ReactEChart from '@youyu/shared/components-react/echart/ReactEChart';
import http from '@youyu/shared/network';
import type { AreaAccessOutput } from '@youyu/shared/types/vo';
import { getAreaNameByCodeLevel } from '@youyu/shared/utils/locate-utils';
import { Card, Form, DatePicker, Button, Row, Col, Empty } from 'antd';
import dayjs from 'dayjs';
import { EChartsOption } from 'echarts';
import React, { useEffect, useState } from 'react';
import './index.css';
import DataItem from '@youyu/shared/components-react/content/DataItem';
import { cloneDeep } from 'lodash';
import { rangePresets } from '@/libs/config/formConfig';
import { mergeAreaToProvince } from '@/utils/dataUtils.ts';
import { GET_OVERVIEW_DATA } from '@youyu/shared/apis/overview.ts';
import {
  UserOutlined,
  FileTextOutlined,
  NotificationOutlined,
  CameraOutlined,
  MessageOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

const { RangePicker } = DatePicker;

interface AccessData {
  ip: string;
  areaCode: string;
  areaName: string;
  createTime: string;
}

interface OverviewData {
  userNumber: number;
  postNumber: number;
  momentNumber: number;
  noteNumber: number;
  chapterNumber: number;
  albumNumber: number;
  messageNumber: number;
  todayVisitNumber: number;
  monthVisitNumber: number;
  recentAccessList: AccessData[];
}

function Monitor() {
  const [form] = Form.useForm();
  const [accessData, setAccessData] = useState<Array<AreaAccessOutput>>([]);
  const [options, setOptions] = useState<EChartsOption>(getMapOptions());
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    http
      .get<OverviewData>(GET_OVERVIEW_DATA)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const statItems = [
    {
      title: '今日访问',
      value: data?.todayVisitNumber || 0,
      icon: <AppstoreOutlined />,
      color: '#1890ff',
    },
    {
      title: '本月访问',
      value: data?.monthVisitNumber || 0,
      icon: <AppstoreOutlined />,
      color: '#52c41a',
    },
    {
      title: '总用户数',
      value: data?.userNumber || 0,
      icon: <UserOutlined />,
      color: '#faad14',
    },
    {
      title: '总文章数',
      value: data?.postNumber || 0,
      icon: <FileTextOutlined />,
      color: '#f5222d',
    },
    {
      title: '总笔记数',
      value: data?.noteNumber || 0,
      icon: <NotificationOutlined />,
      color: '#722ed1',
    },
    {
      title: '总章节数',
      value: data?.chapterNumber || 0,
      icon: <AppstoreOutlined />,
      color: '#13c2c2',
    },
    {
      title: '总时刻数',
      value: data?.momentNumber || 0,
      icon: <MessageOutlined />,
      color: '#eb2f96',
    },
    {
      title: '总相册数',
      value: data?.albumNumber || 0,
      icon: <CameraOutlined />,
      color: '#1890ff',
    },
    {
      title: '总留言数',
      value: data?.messageNumber || 0,
      icon: <MessageOutlined />,
      color: '#faad14',
    },
  ];

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
        <div className="bg-white rounded-sm h-full flex-1 mr-3 map-container">
          <ReactEChart options={options} spinning={loading} />
        </div>
        <Card title="访问量排行 Top 10" extra={<a href="#">全部</a>} style={{ width: 340 }} className="rank-card">
          <div className="rank-list">
            {accessData.slice(0, 10).map((item, index) => (
              <DataItem
                key={item.areaCode}
                idName="areaCode"
                data={item}
                propName="areaName"
                valueName="count"
                rank={index + 1}
              />
            ))}
          </div>
        </Card>
      </div>
      <div className="analysis-container">
        {/* 数据统计卡片 */}
        <Row gutter={[16, 16]} className="stat-grid">
          {statItems.map((item, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card className="stat-card" style={{ borderLeftColor: item.color }}>
                <div className="stat-content">
                  <div className="stat-icon-wrapper" style={{ color: item.color }}>
                    {item.icon}
                  </div>
                  <div className="stat-info">
                    <div className="stat-title">{item.title}</div>
                    <div className="stat-value">{item.value}</div>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* 最近访问数据 */}
        <Card title="最近访问数据" className="recent-access-card" loading={loading}>
          {data?.recentAccessList && data.recentAccessList.length > 0 ? (
            <div className="access-list-scroll">
              <div className="access-list">
                {data.recentAccessList.map((item, index) => (
                  <div key={index} className="access-item">
                    <div className="access-item-content">
                      <span className="access-location">{item.areaName}</span>
                      <span className="access-ip">{item.ip}</span>
                    </div>
                    <span className="access-time">{item.createTime}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Empty description="暂无访问数据" />
          )}
        </Card>
      </div>
    </div>
  );
}

export default Monitor;
