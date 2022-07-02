<script setup>
import { useStore } from "vuex";
import ContainerComponent from "../components/ContainerComponent.vue";
import MessageField from "../components/MessageField.vue";
import ChatBubble from "../components/ChatBubble.vue";
import { computed, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import jwtDecode from "jwt-decode";
import Service from "../services";

const store = useStore();
const router = useRouter();
const chats = computed(() => store.state.chatsModule.chats);
const decode = jwtDecode(localStorage.getItem("accessToken"));

const logout = async () => {
  try {
    await Service.exitRoom({
      id: decode.id,
      roomId: decode.roomId,
    });
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("refreshToken");
    router.push("/join");
  } catch (err) {
    console.log(err);
  }
};

onBeforeMount(() => {
  store.dispatch("setChatsAction", decode.roomId);
});
</script>

<template>
  <div class="hero">
    <ContainerComponent :size="30">
      <div class="chat-room-flex">
        <header class="chat-room-header">
          <div class="chat-room-header-col">
            <p class="exit-text" @click="logout">Exit</p>
          </div>
          <div class="chat-room-header-col">
            <h1 class="room-id-text">{{ decode.roomName }}</h1>
          </div>
        </header>
        <keep-alive>
          <main class="chat-body">
            <ChatBubble
              v-for="chat in chats"
              :key="chat._id"
              :message="chat.message"
              :senderName="chat.senderName"
              :myMessage="chat.senderId === decode.id"
            />
          </main>
        </keep-alive>
        <footer class="chat-footer">
          <MessageField placeholder="Type your message..." />
        </footer>
      </div>
    </ContainerComponent>
  </div>
</template>

<style scoped>
.hero {
  height: 100vh;
  background: white;
}

.room-id-text {
  font-size: 1.8rem;
  text-transform: Capitalize;
}

.exit-text {
  font-size: 1.1rem;
  color: #5db075;
  cursor: pointer;
}

.chat-room-flex {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.chat-room-header {
  display: flex;
  align-items: center;
  height: 10%;
}

.chat-room-header-col {
  flex: 1;
}

.chat-room-header-col:last-child {
  flex: 9;
  text-align: center;
}

.chat-body {
  height: 80%;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
}

.chat-footer {
  height: 10%;
}
</style>
