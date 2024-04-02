import http from "@/network/https";
import {
  GET_MICRO_MODULE_CONFIG,
} from "@/network/apis";

export default {
  actions: {
    getMicroModuleConfig(context: any, params: object) {
      return http.get(GET_MICRO_MODULE_CONFIG, params);
    },
  },
};
