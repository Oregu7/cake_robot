const express = require("express");
const app = express();

app.use(require("forest-express-mongoose").init({
    modelsDir: __dirname + "/models", // Your models directory.
    envSecret: process.env.FOREST_ENV_SECRET,
    authSecret: process.env.FOREST_AUTH_SECRET,
    mongoose: require("mongoose"), // The mongoose database connection.
}));

module.exports = app;