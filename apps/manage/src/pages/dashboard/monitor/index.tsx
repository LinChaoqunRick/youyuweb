import {
  GET_AREA_ACCESS_DATA,
  GET_OVERVIEW_DATA,
  GET_SERVER_DATA,
  GET_RECENT_ACCESS,
} from '@youyu/shared/apis/overview';
import { getMapOptions } from '@youyu/shared/components-react/echart/preset-options.ts';
import ReactEChart from '@youyu/shared/components-react/echart/ReactEChart';
import http from '@youyu/shared/network';
import type { AreaAccessOutput, Logs } from '@youyu/shared/types/vo';
import { Card, Form, DatePicker, Button, Empty } from 'antd';
import dayjs from 'dayjs';
import { EChartsOption } from 'echarts';
import React, { useEffect, useState } from 'react';
import './index.css';
import { rangePresets } from '@/libs/config/formConfig';
import { mergeAreaToProvince } from '@/utils/dataUtils.ts';
import {
  UserOutlined,
  FileTextOutlined,
  NotificationOutlined,
  CameraOutlined,
  MessageOutlined,
  AppstoreOutlined,
  EyeOutlined,
  CommentOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const { RangePicker } = DatePicker;

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
  totalVisitorNumber: number;
  totalVisitNumber: number;
  postCommentNumber: number;
  momentCommentNumber: number;
}

interface ServerData {
  cpu: {
    cores: number;
    usage: number;
    systemLoad: number;
  };
  memory: {
    total: number;
    used: number;
    free: number;
    usage: number;
  };
  jvm: {
    max: number;
    total: number;
    used: number;
    free: number;
    usage: number;
  };
  disk: {
    total: number;
    used: number;
    free: number;
    usage: number;
  };
}

