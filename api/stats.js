//This is the main API route
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
var jwt = require('jsonwebtoken');
var config = require('../config/config')
const statRoutes = express.Router();
const Stats = require('../models/stats');
const Common = require('../Common');


//http://localhost:8080/api/stats/get?{type}&{gameID}
statRoutes.get('/get', function(req,res) {
    let type = req.query.type;
    let gameID = req.query.gameID;
    console.log('got it');
    Stats.findAll({
        where: {
            type: type,
            gameID: gameID
        },
        order: [['playerID','ASC']],
    })
    .then((stats) => {
        if(stats){
            res.json(
                stats
            );
        } else{
            res.send({
                success: false,
                message: 'No stats of that type found for that game and those players'
            });
        }
    })
    .catch(err => {
        //console.log(err);
        res.json({
            success: false,
            message: err});
    });
});


//Export this route so the main server can make use of.
module.exports = statRoutes;
