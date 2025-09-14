import { PAGE_LINK } from '@youyu/shared/apis';
import http from '@youyu/shared/network';

export default {
  actions: {
    getLinkList(context: any, params: object) {
      return http.get(PAGE_LINK, params);
    },
  },
};
