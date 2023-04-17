import http from "@/network/https";
import {
  MESSAGE_SEND,
  MESSAGE_VERIFY
} from "@/network/apis";

export default {
  actions: {
    messageSend(state: any, params: object) {
      return http.post(MESSAGE_SEND, params);
    },
    messageVerify(state: any, params: object) {
      return http.post(MESSAGE_VERIFY, params);
    },

  }
}
