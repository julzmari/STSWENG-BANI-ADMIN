// dependencies
const express = require("express");
require("dotenv").config();

const app = express();
const PORT = 3000;

// static files public folder
app.use(express.static("public"));

module.exports = { app, PORT };