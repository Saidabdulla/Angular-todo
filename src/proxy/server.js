const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true
};

app.use(cors(corsOptions));

app.use('/', createProxyMiddleware({
  target: 'https://joldibaev.uz',
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    console.log('Proxying request to:', proxyReq.path);
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log('Received response from:', proxyRes.req.path);
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy error');
  }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
