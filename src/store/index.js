import { createStore } from "vuex";
import { chats } from "./chats";

export const store = createStore({
  modules: {
    chatsModule: chats,
  },
});
