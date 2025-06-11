import http from "@/network/https";
import { MESSAGE_SEND, MESSAGE_VERIFY } from "@/network/apis";

export default {
  actions: {
    messageSend(context: any, params: object) {
      return http.post(MESSAGE_SEND, params);
    },
    messageVerify(context: any, params: object) {
      return http.post(MESSAGE_VERIFY, params);
    },
  },
};
