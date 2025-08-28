const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/netsuite-api",
    createProxyMiddleware({
      target: "https://td3032620.extforms.netsuite.com",
      changeOrigin: true,
      pathRewrite: { "^/netsuite-api": "" },
      secure: false,
    })
  );
};
