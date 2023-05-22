import http from "@/network/https";
import {
  CREATE_MOMENT,
  DELETE_MOMENT
} from "@/network/apis";

export default {
  actions: {
    createMoment(state: any, params: object) {
      return http.post(CREATE_MOMENT, params);
    },
    deleteMoment(state: any, params: object) {
      return http.post(DELETE_MOMENT, params);
    },
  }
}
