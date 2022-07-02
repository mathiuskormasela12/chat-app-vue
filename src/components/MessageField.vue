<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import jwtDecode from "jwt-decode";

const { dispatch } = useStore();
const message = ref("");
const decode = jwtDecode(localStorage.getItem("accessToken"));

defineProps({
  placeholder: String,
});

const send = () => {
  const data = {
    message: message.value,
    activeRoomId: decode.roomId,
    senderId: decode.id,
  };
  dispatch("sendMessage", data);
  message.value = "";
};
</script>

<template>
  <div class="input-container">
    <div class="input-left">
      <input
        type="text"
        v-model="message"
        class="input-field"
        :placeholder="placeholder"
      />
    </div>
    <div class="input-right">
      <button type="button" class="send-button" @click="send">
        <img class="icon" src="@/assets/icons/arrow.svg" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.input-container {
  outline: none;
  border: 1px solid #e8e8e8;
  background-color: #f6f6f6;
  height: 3.5rem;
  border-radius: 25px;
  font-size: 1rem;
  display: flex;
  overflow: hidden;
  padding-left: 1rem;
}

.input-left {
  height: 100%;
  flex: 5;
}

.input-right {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 0.9rem;
  height: 0.9rem;
}

.input-field {
  border: none;
  outline: none;
  background-color: transparent;
  height: 100%;
  width: 100%;
  font-size: 1rem;
}

.input-field::-webkit-input-placeholder {
  color: #bdbdbd;
}

.input-field::-moz-input-placeholder {
  color: #bdbdbd;
}

.input-field::-ms-input-placeholder {
  color: #bdbdbd;
}

.send-button {
  outline: none;
  border: none;
  background-color: #5db075;
  height: 2.2rem;
  width: 2.2rem;
  cursor: pointer;
  border-radius: 50%;
}
</style>