function Monitor() {
  const [form] = Form.useForm();
  const [options, setOptions] = useState<EChartsOption>(getMapOptions());
  const [data, setData] = useState<OverviewData | null>(null);
  const [accessData, setAccessData] = useState<Logs[]>([]);
  const [serverData, setServerData] = useState<ServerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrollDuration, setScrollDuration] = useState(0);

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
    http
      .get<ServerData>(GET_SERVER_DATA)
      .then(res => {
        setServerData(res.data);
      })
      .catch(err => {
        console.error('Failed to fetch server data:', err);
      });
    http.get<Logs[]>(GET_RECENT_ACCESS).then(res => {
      setAccessData(res.data);
    });
  }, []);

  // 格式化字节大小
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / k ** i).toFixed(2)} ${sizes[i]}`;
  };

  // 获取使用率的颜色
  const getUsageColor = (usage: number): string => {
    if (usage >= 90) return '#f5222d';
    if (usage >= 70) return '#faad14';
    return '#52c41a';
  };

  const statItems = [
    {
      title: '今日访问',
      value: data?.todayVisitNumber || 0,
      icon: <EyeOutlined />,
      color: '#1890ff',
    },
    {
      title: '本月访问',
      value: data?.monthVisitNumber || 0,
      icon: <EyeOutlined />,
      color: '#52c41a',
    },
    {
      title: '总访问数',
      value: data?.totalVisitNumber || 0,
      icon: <EyeOutlined />,
      color: '#722ed1',
    },
    {
      title: '总游客数',
      value: data?.totalVisitorNumber || 0,
      icon: <TeamOutlined />,
      color: '#13c2c2',
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
      title: '文章评论',
      value: data?.postCommentNumber || 0,
      icon: <CommentOutlined />,
      color: '#eb2f96',
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
      title: '时刻评论',
      value: data?.momentCommentNumber || 0,
      icon: <CommentOutlined />,
      color: '#52c41a',
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

  useEffect(() => {
    if (accessData.length > 0) {
      const itemHeight = 45;
      const totalHeight = accessData.length * itemHeight;
      const duration = totalHeight / 20;
      setScrollDuration(duration);
    }
  }, [accessData]);

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
      <div className="monitor-content">
        {/* 左侧：统计卡片 */}
        <div className="left-panel">
          <Card className="server-card" title="服务器信息" loading={!serverData}>
            {serverData && (
              <div className="server-info">
                {/* CPU 信息 */}
                <div className="server-item">
                  <div className="server-item-header">
                    <span className="server-item-title">CPU</span>
                    <span className="server-item-value">
                      {serverData.cpu.cores} 核 | 负载: {serverData.cpu.systemLoad.toFixed(2)}
                    </span>
                  </div>
                  <div className="server-progress">
                    <div
                      className="server-progress-bar"
                      style={{
                        width: `${serverData.cpu.usage}%`,
                        backgroundColor: getUsageColor(serverData.cpu.usage),
                      }}
                    />
                  </div>
                  <div className="server-item-footer">{serverData.cpu.usage.toFixed(1)}%</div>
                </div>

                {/* 内存信息 */}
                <div className="server-item">
                  <div className="server-item-header">
                    <span className="server-item-title">内存</span>
                    <span className="server-item-value">
                      {formatBytes(serverData.memory.used)} / {formatBytes(serverData.memory.total)}
                    </span>
                  </div>
                  <div className="server-progress">
                    <div
                      className="server-progress-bar"
                      style={{
                        width: `${serverData.memory.usage}%`,
                        backgroundColor: getUsageColor(serverData.memory.usage),
                      }}
                    />
                  </div>
                  <div className="server-item-footer">{serverData.memory.usage.toFixed(1)}%</div>
                </div>

                {/* JVM 信息 */}
                <div className="server-item">
                  <div className="server-item-header">
                    <span className="server-item-title">JVM</span>
                    <span className="server-item-value">
                      {formatBytes(serverData.jvm.used)} / {formatBytes(serverData.jvm.max)}
                    </span>
                  </div>
                  <div className="server-progress">
                    <div
                      className="server-progress-bar"
                      style={{
                        width: `${serverData.jvm.usage}%`,
                        backgroundColor: getUsageColor(serverData.jvm.usage),
                      }}
                    />
                  </div>
                  <div className="server-item-footer">{serverData.jvm.usage.toFixed(1)}%</div>
                </div>

                {/* 磁盘信息 */}
                <div className="server-item">
                  <div className="server-item-header">
                    <span className="server-item-title">磁盘</span>
                    <span className="server-item-value">
                      {formatBytes(serverData.disk.used)} / {formatBytes(serverData.disk.total)}
                    </span>
                  </div>
                  <div className="server-progress">
                    <div
                      className="server-progress-bar"
                      style={{
                        width: `${serverData.disk.usage}%`,
                        backgroundColor: getUsageColor(serverData.disk.usage),
                      }}
                    />
                  </div>
                  <div className="server-item-footer">{serverData.disk.usage.toFixed(1)}%</div>
                </div>
              </div>
            )}
          </Card>
          <Card className="stat-card" title="内容数据统计">
            <div className="stat-items">
              {statItems.map(item => (
                <div key={item.title} className="stat-item" style={{ borderLeftColor: item.color }}>
                  <div className="stat-icon" style={{ color: item.color }}>
                    {item.icon}
                  </div>
                  <div className="stat-details">
                    <div className="stat-title">{item.title}</div>
                    <div className="stat-value">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="right-panel">
          <Card title="区域访问统计" className="area-access-card">
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
            <div className="map-container bg-white rounded-sm">
              <ReactEChart options={options} spinning={loading} />
            </div>
          </Card>
          <Card title="最近访问数据" className="recent-access-card">
            {accessData && accessData.length > 0 ? (
              <div className="access-list-container">
                <div className="access-list-scroll" style={{ animationDuration: `${scrollDuration}s` }}>
                  {accessData.map(item => (
                    <div key={item.id} className="access-item">
                      <span className="access-location">
                        来自【{item.adName}】的访客访问了【{item.clientId}】
                      </span>
                      <span className="access-time">{dayjs(item.createTime).format('HH:mm:ss')}</span>
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
    </div>
  );
}

export default Monitor;
