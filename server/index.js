const express = require("express");
const { resolve } = require("path");

const publicPath = resolve(__dirname, "../dist/");
const app = express();

app.use(express.static(publicPath));

app.listen(3000, () => console.log("App listening on port 3000"));