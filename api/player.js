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

//http://localhost:8080/api/player/getByUsername?{username}
playerRoutes.get('/getByUsername', function(req,res) {
    console.log('recieved get byUsername request');
    let username = req.query.username;
    Player.findOne({
        where: {
            username: username
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
                message: `No player found with username: ${username}`
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
//http://localhost:8080/api/player/getById?{playerID}
playerRoutes.get('/getById', function(req,res) {
    let playerID = parseInt(req.query.playerID);
    console.log('recieved get byID request');
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
                message: `No player found with id: ${playerID}`
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

//http://localhost:8080/api/player/getMany?{usernames}
playerRoutes.get('/getMany', function(req,res) {
    let usernames = JSON.parse("[" + req.query.usernames + "]");
    //let playerIDs = JSON.parse(JSON.stringify(req.query.playerIDs));
    console.log(usernames);
    Player.findAll({
        attributes: ['id', 'username', 'displayName', 'profileImage', 'role'],
        where: {
            id: usernames
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
                message: `No players found with usernames: ${usernames}`
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

//http://localhost:8080/api/player/getManyNames?{usernames}
playerRoutes.get('/getManyNames', function(req,res) {
    let usernames = req.query.usernames;
    usernames = usernames.split(',');
    for(var i = 0; i < usernames.length; i++){
        usernames[i].trim();
        console.log(`Looking for users name: ${username[i]}`);
    }
    console.log(`recievend get many names request`);
    console.log(`usernames passed in: ${req.query.usernames}`);

    Player.findAll({
        attributes: ['displayName'],
        where: {
            id: usernames
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
                message: `No players found with usernames: ${usernames}`
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

