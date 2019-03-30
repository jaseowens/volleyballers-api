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
        console.log("Successfully connected to Team table");
    })
    .catch(() =>{
        console.log("Something went wrong connecting to Team table");
    });

//Define user
var Team = sequelize.define('team', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    players: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
    },
    teamName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// force: true will drop the table if it already exists
Team.sync({force: true}).then(() => {
    // Table created
    Team.create(
        {
            players: [1,2,3],
            teamName: 'Will Keith Wreckers'
        }
    );
    Team.create(
        {
            players: [1,2,3],
            teamName: 'Volley Llamas'
        }
    );
console.log("Created Team table and test Team");
});

module.exports = Team;