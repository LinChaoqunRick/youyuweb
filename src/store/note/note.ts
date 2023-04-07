import http from "@/network/https";
import {
  CREATE_NOTE,
  LIST_NOTE,
  GET_NOTE,
  UPDATE_NOTE
} from "@/network/apis";

export default {
  actions: {
    createNote(state: any, params: object) {
      return http.post(CREATE_NOTE, params);
    },
    listNote(state: any, params: object) {
      return http.post(LIST_NOTE, params);
    },
    getNote(state: any, params: object) {
      return http.post(GET_NOTE, params);
    },
    updateNote(state: any, params: object) {
      return http.post(UPDATE_NOTE, params);
    },
  }
}
