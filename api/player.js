//This is the main API route
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
var jwt = require('jsonwebtoken');
var config = require('../config/config')
const playerRoutes = express.Router();
const Player = require('../models/player');
const Stats = require('../models/stats');
const Common = require('../Common');

//http://localhost:8080/api/player/get?{playerID}
playerRoutes.get('/get', function(req,res) {
    let playerID = parseInt(req.query.playerID);
    console.log('recieved request');
    Player.findOne({
        where: {
            id: playerID
        }
    })
    .then((player) => {
        if(player){
            res.send({
                success: true,
                id: player.id,
                username: player.username,
                displayName: player.displayName,
                profileImage: player.profileImage,
                role: player.role,
                createdAt: player.createdAt
            });
        } else{
            res.send({
                success: false,
                message: 'No player found with that id'
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

//http://localhost:8080/api/player/getMany?{playerIDs}
playerRoutes.get('/getMany', function(req,res) {
    let playerIDs = JSON.parse("[" + req.query.playerIDs + "]");
    //let playerIDs = JSON.parse(JSON.stringify(req.query.playerIDs));
    console.log('recieved request');
    Player.findAll({
        attributes: ['id', 'username', 'displayName', 'profileImage', 'role'],
        where: {
            id: playerIDs
        }
    })
    .then((players) => {
        if(players){
            res.json(
                players
            );
        } else{
            res.send({
                success: false,
                message: 'No players found with those ids'
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

//http://localhost:8080/api/player/getManyNames?{playerIDs}
playerRoutes.get('/getManyNames', function(req,res) {
    let playerIDs = JSON.parse("[" + req.query.playerIDs + "]");

    Player.findAll({
        attributes: ['displayName'],
        where: {
            id: playerIDs
        },
        order: [['id','ASC']]
    })
    .then((players) => {
        if(players){
            res.json(
                players
            );
        } else{
            res.send({
                success: false,
                message: 'No players found'
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
module.exports = playerRoutes;

