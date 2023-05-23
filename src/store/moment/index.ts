import http from "@/network/https";
import {
  MOMENT_CREATE,
  MOMENT_DELETE,
  MOMENT_LIST
} from "@/network/apis";

export default {
  actions: {
    createMoment(state: any, params: object) {
      return http.post(MOMENT_CREATE, params);
    },
    deleteMoment(state: any, params: object) {
      return http.post(MOMENT_DELETE, params);
    },
    momentList(state: any, params: object) {
      return http.post(MOMENT_LIST, params);
    },
  }
}
