const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const dbConfigs = require("./configs/db.configs");
const serverConfigs = require("./configs/server.configs");
const bodyParser = require("body-parser");
const userModel = require("./models/user.model");
const bcrypt = require("bcrypt");
const cors = require("cors")

const app = express();
app.use(cors());

mongoose.connect(dbConfigs.DB_URL)
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log("Err", err.message);
    })

app.use(bodyParser.json());

// initialRootUser()

require("./routes/movie.route")(app);
require("./routes/theatre.route")(app);
require("./routes/auth.routes")(app);
require("./routes/booking.routes")(app)
require("./routes/payment.routes")(app)

app.listen(serverConfigs.PORT, () => {
    console.log(`Application is running on PORT ${serverConfigs.PORT}`);
})

async function initialRootUser() {

    const userDetails = {
        name: "admin",
        userId: "admin",
        email: "admin@gmail.com",
        password: "qwerty123",
        userType: "ADMIN",
        userStatus: "APPROVED"
    }
    try {
        const user = await userModel.updateOne({ userId: "admin" }, {
            password: bcrypt.hashSync(userDetails.password, 8)
        })
        console.log(user);
    } catch (err) {
        console.log("error", err);
    }

}