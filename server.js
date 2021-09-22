const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload")

// CONFIG
// dotenv
require("dotenv").config();
// mongodb
require("./config/mongoDB")();


// MIDDLEWARES
app.use(fileUpload());
app.use(express.static("./public"))
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("./client/build"))

// URLS
require("./urls")(app);

const PORT = process.env.PORT || 2020;
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));

