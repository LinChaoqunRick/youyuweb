import * as echarts from 'echarts';
import { debounce } from 'lodash';
import { useEffect, useRef } from 'react';
import Loading from '../loading/Loading';
import type { EChartsOption } from 'echarts';

function ReactEChart({ options, spinning = true }: { options: EChartsOption, spinning: boolean }) {
  const containerRef = useRef(null);
  const chartRef = useRef<echarts.ECharts | null>(null);

  // 初始化 echarts 实例
  useEffect(() => {
    if (!containerRef.current) return;

    chartRef.current = echarts.init(containerRef.current);

    // 用 lodash.debounce 防抖
    const handleResize = debounce(() => {
      chartRef.current?.resize();
    }, 200);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel(); // 取消未执行的防抖任务
      chartRef.current?.dispose();
    };
  }, []);

  // options 变化时更新图表
  useEffect(() => {
    if (chartRef.current && options) {
      chartRef.current.setOption(options); // true: 直接替换
    }
  }, [options]);

  return (
    <Loading spinning={spinning}>
      <div
        className="react-echart"
        ref={containerRef}
        style={{ width: '100%', height: '100%' }}
      />
    </Loading>
  );
}

export default ReactEChart;
