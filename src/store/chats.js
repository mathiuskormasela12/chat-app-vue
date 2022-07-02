import Service from "../services";

export const chats = {
  state() {
    return {
      chats: [],
    };
  },
  mutations: {
    setChats(state, payload) {
      state.chats = payload;
    },
    addChat(state, payload) {
      state.chats.unshift(payload);
    },
  },
  actions: {
    async setChatsAction({ commit }, roomId) {
      try {
        const { data } = await Service.getAllMessages({
          activeRoomId: roomId,
        });

        if (data.results) {
          commit("setChats", data.results);
        } else {
          commit("setChats", []);
        }
      } catch (err) {
        commit("setChats", []);
      }
    },
    async sendMessage({ commit }, data) {
      try {
        await Service.sendMessage(data);
        commit("addChat", data);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
