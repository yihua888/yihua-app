import { login, getMenu } from "@/serve/login";
import { getCache, setCache } from "@/utils/cache";
import { getToken } from "@/utils/utils";
import router from "@/router";

import { mapMenusToRotes } from "@/utils/map-menus";

const loginModule = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
    };
  },
  getters: {},
  mutations: {
    changeToken(state, token) {
      state.token = token;
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus) {
      state.userMenus = userMenus;
      // userMenus => routes
      const routes = mapMenusToRotes(userMenus);
      console.log(routes);
      routes.forEach((route) => {
        router.addRoute("main", route);
      });
    },
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload) {
      // 发送到服务器进行登录验证，并请求权限及菜单
      const { data } = await login(payload);
      // 本人是通过json-server，所以没有token。设置假的token
      const token = getToken(data.id);
      commit("changeToken", token);
      setCache("token", token);

      commit("changeUserInfo", data);
      setCache("userInfo", data);

      // 请求菜单权限
      const {
        data: { menu },
      } = await getMenu(data.identity);

      commit("changeUserMenus", menu[0].children);
      setCache("userMenus", menu[0].children);
      router.push("/main");
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = getCache("token");
      if (token) {
        commit("changeToken", token);
        // 请求权限
      }
      const userInfo = getCache("userInfo");
      if (userInfo) {
        commit("changeUserInfo", userInfo);
      }
      const userMenus = getCache("userMenus");
      if (userMenus) {
        commit("changeUserMenus", userMenus);
      }
    },
  },
};

export default loginModule;
