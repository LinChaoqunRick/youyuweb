import http from "@/network/https";
import {
  GET_MICRO_MODULE_CONFIG,
  GET_SECURITY_DEVICE_LIST,
  GET_ALARM_LEVEL_LIST,
  GET_MICRO_CAPACITY_UBIT,
  GET_MICRO_CAPACITY_COOLING,
  GET_MICRO_CAPACITY_POWER
} from "@/network/apis";

export default {
  actions: {
    getMicroModuleConfig(context: any, params: object) {
      return http.get(GET_MICRO_MODULE_CONFIG, params);
    },
    getSecurityDeviceList(context: any, params: object) {
      return http.get(GET_SECURITY_DEVICE_LIST, params);
    },
    getAlarmLevelList(context: any, params: object) {
      return http.get(GET_ALARM_LEVEL_LIST, params);
    },
    getMicroCapacityUbit(context: any, params: object) {
      return http.get(GET_MICRO_CAPACITY_UBIT, params);
    },
    getMicroCapacityCooling(context: any, params: object) {
      return http.get(GET_MICRO_CAPACITY_COOLING, params);
    },
    getMicroCapacityPower(context: any, params: object) {
      return http.get(GET_MICRO_CAPACITY_POWER, params);
    },
  },
};
