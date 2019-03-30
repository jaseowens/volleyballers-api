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
        console.log("Successfully connected to League table");
    })
    .catch(() =>{
        console.log("Something went wrong connecting to League table");
    });

//Define user
var League = sequelize.define('league', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    teams: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
    },
    leagueName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// force: true will drop the table if it already exists
League.sync({force: true}).then(() => {
    // Table created
    League.create(
        {
            teams: [1,2,3],
            leagueName: 'Test League'
        }
    );
console.log("Created League table and test League");
});

module.exports = League;