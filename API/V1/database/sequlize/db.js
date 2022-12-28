const Sequelize = require("sequelize");
const {DataTypes} = require("sequelize");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const Op = Sequelize.Op;
const modelPath = path.normalize(path.join(__dirname, "../.."));
const db = {};

const pool = {
    min: process.env.SEQ_POOL_MIN ? parseInt(process.env.SEQ_POOL_MIN) : 0,
    max: process.env.SEQ_POOL_MAX ? parseInt(process.env.SEQ_POOL_MAX) : 50,
    // eslint-disable-next-line max-len
    idle: process.env.SEQ_POOL_IDLE ? parseInt(process.env.SEQ_POOL_IDLE) : 10000,
    acquire: process.env.SEQ_POOL_ACQUIRE ?
        parseInt(process.env.SEQ_POOL_ACQUIRE) :
        30000,
};
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        define: {
            underscored: true,
        },
        dialectOptions: {
            ssl: false,
        },
        port: process.env.DB_PORT,
        pool: pool,
        logging: false,
        operatorsAliases: Op,
    },
);

// Test the connection
sequelize
    .authenticate()
    .then(() => {
        console.log("Sequelize: Connection has been established successfully.");
    })
    .catch((err) => {
        throw err;
    });
fs.readdirSync(path.join(modelPath, "models")).forEach((file) => {
    const model = require(path.join(modelPath, "models", file))(
        sequelize,
        DataTypes,
    );
    db[model.name] = model;
});
sequelize
    .sync({
        force: false,
    })
    .then(function() { })
    .catch((err) => {
        throw err;
    });
db.sequelize = sequelize;
console.log(db);
module.exports = db;
