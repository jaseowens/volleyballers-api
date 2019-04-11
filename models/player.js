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
        console.log("Successfully connected to Player table");
    })
    .catch(() =>{
        console.log("Something went wrong connecting to Player table");
    });

//Define user
var Player = sequelize.define('player', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    //Username column
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    //password column
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    displayName: {
        type: Sequelize.STRING
    },
    profileImage: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '/uploads/unknownUser.svg'
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// force: true will drop the table if it already exists
Player.sync({force:true}).then(() => {
// Table created
console.log("Created player table");
});

module.exports = Player;