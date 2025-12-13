import http from '@youyu/shared/network';
import { GET_ANALYSIS_DATA, GET_OVERVIEW_DATA } from '@youyu/shared/apis/overview.ts';
import ReactEChart from '@youyu/shared/components-react/echart/ReactEChart';
import { useEffect, useState } from 'react';
import { Card, Row, Col, Tabs } from 'antd';
import type { EChartsOption } from 'echarts';
import './index.css';
import { getBarOptions, getLineOptions, getPieOptions } from '@youyu/shared/components-react/echart/preset-options.ts';

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

interface VisitorNewData {
  time: string;
  visitCount: number;
}

interface VisitorRegionData {
  adName: string;
  adcode: number;
  visitCount: number;
}

interface AnalysisData {
  dailyRegionVisits: RegionData[];
  dailyVisits: VisitData[];
  monthlyComments: CommentData[];
  monthlyRegionVisits: RegionData[];
  monthlyVisits: VisitData[];
  monthlyNewVisitors: VisitorNewData[];
  visitorsByProvince: VisitorRegionData[];
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
  totalVisitorNumber: number;
  totalVisitNumber: number;
  postCommentNumber: number;
  momentCommentNumber: number;
}

function Analysis() {
  const [loading, setLoading] = useState(true);
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null);
  const [dailyRegionOptions, setDailyRegionOptions] = useState<EChartsOption>({});
  const [monthlyRegionOptions, setMonthlyRegionOptions] = useState<EChartsOption>({});
  const [dailyVisitsOptions, setDailyVisitsOptions] = useState<EChartsOption>({});
  const [monthlyVisitsOptions, setMonthlyVisitsOptions] = useState<EChartsOption>({});
  const [monthlyCommentsOptions, setMonthlyCommentsOptions] = useState<EChartsOption>({});
  const [monthlyNewVisitorsOptions, setMonthlyNewVisitorsOptions] = useState<EChartsOption>({});
  const [visitorsByProvinceOptions, setVisitorsByProvinceOptions] = useState<EChartsOption>({});

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
          name: '访问量',
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

  const generateNewVisitorsChartOptions = (visitorData: VisitorNewData[]): EChartsOption => {
    return getLineOptions({
      xAxis: { data: visitorData.map(item => item.time) },
      series: [
        {
          name: '新增访客',
          data: visitorData.map(item => item.visitCount),
        },
      ],
    });
  };

  const generateProvinceVisitorsChartOptions = (regionData: VisitorRegionData[]): EChartsOption => {
    const sortedData = [...regionData].sort((a, b) => b.visitCount - a.visitCount).slice(0, 10);
    return getPieOptions({
      legend: {
        show: false,
      },
      series: [
        {
          name: '访客分布',
          center: ['50%', '50%'],
          data: sortedData.map(item => ({
            name: item.adName,
            value: item.visitCount,
          })),
        },
      ],
    });
  };

  const generateContentChartOptions = (data: OverviewData | null): EChartsOption => {
    if (!data) return {};
    return getBarOptions({
      xAxis: {
        data: ['文章', '时刻', '笔记', '章节', '相册'],
      },
      series: [
        {
          name: '内容数量',
          data: [
            data.postNumber,
            data.momentNumber,
            data.noteNumber,
            data.chapterNumber,
            data.albumNumber,
          ],
        },
      ],
    });
  };

  const generateInteractionChartOptions = (data: OverviewData | null): EChartsOption => {
    if (!data) return {};
    return getBarOptions({
      xAxis: {
        data: ['文章评论', '时刻评论', '留言'],
      },
      series: [
        {
          name: '互动数量',
          data: [
            data.postCommentNumber,
            data.momentCommentNumber,
            data.messageNumber,
          ],
        },
      ],
    });
  };

  const generateUserVisitorChartOptions = (data: OverviewData | null): EChartsOption => {
    if (!data) return {};
    return getPieOptions({
      series: [
        {
          name: '用户统计',
          center: ['50%', '50%'],
          data: [
            { name: '注册用户', value: data.userNumber },
            { name: '游客', value: data.totalVisitorNumber },
          ],
        },
      ],
    });
  };

  useEffect(() => {
    Promise.all([
      http.get<AnalysisData>(GET_ANALYSIS_DATA),
      http.get<OverviewData>(GET_OVERVIEW_DATA),
    ])
      .then(([analysisRes, overviewRes]) => {
        const analysisData = analysisRes.data;
        const overview = overviewRes.data;

        if (analysisData.dailyRegionVisits?.length) {
          setDailyRegionOptions(generateBarChartOptions(analysisData.dailyRegionVisits));
        }
        if (analysisData.monthlyRegionVisits?.length) {
          setMonthlyRegionOptions(generateBarChartOptions(analysisData.monthlyRegionVisits));
        }
        if (analysisData.dailyVisits?.length) {
          setDailyVisitsOptions(generateLineChartOptions(analysisData.dailyVisits));
        }
        if (analysisData.monthlyVisits?.length) {
          setMonthlyVisitsOptions(generateLineChartOptions(analysisData.monthlyVisits));
        }
        if (analysisData.monthlyComments?.length) {
          setMonthlyCommentsOptions(generateCommentsChartOptions(analysisData.monthlyComments));
        }
        if (analysisData.monthlyNewVisitors?.length) {
          setMonthlyNewVisitorsOptions(generateNewVisitorsChartOptions(analysisData.monthlyNewVisitors));
        }
        if (analysisData.visitorsByProvince?.length) {
          setVisitorsByProvinceOptions(generateProvinceVisitorsChartOptions(analysisData.visitorsByProvince));
        }

        setOverviewData(overview);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const visitTabs = [
    {
      key: 'daily',
      label: '日访问',
      children: (
        <Row gutter={[12, 12]}>
          <Col xs={24} lg={12}>
            <div style={{ height: 240 }}>
              <ReactEChart options={dailyRegionOptions} spinning={loading} />
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div style={{ height: 240 }}>
              <ReactEChart options={dailyVisitsOptions} spinning={loading} />
            </div>
          </Col>
        </Row>
      ),
    },
    {
      key: 'monthly',
      label: '月访问',
      children: (
        <Row gutter={[12, 12]}>
          <Col xs={24} lg={12}>
            <div style={{ height: 240 }}>
              <ReactEChart options={monthlyRegionOptions} spinning={loading} />
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div style={{ height: 240 }}>
              <ReactEChart options={monthlyVisitsOptions} spinning={loading} />
            </div>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <div className="analysis-container">
      <Row gutter={[12, 12]}>
        <Col xs={24} lg={12}>
          <Card title="访问统计" style={{ height: '100%' }}>
            <Tabs items={visitTabs} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="内容统计" style={{ height: '100%' }}>
            <div style={{ height: 305 }}>
              <ReactEChart options={generateContentChartOptions(overviewData)} spinning={loading} />
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col xs={24} lg={8}>
          <Card title="互动统计" style={{ height: '100%' }}>
            <div style={{ height: 240 }}>
              <ReactEChart options={generateInteractionChartOptions(overviewData)} spinning={loading} />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="用户统计" style={{ height: '100%' }}>
            <div style={{ height: 240 }}>
              <ReactEChart options={generateUserVisitorChartOptions(overviewData)} spinning={loading} />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="月新增访客" style={{ height: '100%' }}>
            <div style={{ height: 240 }}>
              <ReactEChart options={monthlyNewVisitorsOptions} spinning={loading} />
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col xs={24} lg={8}>
          <Card title="访客地域分布" style={{ height: '100%' }}>
            <div style={{ height: 240 }}>
              <ReactEChart options={visitorsByProvinceOptions} spinning={loading} />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={16}>
          <Card title="评论趋势" style={{ height: '100%' }}>
            <div style={{ height: 240 }}>
              <ReactEChart options={monthlyCommentsOptions} spinning={loading} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Analysis;
