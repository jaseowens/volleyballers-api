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
    playerUsername: {
        type: Sequelize.STRING,
        allowNull: true
    },
    playerName: {
        type: Sequelize.STRING,
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
            playerUsername: 'jowens',
            playerName: 'Jase Owens',
            type: 'KILL',
            total: 1
        },
        {
            gameID: 1,
            playerUsername: 'jcox',
            playerName: 'Jackie Cox',
            type: 'KILL',
            total: 7
        },
        {
            gameID: 1,
            playerUsername: 'jwalker',
            playerName: 'Joy Walker',
            type: 'KILL',
            total: 1
        },
        {
            gameID: 1,
            playerUsername: 'jowens',
            playerName: 'Jase Owens',
            type: 'SET',
            total: 2
        },
        {
            gameID: 1,
            playerUsername: 'btaylor',
            playerName: 'Brandon Taylor',
            type: 'SET',
            total: 1
        },
        {
            gameID: 1,
            playerUsername: 'kgoodwin',
            playerName: 'Katelyn Goodwin',
            type: 'SET',
            total: 6
        },
        {
            gameID: 1,
            playerUsername: 'btaylor',
            playerName: 'Brandon Taylor',
            type: 'BLOCK',
            total: 1
        },
        {
            gameID: 1,
            playerUsername: 'jcox',
            playerName: 'Jackie Cox',
            type: 'TIP',
            total: 2
        },
        {
            gameID: 1,
            playerUsername: 'jwalker',
            playerName: 'Joy Walker',
            type: 'TIP',
            total: 1
        },
        {
            gameID: 1,
            playerUsername: 'jowens',
            playerName: 'Jase Owens',
            type: 'UFE',
            total: 4
        },
        {
            gameID: 1,
            playerUsername: 'ndalton',
            playerName: 'Natalie Dalton',
            type: 'UFE',
            total: 5
        },
        {
            gameID: 1,
            playerUsername: 'kgoodwin',
            playerName: 'Katelyn Goodwin',
            type: 'UFE',
            total: 2
        },
        {
            gameID: 1,
            playerUsername: 'jcox',
            playerName: 'Jackie Cox',
            type: 'UFE',
            total: 15
        },
        {
            gameID: 1,
            playerUsername: 'jwalker',
            playerName: 'Joy Walker',
            type: 'UFE',
            total: 1
        },
        {
            gameID: 1,
            playerUsername: 'jowens',
            playerName: 'Jase Owens',
            type: 'ACE',
            total: 4
        },
        {
            gameID: 1,
            playerUsername: 'btaylor',
            playerName: 'Brandon Taylor',
            type: 'ACE',
            total: 1
        },
        {
            gameID: 1,
            playerUsername: 'ndalton',
            playerName: 'Natalie Dalton',
            type: 'ACE',
            total: 3
        },
        {
            gameID: 1,
            playerUsername: 'kgoodwin',
            playerName: 'Katelyn Goodwin',
            type: 'ACE',
            total: 1
        },
        {
            gameID: 1,
            playerUsername: 'jcox',
            playerName: 'Jackie Cox',
            type: 'ACE',
            total: 2
        },
        {
            gameID: 1,
            playerUsername: 'jowens',
            playerName: 'Jase Owens',
            type: 'DIG',
            total: 1
        },
        {
            gameID: 1,
            playerUsername: 'ndalton',
            playerName: 'Natalie Dalton',
            type: 'DIG',
            total: 4
        },
        {
            gameID: 1,
            playerUsername: 'kgoodwin',
            playerName: 'Katelyn Goodwin',
            type: 'DIG',
            total: 2
        },
        {
            gameID: 2,
            playerUsername: 'btaylor',
            playerName: 'Brandon Taylor',
            type: 'KILL',
            total: 2
        },
        {
            gameID: 2,
            playerUsername: 'btaylor',
            playerName: 'Brandon Taylor',
            type: 'SET',
            total: 1
        },
        {
            gameID: 2,
            playerUsername: 'btaylor',
            playerName: 'Brandon Taylor',
            type: 'TIP',
            total: 2
        },
        {
            gameID: 2,
            playerUsername: 'btaylor',
            playerName: 'Brandon Taylor',
            type: 'UFE',
            total: 1
        },
        {
            gameID: 2,
            playerUsername: 'btaylor',
            playerName: 'Brandon Taylor',
            type: 'DIG',
            total: 1
        },
        {
            gameID: 2,
            playerUsername: 'jowens',
            playerName: 'Jase Owens',
            type: 'SET',
            total: 2
        },
        {
            gameID: 2,
            playerUsername: 'jowens',
            playerName: 'Jase Owens',
            type: 'ACE',
            total: 3
        },
        {
            gameID: 2,
            playerUsername: 'jowens',
            playerName: 'Jase Owens',
            type: 'UFE',
            total: 1
        },
        {
            gameID: 2,
            playerUsername: 'ndalton',
            playerName: 'Natalie Dalton',
            type: 'KILL',
            total: 1
        },
        {
            gameID: 2,
            playerUsername: 'ndalton',
            playerName: 'Natalie Dalton',
            type: 'SET',
            total: 1
        },
        {
            gameID: 2,
            playerUsername: 'ndalton',
            playerName: 'Natalie Dalton',
            type: 'ACE',
            total: 2
        },
        {
            gameID: 2,
            playerUsername: 'ndalton',
            playerName: 'Natalie Dalton',
            type: 'UFE',
            total: 1
        },
        {
            gameID: 2,
            playerUsername: 'ndalton',
            playerName: 'Natalie Dalton',
            type: 'DIG',
            total: 1
        },
        {
            gameID: 2,
            playerUsername: 'jcox',
            playerName: 'Jackie Cox',
            type: 'SET',
            total: 1
        },
        {
            gameID: 2,
            playerUsername: 'jcox',
            playerName: 'Jackie Cox',
            type: 'TIP',
            total: 4
        },
        {
            gameID: 2,
            playerUsername: 'jcox',
            playerName: 'Jackie Cox',
            type: 'BLOCK',
            total: 1
        },
        {
            gameID: 2,
            playerUsername: 'jcox',
            playerName: 'Jackie Cox',
            type: 'UFE',
            total: 4
        },
        {
            gameID: 2,
            playerUsername: 'jwalker',
            playerName: 'Joy Walker',
            type: 'KILL',
            total: 2
        },
        {
            gameID: 2,
            playerUsername: 'jwalker',
            playerName: 'Joy Walker',
            type: 'SET',
            total: 1
        },
        {
            gameID: 2,
            playerUsername: 'jwalker',
            playerName: 'Joy Walker',
            type: 'ACE',
            total: 1
        },
        {
            gameID: 2,
            playerUsername: 'dwalker',
            playerName: 'Darrell Walker',
            type: 'KILL',
            total: 2
        },
        {
            gameID: 2,
            playerUsername: 'dwalker',
            playerName: 'Darrell Walker',
            type: 'SET',
            total: 1
        },
        {
            gameID: 2,
            playerUsername: 'dwalker',
            playerName: 'Darrell Walker',
            type: 'TIP',
            total: 2
        },
        {
            gameID: 2,
            playerUsername: 'dwalker',
            playerName: 'Darrell Walker',
            type: 'ACE',
            total: 1
        },
        {
            gameID: 2,
            playerUsername: 'dwalker',
            playerName: 'Darrell Walker',
            type: 'BLOCK',
            total: 1
        },
        {
            gameID: 2,
            playerUsername: 'dwalker',
            playerName: 'Darrell Walker',
            type: 'UFE',
            total: 7
        },
        {
            gameID: 2,
            playerUsername: 'kgoodwin',
            playerName: 'Katelyn Goodwin',
            type: 'SET',
            total: 1
        },
    ]);
console.log("Created Stats table and test Stats");
});

module.exports = Stats;