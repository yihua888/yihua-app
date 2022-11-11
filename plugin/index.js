export const readPlugins = () => {
  const rst = [];
  const plugins = import.meta.globEager("@plugin/**/*.js");
  Object.keys(plugins).forEach((key) => {
    rst.push({
      name: key.replace("/plugin/", "").replace(".js", ""),
      info: plugins[key].default,
    });
  });
  return rst;
};
