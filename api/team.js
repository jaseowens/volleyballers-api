//This is the main API route
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
var jwt = require('jsonwebtoken');
var config = require('../config/config')
const teamRoutes = express.Router();
const Team = require('../models/team');
const Common = require('../Common');



//http://localhost:8080/api/team/get?{teamID}
teamRoutes.get('/get', function(req,res) {
    let teamID = req.query.teamID;

    Team.findOne({
        where: {
            id: teamID
        }
    })
    .then((team) => {
        //console.log('found game');
        res.json(team);
    })
    .catch(err => {
        //console.log(err);
        res.json({message: err});
    });
});

//Export this route so the main server can make use of.
module.exports = teamRoutes;

