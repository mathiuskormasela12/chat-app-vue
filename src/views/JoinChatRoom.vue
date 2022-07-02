<script setup>
// ====== Import all modules
import { ref } from "vue";
import { useRouter } from "vue-router";
import ContainerComponent from "../components/ContainerComponent.vue";
import Service from "../services";

const router = useRouter();
const username = ref("");
const roomId = ref("");
const errorMessage = ref("");

const join = async () => {
  try {
    const { data } = await Service.joinRoom({
      username: username.value,
      roomId: roomId.value,
    });
    localStorage.setItem("accessToken", data.results.accessToken);
    localStorage.setItem("refreshToken", data.results.refreshToken);
    router.push("/");
  } catch (err) {
    errorMessage.value =
      err && err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : err && err.message
        ? err.message
        : "Server Error";
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};
</script>

<template>
  <div class="hero">
    <ContainerComponent :size="80">
      <div class="hero-flex">
        <header class="header">
          <h1 class="title">Join Chat Room</h1>
        </header>
        <form class="form">
          <div class="form-row">
            <div class="form-section">
              <div class="control">
                <input
                  type="text"
                  class="text-field"
                  placeholder="Username"
                  v-model="username"
                />
              </div>
              <div class="control">
                <input
                  type="text"
                  class="text-field"
                  placeholder="Room Id"
                  v-model="roomId"
                />
              </div>
            </div>
            <div class="form-section">
              <p class="error-message" v-if="errorMessage !== ''">
                {{ errorMessage }}
              </p>
              <button type="button" class="button" @click="join">Join</button>
            </div>
          </div>
        </form>
      </div>
    </ContainerComponent>
  </div>
</template>

<style scoped>
.hero {
  background-color: white;
}

.hero-flex {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form {
  flex: 5;
  display: flex;
  justify-content: center;
}

.title {
  text-align: center;
  font-size: 2.1rem;
}

.control {
  margin-bottom: 1.5rem;
}

.control:last-child {
  margin-bottom: 0;
}

.button {
  width: 100%;
  height: 3.5rem;
  outline: none;
  border: none;
  color: white;
  background-color: #5db075;
  border-radius: 25px;
  font-size: 1.5rem;
  cursor: pointer;
}

.form-section {
  width: 100%;
  flex-direction: column;
}

.form-section:first-child {
  height: 50%;
}

.form-section:last-child {
  height: 50%;
}

.form-row {
  width: 20rem;
  display: flex;
  flex-direction: column;
}

.error-message {
  color: hsl(348, 100%, 61%);
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: bold;
}

.text-field {
  outline: none;
  border: 1px solid #e8e8e8;
  background-color: #f6f6f6;
  width: 100%;
  height: 3.5rem;
  border-radius: 9px;
  padding-left: 0.8rem;
  font-size: 1rem;
}
</style>
