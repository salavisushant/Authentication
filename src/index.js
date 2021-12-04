const express = require('express');

const {register,login}= require("./controller/auth.controller")
const profileController = require("./controller/profile.controller")

const app = express();

app.use(express.json());

app.post("/register", register);
app.post("/login", login);

app.use ("/profile", profileController);

module.exports = app;