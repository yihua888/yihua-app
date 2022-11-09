import { generateAxios } from "./request";

const instance = generateAxios({
  timeout: 60000,
});

const getUsers = async () => {
  const users = await instance.get("/api/user");
  return users;
};

const login = (params) =>
  new Promise(async (resolve, reject) => {
    const users = await getUsers();
    const user = users.find(
      (item) =>
        item.username === params.username && item.password === params.password
    );
    if (user) {
      resolve({
        data: user,
        msg: "验证成功",
        code: 200,
      });
    }

    reject({
      data: null,
      msg: "用户名或账号错误",
      code: 400,
    });
  });

const getMenu = async (identity) =>
  new Promise(async (resolve, reject) => {
    const roles = await instance.get("/api/role");
    const role = roles.find((item) => item.identity === identity);
    if (role) {
      resolve({
        data: role,
        code: 200,
        msg: "请求成功",
      });
    }
    reject({
      data: null,
      msg: "获取权限失败",
      code: 400,
    });
  });

export { login, getMenu };
