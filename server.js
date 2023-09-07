const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const dbConfigs = require("./configs/db.configs");
const serverConfigs = require("./configs/server.configs");
const bodyParser = require("body-parser");

const app = express();

mongoose.connect(dbConfigs.DB_URL)
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log("Err", err.message);
    })

app.use(bodyParser.json());
require("./routes/movie.route")(app);
require("./routes/theatre.route")(app)

app.listen(serverConfigs.PORT, () => {
    console.log(`Application is running on PORT ${serverConfigs.PORT}`);
})