<template>
  <div class="map-wrapper">
    <div id="mapContainer"></div>
    <div class="search-box" v-if="search">
      <a-auto-complete
        v-model="keyword"
        allowClear
        :options="options"
        :virtual="false"
        placeholder="输入地点搜索"
        dropdownClassName="a-map-autocomplete-selector"
        @search="handleSearch"
        style="width: 360px"
      >
        <template #option="data">
          <div class="options-item" @click="handleSelect(data.name, data)">
            <i-local-two
              theme="outline"
              size="18"
              fill="#666"
              :strokeWidth="3"
            />
            <div class="item-name">{{ data.name }}</div>
            <div class="address-text">{{ data.district }}</div>
          </div>
        </template>
      </a-auto-complete>
    </div>
  </div>
</template>

<script setup>
import {computed, watch, ref, onMounted, onUnmounted} from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import debounce from "lodash/debounce";
import {useStore} from "vuex";

const props = defineProps({
  modelValue: {
    type: Object,
    default() {
      return {};
    },
  },
  search: {
    type: Boolean,
    default() {
      return true;
    },
  },
  clickable: {
    type: Boolean,
    default() {
      return true;
    },
  },
  geolocation: {
    type: Boolean,
    default() {
      return true;
    },
  },
});
const emit = defineEmits(["update:modelValue"]);
const {getters} = useStore();
let map = null;
const options = ref([]);

// 当前用户位置信息
const currentLocation = ref({});

// 用户选取地点
const location = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

const theme = computed(() => {
  return getters.currentTheme;
})

watch(location, (val) => {
  if (val.longitude && val.latitude) drawMarker();
});

const keyword = ref("");
let placeSearch, AMapObj, marker, geocoder, auto;

const initMap = () => {
  let center = null;
  if (getCoordinates(location.value)) {
    const {longitude, latitude} = location.value;
    if (longitude !== "" && longitude != null && latitude !== "" && latitude != null) {
      center = [longitude, latitude];
    }
  }

  AMapLoader.load({
    key: "32a8defe4c4bf9a137addba80cc34e47", // 申请好的Web端Key，首次调用 load 时必填
    version: "2.0",
  }).then((AMap) => {
    AMapObj = AMap;
    map = new AMap.Map("mapContainer", {
      viewMode: "3D", // 默认使用 2D 模式
      zoom: 11, //初始化地图层级
      center, //初始化地图中心点
      mapStyle: theme.value === "light" ? "amap://styles/normal" : "amap://styles/dark", //设置地图的显示样式
    });
    // 添加点击事件
    props.clickable && map.on("click", onMapClick);

    AMap.plugin(
      [
        "AMap.ToolBar",
        "AMap.Scale",
        "AMap.Geolocation",
        "AMap.PlaceSearch",
        "AMap.Geocoder",
        "AMap.ControlBar",
        "AMap.AutoComplete",
      ],
      () => {
        // 缩放条
        const toolbar = new AMap.ToolBar({
          position: {
            bottom: "10px",
            right: "10px",
          },
        });
        map.addControl(toolbar);

        // 比例尺
        const scale = new AMap.Scale({
          position: {
            bottom: "10px",
            left: "10px",
          },
        });
        map.addControl(scale);

        // 3D地图插件
        const controlBar = new AMap.ControlBar({
          position: {
            top: "10px",
            right: "10px",
          },
        });
        map.addControl(controlBar);

        // 地理编码与逆地理编码
        geocoder = new AMap.Geocoder({
          city: "全国",
        });

        const initAutoAndPlaceSearch = () => {
          // AutoComplete主要用于即时的用户输入建议，而PlaceSearch用于获取更多关于特定地点的详细信息。
          // 选择使用哪个API取决于你的应用需求，如果你需要快速的用户输入建议，那么AutoComplete是一个不错的选择；
          // 如果你需要获取更多地点详细信息，那么PlaceSearch更适合。

          // 输入提示与POI搜索
          auto = new AMap.AutoComplete({
            city: currentLocation.value.adcode,
            datatype: "all",
          });

          // 地区搜索
          placeSearch = new AMap.PlaceSearch({
            map: map,
            city: currentLocation.value.adcode,
            pageSize: 10, // 单页显示结果条数
            pageIndex: 1, // 页码
            citylimit: true, // 是否强制限制在设置的城市内搜索
            autoFitView: true,
          });
        }

        // 定位
        if (props.geolocation) {
          const geolocation = new AMap.Geolocation({
            position: {
              bottom: "80px",
              right: "10px",
            },
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：5s
            panToLocation: true, //定位成功后是否自动移动到响应位置
            zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
            GeoLocationFirst: true,
            getCityWhenFail: true,
            needAddress: true,
            extensions: "all",
          });
          map.addControl(geolocation);

          if (!getCoordinates(location.value)) {
            // 如果定位值不存在，自动获取当前位置
            geolocation.getCurrentPosition();
          } else {
            // 如果定位值存在，获取定位值信息
            createMarkerByLngLat(location.value.longitude, location.value.latitude);
          }

          // 执行回调函数
          AMapObj.Event.addListener(geolocation, 'complete', function (data) {
            currentLocation.value = data;
            const {lng, lat} = data.position;
            createMarkerByLngLat(lng, lat);
            initAutoAndPlaceSearch();
          });

          // 监听定位失败事件
          AMapObj.Event.addListener(geolocation, 'error', function (err) {
            initAutoAndPlaceSearch();
          });
        }
      }
    );
    drawMarker();
  });
};

