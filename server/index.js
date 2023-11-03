require('dotenv').config();
const app = require('./app');
const ViteExpress = require("vite-express");

const {PORT} = process.env;

ViteExpress.listen(app, PORT, () =>
  console.log("Server is listening at http://localhost:" + PORT)
);