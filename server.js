const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
// const sequelize = require("./API/V1/database/sequlize/db");

app.use(bodyParser.urlencoded({extended: true, limit: "100mb"}));
app.use(bodyParser.json({limit: "100mb"}));
app.use(
    cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
        exposedHeaders: ["Content-Disposition"],
    }),
);
app.use(express.json());
require("./API/V1/routes")(app);
app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
});
