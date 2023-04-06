import http from "@/network/https";
import {
  CREATE_NOTE,
  LIST_NOTE
} from "@/network/apis";

export default {
  actions: {
    createNote(state: any, params: object) {
      return http.post(CREATE_NOTE, params);
    },
    listNote(state: any, params: object) {
      return http.post(LIST_NOTE, params);
    },
  }
}
