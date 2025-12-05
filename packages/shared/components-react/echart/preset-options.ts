import * as echarts from 'echarts';
import { GeoJSONSourceInput } from 'echarts/types/src/coord/geo/geoTypes';
import { merge } from 'lodash';
import chinaMap from '../../assets/map/china.json';
import type { EChartsOption } from 'echarts';

const COLORS = ['#3fb1e3', '#6be6c1', '#ffb980', '#d87a80', '#b6a2de', '#c4ebad', '#96dee8'];
const COMMON_CONFIG = {
  color: COLORS,
  backgroundColor: 'transparent',
  legend: {
    textStyle: {
      color: '#999999',
    },
    left: 'center',
    right: 'auto',
    bottom: -5,
  },
  grid: {
    left: '3%',
    right: '3%',
    bottom: '8%',
    top: '5%',
    containLabel: true,
  },
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: '#cccccc',
        width: 1,
      },
      crossStyle: {
        color: '#cccccc',
        width: 1,
      },
    },
  },
  xAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#999999',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#999999',
      },
    },
    axisLabel: {
      show: true,
      color: '#999999',
    },
  },
  yAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#999999',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#999999',
      },
    },
    axisLabel: {
      show: true,
      color: '#999999',
    },
  },
};

echarts.registerMap('china', chinaMap as GeoJSONSourceInput); // 注册地图

function getMapOptions(options: EChartsOption = {}) {
  return merge(
    {},
    {
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#1890ff',
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
      },
      visualMap: {
        min: 0,
        max: 100000,
        left: 26,
        bottom: 40,
        text: ['高', '低'],
        pieces: [
          {
            gt: 1000,
            label: '> 1000次',
            color: '#762f00ff',
          },
          {
            gte: 500,
            lte: 1000,
            label: '500 - 1000次',
            color: '#ff5428',
          },
          {
            gte: 1,
            lt: 500,
            label: '1 - 500次',
            color: '#ff8c71',
          },
        ],
        show: true,
        textStyle: {
          color: 'var(--text-color)',
        },
      },
      geo: {
        map: 'china',
        roam: true,
        zoom: 1.76,
        top: 175,
        label: {
          show: true,
          fontSize: '14',
          color: 'rgba(0, 0, 0, 0.6)',
        },
        itemStyle: {
          borderColor: '#d9d9d9',
          borderWidth: 1,
          areaColor: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.8,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(24, 144, 255, 0.05)',
              },
              {
                offset: 1,
                color: 'rgba(24, 144, 255, 0.15)',
              },
            ],
            globalCoord: false,
          },
          shadowColor: 'rgba(24, 144, 255, 0.3)',
          shadowOffsetX: -2,
          shadowOffsetY: 2,
          shadowBlur: 8,
        },
        emphasis: {
          disabled: false,
          itemStyle: {
            borderColor: '#1890ff',
            borderWidth: 2,
            areaColor: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(24, 144, 255, 0.15)',
                },
                {
                  offset: 1,
                  color: 'rgba(24, 144, 255, 0.35)',
                },
              ],
              globalCoord: false,
            },
            shadowColor: 'rgba(24, 144, 255, 0.6)',
            shadowBlur: 12,
          },
        },
      },
      series: [
        {
          name: '访问数量',
          type: 'map',
          geoIndex: 0,
          selectedMode: false,
          data: [],
          itemStyle: {
            borderColor: '#d9d9d9',
            borderWidth: 1,
          },
          emphasis: {
            itemStyle: {
              borderColor: '#1890ff',
              borderWidth: 2,
              shadowColor: 'rgba(24, 144, 255, 0.5)',
              shadowBlur: 8,
            },
          },
        },
      ],
    },
    options,
  );
}

function getBarOptions(options: EChartsOption = {}) {
  const defaultConfig = merge({}, COMMON_CONFIG, {
    title: { text: '', left: 'center', textStyle: { fontSize: 14, fontWeight: 'bold' } },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: { type: 'category', data: [] },
    yAxis: { type: 'value' },
    series: [
      {
        name: '',
        data: [],
        type: 'bar',
        barWidth: 30,
        itemStyle: {
          barBorderWidth: 0,
          barBorderColor: '#ccc',
        },
      },
    ],
  });
  return merge({}, defaultConfig, options);
}

function getLineOptions(options: EChartsOption = {}) {
  const defaultConfig = merge({}, COMMON_CONFIG, {
    title: { text: '', left: 'center', textStyle: { fontSize: 14, fontWeight: 'bold' } },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: [] },
    yAxis: { type: 'value' },
    series: [
      {
        name: '',
        data: [],
        type: 'line',
        itemStyle: {
          borderWidth: '2',
        },
        lineStyle: {
          width: '3',
        },
        symbolSize: '8',
        symbol: 'emptyCircle',
        smooth: true,
      },
    ],
  });
  return merge({}, defaultConfig, options);
}

export { getMapOptions, getBarOptions, getLineOptions };
