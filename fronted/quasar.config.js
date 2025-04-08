/* eslint-env node */
module.exports = function (ctx) {
  return {
    boot: [],
    css: ["app.scss"],
    extras: ["roboto-font", "material-icons"],
    framework: {
      config: {},
      plugins: [],
    },
    build: {
      vueRouterMode: "hash",
    },
    devServer: {
      open: true,
    },
  };
};
