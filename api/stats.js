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
        order: [['playerUsername','ASC']],
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

//http://localhost:8080/api/stats/add
statRoutes.post('/add', function(req,res) {

    let gameID = req.body.gameID;
    gameId = parseInt(gameID);

    let playerUsername = req.body.playerUsername;

    let playerName = req.body.playerName;

    let type = req.body.type;
    type = type.toUppercase();

    let total = req.body.total;
    total = parseInt(total);

    Stats.destroy({
        where:{
            gameID: gameID,
            playerUsername: playerUsername,
            type: type
        }
    })

    let stat = Stats.create({
        gameID: gameID,
        playerUsername: playerUsername,
        playerName: playerName,
        type: type,
        total: total
    })
    stat.then((stat) => {
        //console.log('created new game');
        res.json(
            {
                message: 'Succesfully added stat'
            }
    );
    })
    game.catch(err => {
        //console.log(err);
        res.json({message: err});
    });
});

//Export this route so the main server can make use of.
module.exports = statRoutes;
