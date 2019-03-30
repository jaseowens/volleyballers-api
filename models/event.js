//User model definition
//Requirements:
const Sequelize = require('sequelize');
const config = require('../config/config');
const bcrypt = require('bcrypt');

//Instantiate sequelize, and connect to db
//{dbname, user, password}
var sequelize = new Sequelize(config.db_name,config.db_user,config.db_password,{
    //sequelize can be used with many db languages, for this project, psql
    dialect: 'postgres',
    //host of the db
    host: config.db_host
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Successfully connected to Event table");
    })
    .catch(() =>{
        console.log("Something went wrong connecting to Event table");
    });

//Define user
var Event = sequelize.define('event', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    gameID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    playerID: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

// force: true will drop the table if it already exists
Event.sync({force: true}).then(() => {
    // Table created
    Event.create(
        {
            gameID: 1,
            type: 'SPIKE',
            playerID: 1
        }
    );
console.log("Created Event table and test Event");
});

module.exports = Event;