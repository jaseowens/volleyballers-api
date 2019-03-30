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
        console.log("Successfully connected to Stats table");
    })
    .catch(() =>{
        console.log("Something went wrong connecting to Stats table");
    });

//Define user
var Stats = sequelize.define('stats', {
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
    playerID: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    total: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

// force: true will drop the table if it already exists
Stats.sync({force: true}).then(() => {
    // Table created
    Stats.create(
        {
            gameID: 1,
            playerID: 1,
            type: 'SPIKE',
            total: 3
        }
    );
console.log("Created Stats table and test Stats");
});

module.exports = Stats;