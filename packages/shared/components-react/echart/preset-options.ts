import * as echarts from 'echarts';
import { GeoJSONSourceInput } from 'echarts/types/src/coord/geo/geoTypes';
import { merge } from 'lodash';
import chinaMap from '../../assets/map/china.json';
import type { EChartsOption } from 'echarts';

const COLORS = ['#3fb1e3', '#ffb980', '#6be6c1', '#d87a80', '#b6a2de', '#c4ebad', '#96dee8'];
const COMMON_CONFIG = {
  color: COLORS,
  backgroundColor: 'transparent',
  legend: {
    textStyle: {
      color: '#999999'
    },
    left: 'center',
    right: 'auto',
    bottom: '-2%'
  },
  grid: {
    left: '2%',
    right: '2%',
    bottom: '8%',
    top: '3%',
    containLabel: true
  },
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: '#cccccc',
        width: 1
      },
      crossStyle: {
        color: '#cccccc',
        width: 1
      }
    }
  }
};

const COMMON_AXIS_CONFIG = {
  xAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#999999'
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#999999'
      }
    },
    axisLabel: {
      show: true,
      color: '#999999'
    }
  },
  yAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#999999'
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#999999'
      }
    },
    axisLabel: {
      show: true,
      color: '#999999'
    }
  }
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
          fontSize: 12
        }
      },
      visualMap: {
        min: 0,
        max: 100000,
        left: 0,
        bottom: 0,
        text: ['高', '低'],
        pieces: [
          {
            gt: 1000,
            label: '> 1000次',
            color: '#762f00ff'
          },
          {
            gte: 500,
            lte: 1000,
            label: '500 - 1000次',
            color: '#ff5428'
          },
          {
            gte: 1,
            lt: 500,
            label: '1 - 500次',
            color: '#ff8c71'
          }
        ],
        show: true,
        textStyle: {
          color: 'var(--text-color)'
        }
      },
      geo: {
        map: 'china',
        roam: true,
        zoom: 1.55,
        top: 130,
        label: {
          show: true,
          fontSize: '10',
          color: 'rgba(0, 0, 0, 0.6)'
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
                color: 'rgba(24, 144, 255, 0.05)'
              },
              {
                offset: 1,
                color: 'rgba(24, 144, 255, 0.15)'
              }
            ],
            globalCoord: false
          },
          shadowColor: 'rgba(24, 144, 255, 0.3)',
          shadowOffsetX: -2,
          shadowOffsetY: 2,
          shadowBlur: 8
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
                  color: 'rgba(24, 144, 255, 0.15)'
                },
                {
                  offset: 1,
                  color: 'rgba(24, 144, 255, 0.35)'
                }
              ],
              globalCoord: false
            },
            shadowColor: 'rgba(24, 144, 255, 0.6)',
            shadowBlur: 12
          }
        }
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
            borderWidth: 1
          },
          emphasis: {
            itemStyle: {
              borderColor: '#1890ff',
              borderWidth: 2,
              shadowColor: 'rgba(24, 144, 255, 0.5)',
              shadowBlur: 8
            }
          }
        }
      ]
    },
    options
  );
}

function getBarOptions(options: EChartsOption = {}) {
  const defaultConfig = merge({}, COMMON_CONFIG, COMMON_AXIS_CONFIG, {
    title: { text: '', left: 'center', textStyle: { fontSize: 14, fontWeight: 'bold' } },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: { type: 'category', data: [] },
    yAxis: { type: 'value' }
  });

  // 处理 series，为每个柱应用统一的样式
  const mergedOptions = merge({}, defaultConfig, options);
  if (mergedOptions.series && Array.isArray(mergedOptions.series)) {
    mergedOptions.series = mergedOptions.series.map((item: any) => {
      return merge(
        {
          type: 'bar',
          barWidth: 18,
          itemStyle: {
            barBorderWidth: 0,
            barBorderColor: '#ccc'
          }
        },
        item
      );
    });
  }

  return mergedOptions;
}

function getLineOptions(options: EChartsOption = {}) {
  const defaultConfig = merge({}, COMMON_CONFIG, COMMON_AXIS_CONFIG, {
    title: { text: '', left: 'center', textStyle: { fontSize: 14, fontWeight: 'bold' } },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: [] },
    yAxis: { type: 'value' }
  });

  // 处理 series，为每条线应用统一的样式
  const mergedOptions = merge({}, defaultConfig, options);
  if (mergedOptions.series && Array.isArray(mergedOptions.series)) {
    mergedOptions.series = mergedOptions.series.map((item: any) => {
      return merge(
        {
          type: 'line',
          itemStyle: {
            borderWidth: '2'
          },
          lineStyle: {
            width: '3'
          },
          symbolSize: '8',
          symbol: 'emptyCircle',
          smooth: true
        },
        item
      );
    });
  }

  return mergedOptions;
}

function getPieOptions(options: EChartsOption = {}) {
  const defaultConfig = merge({}, COMMON_CONFIG, {
    title: { text: '', left: 'center', textStyle: { fontSize: 14, fontWeight: 'bold' } },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    }
  });

  // 处理 series，为饼图应用统一的样式
  const mergedOptions = merge({}, defaultConfig, options);
  if (mergedOptions.series && Array.isArray(mergedOptions.series)) {
    mergedOptions.series = mergedOptions.series.map((item: any) => {
      return merge(
        {
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 6,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            formatter: '{b}: {d}%',
            color: '#666'
          },
          labelLine: {
            show: true,
            length: 10,
            length2: 8
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold'
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        item
      );
    });
  }

  return mergedOptions;
}

export { getMapOptions, getBarOptions, getLineOptions, getPieOptions };
