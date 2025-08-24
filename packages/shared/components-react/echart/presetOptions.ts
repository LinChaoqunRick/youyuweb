import * as echarts from 'echarts';
import { GeoJSONSourceInput } from 'echarts/types/src/coord/geo/geoTypes';
import { merge } from 'lodash';
import chinaMap from '../../assets/map/china.json';
import type { EChartsOption } from 'echarts';

echarts.registerMap('china', chinaMap as GeoJSONSourceInput); // 注册地图

function getMapOptions(options: EChartsOption = {}) {
  return merge(
    {},
    {
      tooltip: {
        trigger: 'item',
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
        show: false,
      },
      geo: {
        map: 'china',
        roam: false,
        zoom: 1.76,
        top: 175,
        label: {
          show: true,
          fontSize: '14',
        },
        itemStyle: {
          borderColor: '#93eaf7',
          borderWidth: 1,
          areaColor: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.8,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(147, 235, 248, 0)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(147, 235, 248, .2)', // 100% 处的颜色
              },
            ],
            globalCoord: false, // 缺省为 false
          },
          shadowColor: 'rgba(128, 217, 248, 0.5)',
          shadowOffsetX: -2,
          shadowOffsetY: 2,
          shadowBlur: 5,
        },
        emphasis: {
          disabled: true,
        },
      },
      series: [
        {
          name: '访问数量',
          type: 'map',
          geoIndex: 0,
          selectedMode: false,
          data: [],
        },
      ],
    },
    options,
  );
}

export { getMapOptions };
