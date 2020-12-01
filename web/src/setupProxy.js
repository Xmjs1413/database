const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/operation',
        createProxyMiddleware({
            target: 'http://168.63.21.90:8000',
            changeOrigin: true,
            pathRewrite: {
                "^/operation": "",
            }
        })
    )
};