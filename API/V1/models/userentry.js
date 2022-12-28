"use strict";
const {Schema} = require("../constants/database-constants");
module.exports = function(sequelize, DataTypes) {
    const userentry = sequelize.define(Schema.USER_ENTRY, {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: DataTypes.STRING,
        image: DataTypes.STRING,
        phone: DataTypes.STRING,
        phoneverifiedat: DataTypes.DATE,
        // eslint-disable-next-line new-cap
        oldpasswords: DataTypes.ARRAY(DataTypes.STRING),
        tfa: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        otptfa: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        u2ftfa: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        rank: DataTypes.INTEGER,
        wrongentrycount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        blockedtime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        salt: DataTypes.STRING,
        currentstatus: DataTypes.STRING,
        lastloggedintime: {
            type: DataTypes.DATE,
        },
        lastactivedate: {
            type: DataTypes.DATE,
        },
        passwordlessloginauthkey: DataTypes.JSON,
        ispasswordlessloginenabled: DataTypes.BOOLEAN,
        enablenotification: DataTypes.BOOLEAN,
        privatekeyencsalt: DataTypes.STRING,
    });

    return userentry;
};
