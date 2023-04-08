import http from "@/network/https";
import {
  CREATE_NOTE,
  LIST_NOTE,
  GET_NOTE,
  UPDATE_NOTE,
  CREATE_NOTE_CHAPTER,
  LIST_NOTE_CHAPTER,
  GET_NOTE_CHAPTER,
  UPDATE_NOTE_CHAPTER,
  DELETE_NOTE_CHAPTER,
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
    createNoteChapter(state: any, params: object) {
      return http.post(CREATE_NOTE_CHAPTER, params);
    },
    listNoteChapter(state: any, params: object) {
      return http.post(LIST_NOTE_CHAPTER, params);
    },
    getNoteChapter(state: any, params: object) {
      return http.post(GET_NOTE_CHAPTER, params);
    },
    updateNoteChapter(state: any, params: object) {
      return http.post(UPDATE_NOTE_CHAPTER, params);
    },
    deleteNoteChapter(state: any, params: object) {
      return http.post(DELETE_NOTE_CHAPTER, params);
    },
  }
}
