<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";
import socket from "./helpers/socket";

const store = useStore();

onMounted(() => {
  socket.onAny(() => {
    socket.once("SEND_MESSAGE", (id) => {
      store.dispatch("setChatsAction", id);
    });
  });
});
</script>

<template>
  <router-view />
</template>

<style>
@font-face {
  src: url("@/assets/fonts/Inter-Regular.ttf");
  font-family: inter;
}

@font-face {
  src: url("@/assets/fonts/Inter-Bold.ttf");
  font-family: inter-bold;
}

@font-face {
  src: url("@/assets/fonts/Inter-Light.ttf");
  font-family: inter-light;
}

html {
  background-color: white;
  font-size: 16px;
  font-family: inter;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h1 {
  font-size: 2.8rem;
}

h2 {
  font-size: 2.6rem;
}

h3 {
  font-size: 2.4rem;
}

h4 {
  font-size: 2.2rem;
}
h5 {
  font-size: 2rem;
}

h6 {
  font-size: 1.8rem;
}

input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance: none;
}
</style>
