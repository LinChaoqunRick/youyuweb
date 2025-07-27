import { MESSAGE_SEND, MESSAGE_VERIFY } from '@youyu/shared/apis';
import http from '@youyu/shared/network';

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
