import http from "@/network/https";
import {
  MESSAGE_SEND
} from "@/network/apis";

export default {
  actions: {
    messageSend(state: any, params: object) {
      return http.post(MESSAGE_SEND, params);
    },
  }
}
