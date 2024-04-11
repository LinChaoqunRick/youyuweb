import http from "@/network/https";
import {
  GET_MICRO_MODULE_CONFIG,
  GET_SECURITY_DEVICE_LIST,
  GET_ALARM_LEVEL_LIST,
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
  },
};
