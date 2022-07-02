<script setup>
defineProps({
  message: String,
  senderName: String,
  myMessage: Boolean,
});
</script>

<template>
  <div class="bubble-container" :style="myMessage && 'align-items: flex-end;'">
    <p class="sender-name" v-if="!myMessage">{{ senderName }}</p>
    <div
      class="chat-bubble"
      :style="
        myMessage
          ? 'background-color: #F6F6F6'
          : 'background-color: #5DB075; color: white;'
      "
    >
      <p class="bubble-text">{{ message }}</p>
    </div>
  </div>
</template>

<style scoped>
.bubble-container {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.chat-bubble {
  padding: 0.7rem 1rem 0.7rem 1rem;
  border-radius: 10px;
  max-width: 17rem;
  width: auto;
}

.bubble-text {
  font-size: 1rem;
}

.sender-name {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
}
</style>
