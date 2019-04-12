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
        console.log("Successfully connected to Game table");
    })
    .catch(() =>{
        console.log("Something went wrong connecting to Game table");
    });

//Define user
var Game = sequelize.define('game', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    //Username column
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    //password column
    score: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
    },
    winningTeamID: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    winningTeamName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    winningTeamPlayers: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
    },
    losingTeamID: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    losingTeamName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    losingTeamPlayers: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
    },
    videoURL: {
        type: Sequelize.STRING,
        allowNull: true
    }
});
 
// force: true will drop the table if it already exists
Game.sync().then(() => {
// Table created
    Game.create(
        {
            date: '04/02/2019',
            score: ['25-22','20-25','15-13'],
            winningTeamID: 1,
            winningTeamName: 'Will Keith Wreckers',
            winningTeamPlayers: ['jowens','ndalton'],
            losingTeamID: 2,
            losingTeamName: 'Thats What She Set',
            losingTeamPlayers: [],
            videoURL: 'https://www.youtube.com/watch?v=yfqgUHyBrMY&feature=youtu.be'
        }
    );
console.log("Created Game table and test Game");
});

module.exports = Game;