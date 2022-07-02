import { createRouter, createWebHistory } from "vue-router";
import ChatRoom from "../views/ChatRoom.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "ChatRoom",
      component: ChatRoom,
    },
    {
      path: "/join",
      name: "JoinChatRoom",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/JoinChatRoom.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const accessToken = window.localStorage.getItem("accessToken");
  const refreshToken = window.localStorage.getItem("refreshToken");

  if (!accessToken && !refreshToken && to.name === "ChatRoom") {
    next({ name: "JoinChatRoom" });
  } else {
    if (accessToken && refreshToken && to.name === "JoinChatRoom") {
      next({ name: "ChatRoom" });
    } else {
      next();
    }
  }
});

export default router;
