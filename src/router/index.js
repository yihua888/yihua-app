import { createRouter, createWebHistory } from "vue-router";
import { getCache } from "@/utils/cache";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/index.vue"),
  },
  {
    name:"NotFont",
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFont/index.vue'),
    alias:'/404'
  }
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to) => {
  if (to.path === '/') {
    return '/main/dashboard'
  }

  if(to.path === '/main'){
    return '/main/dashboard'
  }

  if (to.path !== "/login") {
    const token = getCache("token");
    //  判断是否存在token
    if (!token) {
      return "/login";
    }
  }
});

export default router;
