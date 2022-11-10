import { createRouter, createWebHistory } from "vue-router";
import { getCache } from "@/utils/cache";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/",
    name: "main",
    component: () => import("@/views/main/index.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/index.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = getCache("token");
    //  判断是否存在token
    if (!token) {
      return "/login";
    }
  }

  if (to.path === "/login") {
    const token = getCache("token");
    //  判断是否存在token
    return "/main";
  }
});

export default router;