// 搜索地图
const handleSearch = debounce((queryString) => {
  // 1.使用:输入提示，提供了根据关键字获得提示信息的功能
  auto.search(queryString, (info, result) => {
    if (result && typeof result === 'object' && result.tips) {
      result.tips.forEach(item => {
        item.fullAddress = item.district + item.name;
      })
      options.value = result.tips;
    } else {
      options.value = [];
    }
  })

  // 2.使用:地点搜索服务，提供了关键字搜索、周边搜索、范围内搜索等功能，与AutoComplete不同的是，它会在地图上标记地点
  /*placeSearch.search(queryString, (status, result) => {
    if (result && typeof result === "object" && result.poiList) {
      const list = result.poiList.pois;
      list.forEach((item) => {
        item.district = item.pname + item.cityname + item.adname;
        item.fullAddress = item.district + item.name;
      });
      options.value = list;
    } else {
      options.value = [];
    }
  });*/
}, 500);

// 点击地图
const onMapClick = (e) => {
  const {lng, lat} = e.lnglat;
  // 逆地理编码
  geocoder.getAddress([lng, lat], (status, result) => {
    if (status === "complete" && result.info === "OK") {
      const {addressComponent, formattedAddress} = result.regeocode;
      let {city, province, district, township} = addressComponent;
      const prefix = province + city + district + township;
      location.value = {
        longitude: lng,
        latitude: lat,
        address: formattedAddress,
        zone: [province, city, district],
        name: formattedAddress.split(prefix)[1] || township,
      };
    }

    if (!!getCoordinates(location.value)) {
      drawMarker();
    }
  });
};

// 点击搜索项
const handleSelect = (value, option) => {
  const {pname, cityname, adname, fullAddress, name} = option;
  const {lng, lat} = option.location;
  location.value = {
    longitude: lng,
    latitude: lat,
    address: fullAddress,
    zone: [pname, cityname, adname],
    name,
  };
  map.setZoomAndCenter(map.getZoom(), [lng, lat]);
};

// 绘制地点marker
const drawMarker = (val) => {
  if (!location.value) return;
  const coordinate = getCoordinates(location.value || val);
  if (!coordinate) {
    return;  // 无效坐标不绘制
  }
  if (marker) {
    marker.setMap(null);
    marker = null;
  }
  marker = new AMapObj.Marker({
    position: new AMapObj.LngLat(coordinate.longitude, coordinate.latitude),
    anchor: "bottom-center",
  });
  map.add(marker);
  if (map.getZoom() < 17) {
    map.setZoomAndCenter(17, [coordinate.longitude, coordinate.latitude]);
  } else {
    map.setZoom(map.getZoom());
  }
};

const createMarkerByLngLat = (longitude, latitude) => {
  onMapClick({
    lnglat: {
      lng: longitude,
      lat: latitude
    },
  });
}

const getCoordinates = (val) => {
  if (!val) {
    return null;
  }
  const {longitude, latitude} = val;
  if (longitude === "" || longitude == null || latitude === "" || latitude == null) {
    return null;
  } else {
    return {longitude, latitude};
  }
}

onMounted(() => {
  initMap();
});

onUnmounted(() => {
  map?.destroy();
});
</script>

<style lang="scss" scoped>
.map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  #mapContainer {
    width: 100%;
    height: 100%;
  }

  .search-box {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
    display: flex;
    align-items: center;
  }

  ::v-deep(.amap-logo),
  ::v-deep(.amap-copyright) {
    display: none !important;
  }

  ::v-deep(.amap-luopan) {
    zoom: 0.8;
  }
}
</style>

<style lang="scss">
.a-map-autocomplete-selector {
  transition: 0s !important;

  .options-item {
    display: flex;
    align-items: center;
    width: fit-content;

    .i-icon {
      margin-right: 4px;
    }

    .item-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 235px;
    }

    .address-text {
      font-size: 12px;
      color: #999999;
      margin-left: 12px;
    }
  }

  .rc-virtual-list-holder {
    max-height: 320px !important;
  }
}
</style>
