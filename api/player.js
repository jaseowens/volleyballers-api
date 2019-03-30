//This is the main API route
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
var jwt = require('jsonwebtoken');
var config = require('../config/config')
const playerRoutes = express.Router();
const Player = require('../models/player');
const Common = require('../Common');

//http://localhost:8080/api/game/get?{playerID}
playerRoutes.get('/get', function(req,res) {
    let playerID = req.query.playerID;

    Player.findOne({
        where: {
            id: playerID
        }
    })
    .then((player) => {
        //console.log('found game');
        res.send({
            id: player.id,
            username: player.username,
            displayName: player.displayName,
            profileImage: player.profileImage,
            role: player.role,
            createdAt: player.createdAt
        });
    })
    .catch(err => {
        //console.log(err);
        res.json({message: err});
    });
});

//Export this route so the main server can make use of.
module.exports = playerRoutes;

