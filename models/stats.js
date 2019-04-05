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
    Stats.bulkCreate([
        {
            gameID: 1,
            playerID: 1,
            type: 'KILL',
            total: 1
        },
        {
            gameID: 1,
            playerID: 5,
            type: 'KILL',
            total: 7
        },
        {
            gameID: 1,
            playerID: 6,
            type: 'KILL',
            total: 1
        },
        {
            gameID: 1,
            playerID: 1,
            type: 'SET',
            total: 2
        },
        {
            gameID: 1,
            playerID: 2,
            type: 'SET',
            total: 1
        },
        {
            gameID: 1,
            playerID: 4,
            type: 'SET',
            total: 6
        },
        {
            gameID: 1,
            playerID: 2,
            type: 'BLOCK',
            total: 1
        },
        {
            gameID: 1,
            playerID: 5,
            type: 'TIP',
            total: 2
        },
        {
            gameID: 1,
            playerID: 6,
            type: 'TIP',
            total: 1
        },
        {
            gameID: 1,
            playerID: 1,
            type: 'UFE',
            total: 4
        },
        {
            gameID: 1,
            playerID: 3,
            type: 'UFE',
            total: 5
        },
        {
            gameID: 1,
            playerID: 3,
            type: 'UFE',
            total: 3
        },
        {
            gameID: 1,
            playerID: 4,
            type: 'UFE',
            total: 2
        },
        {
            gameID: 1,
            playerID: 5,
            type: 'UFE',
            total: 15
        },
        {
            gameID: 1,
            playerID: 6,
            type: 'UFE',
            total: 1
        },
        {
            gameID: 1,
            playerID: 1,
            type: 'ACE',
            total: 4
        },
        {
            gameID: 1,
            playerID: 2,
            type: 'ACE',
            total: 1
        },
        {
            gameID: 1,
            playerID: 3,
            type: 'ACE',
            total: 3
        },
        {
            gameID: 1,
            playerID: 4,
            type: 'ACE',
            total: 1
        },
        {
            gameID: 1,
            playerID: 5,
            type: 'ACE',
            total: 2
        },
        {
            gameID: 1,
            playerID: 1,
            type: 'DIG',
            total: 1
        },
        {
            gameID: 1,
            playerID: 3,
            type: 'DIG',
            total: 4
        },
        {
            gameID: 1,
            playerID: 4,
            type: 'DIG',
            total: 2
        }
    ]);
console.log("Created Stats table and test Stats");
});

module.exports = Stats;