import http from '@youyu/shared/network';
import { GET_ANALYSIS_DATA } from '@youyu/shared/apis/overview.ts';
import ReactEChart from '@youyu/shared/components-react/echart/ReactEChart';
import { useEffect, useState } from 'react';
import { Card, Row, Col, Empty } from 'antd';
import type { EChartsOption } from 'echarts';
import './index.css';
import { getBarOptions, getLineOptions } from '@youyu/shared/components-react/echart/preset-options.ts';

interface RegionData {
  adName: string;
  adcode: number;
  visitCount: number;
}

interface VisitData {
  time: string;
  visitCount: number;
}

interface CommentData {
  month: string;
  postCommentCount: number;
  momentCommentCount: number;
}

interface AnalysisData {
  dailyRegionVisits: RegionData[];
  dailyVisits: VisitData[];
  monthlyComments: CommentData[];
  monthlyRegionVisits: RegionData[];
  monthlyVisits: VisitData[];
}

function Analysis() {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dailyRegionOptions, setDailyRegionOptions] = useState<EChartsOption>({});
  const [monthlyRegionOptions, setMonthlyRegionOptions] = useState<EChartsOption>({});
  const [dailyVisitsOptions, setDailyVisitsOptions] = useState<EChartsOption>({});
  const [monthlyVisitsOptions, setMonthlyVisitsOptions] = useState<EChartsOption>({});
  const [monthlyCommentsOptions, setMonthlyCommentsOptions] = useState<EChartsOption>({});

  const generateBarChartOptions = (regionData: RegionData[]): EChartsOption => {
    const sortedData = [...regionData].sort((a, b) => b.visitCount - a.visitCount).slice(0, 10);
    return getBarOptions({
      xAxis: { data: sortedData.map(item => item.adName) },
      series: [
        {
          name: '访问次数',
          data: sortedData.map(item => item.visitCount),
        },
      ],
    });
  };

  const generateLineChartOptions = (visitData: VisitData[]): EChartsOption => {
    return getLineOptions({
      xAxis: { data: visitData.map(item => item.time) },
      series: [
        {
          data: visitData.map(item => item.visitCount),
        },
      ],
    });
  };

  const generateCommentsChartOptions = (commentData: CommentData[]): EChartsOption => {
    return getLineOptions({
      xAxis: { data: commentData.map(item => item.month), boundaryGap: false },
      series: [
        {
          name: '文章评论',
          data: commentData.map(item => item.postCommentCount),
        },
        {
          name: '时刻评论',
          data: commentData.map(item => item.momentCommentCount),
        },
      ],
    });
  };

  useEffect(() => {
    http
      .get<AnalysisData>(GET_ANALYSIS_DATA)
      .then(res => {
        setData(res.data);
        if (res.data.dailyRegionVisits?.length) {
          setDailyRegionOptions(generateBarChartOptions(res.data.dailyRegionVisits));
        }
        if (res.data.monthlyRegionVisits?.length) {
          setMonthlyRegionOptions(generateBarChartOptions(res.data.monthlyRegionVisits));
        }
        if (res.data.dailyVisits?.length) {
          setDailyVisitsOptions(generateLineChartOptions(res.data.dailyVisits, '日访问趋势', '访问数', '#1890ff'));
        }
        if (res.data.monthlyVisits?.length) {
          setMonthlyVisitsOptions(generateLineChartOptions(res.data.monthlyVisits, '月访问趋势', '访问数', '#52c41a'));
        }
        if (res.data.monthlyComments?.length) {
          setMonthlyCommentsOptions(generateCommentsChartOptions(res.data.monthlyComments));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="analysis-container" />;
  }

  if (!data) {
    return (
      <div className="analysis-container">
        <Empty description="暂无数据" />
      </div>
    );
  }

  return (
    <div className="analysis-container">
      <Row gutter={[12, 12]} style={{ marginBottom: 12 }}>
        <Col xs={24} lg={12}>
          <Card title="日区域访问分布" style={{ height: '100%' }}>
            <div style={{ height: 300 }}>
              <ReactEChart options={dailyRegionOptions} spinning={loading} />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="月区域访问分布" style={{ height: '100%' }}>
            <div style={{ height: 300 }}>
              <ReactEChart options={monthlyRegionOptions} spinning={loading} />
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[12, 12]} style={{ marginBottom: 12 }}>
        <Col xs={24} lg={12}>
          <Card title="日访问趋势" style={{ height: '100%' }}>
            <div style={{ height: 300 }}>
              <ReactEChart options={dailyVisitsOptions} spinning={loading} />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="月访问趋势" style={{ height: '100%' }}>
            <div style={{ height: 300 }}>
              <ReactEChart options={monthlyVisitsOptions} spinning={loading} />
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[12, 12]}>
        <Col xs={24}>
          <Card style={{ height: '100%' }}>
            <div style={{ height: 300 }}>
              <ReactEChart options={monthlyCommentsOptions} spinning={loading} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Analysis;
