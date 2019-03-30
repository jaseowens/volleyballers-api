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
        allowNull: false
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
        allowNull: true
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// force: true will drop the table if it already exists
Player.sync({force: true}).then(() => {
// Table created
    bcrypt.hash('dev', 10).then(function(hash){
        try{
            Player.create(
                {
                    username: 'dev',
                    password: hash,
                    displayName: 'Jase Owens - Dev',
                    profileImage: '/uploads/dev.jpg',
                    role: 'DEVELOPER'
                }
            )
            console.log("Developer Player created")
        } catch (err){
            console.log("something went wrong making developer player");
        }
    });
    bcrypt.hash('reg', 10).then(function(hash){
        try{
            let dev = Player.create(
                {
                    username: 'reg',
                    password: hash,
                    displayName: 'Jase Owens - Reg',
                    profileImage: '/uploads/reg.jpg',
                    role: 'REGULAR'
                }
            )
            console.log("Regular User created")
        } catch (err){
            console.log("something went wrong making regular player");
        }
    });
console.log("Created player table and test users");
});

module.exports = Player;