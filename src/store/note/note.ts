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
    createNote(context: any, params: object) {
      return http.post(CREATE_NOTE, params);
    },
    listNote(context: any, params: object) {
      return http.post(LIST_NOTE, params);
    },
    getNote(context: any, params: object) {
      return http.post(GET_NOTE, params);
    },
    updateNote(context: any, params: object) {
      return http.post(UPDATE_NOTE, params);
    },
    createNoteChapter(context: any, params: object) {
      return http.post(CREATE_NOTE_CHAPTER, params);
    },
    listNoteChapter(context: any, params: object) {
      return http.post(LIST_NOTE_CHAPTER, params);
    },
    getNoteChapter(context: any, params: object) {
      return http.post(GET_NOTE_CHAPTER, params);
    },
    updateNoteChapter(context: any, params: object) {
      return http.post(UPDATE_NOTE_CHAPTER, params);
    },
    deleteNoteChapter(context: any, params: object) {
      return http.post(DELETE_NOTE_CHAPTER, params);
    },
  },
};
