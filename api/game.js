//This is the main API route
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var jwt = require('jsonwebtoken');
var config = require('../config/config')
const gameRoutes = express.Router();
const Game = require('../models/game');
const Common = require('../Common');

//http://localhost:8080/api/game/
gameRoutes.get('/', function(req,res) {
    //Return all games as json object, after verifying user
    Game.findAll({})
    .then(games => {
        res.json(games);
    })
});

//http://localhost:8080/api/game/add
gameRoutes.post('/add', function(req,res) {

    let date = req.body.date;
    let score = req.body.score;
    score = score.split(",");
    let winningTeamID = req.body.winningTeamID;
    let winningTeamName = req.body.winningTeamName;
    let winningTeamPlayers = req.body.winningTeamPlayers;
    winningTeamPlayers = winningTeamPlayers.split(',');
    let losingTeamID = req.body.losingTeamID;
    let losingTeamName = req.body.losingTeamName;
    let losingTeamPlayers = req.body.losingTeamPlayers;
    losingTeamPlayers = losingTeamPlayers.split(',');
    let videoURL = req.body.videoURL;

    let game = Game.create({
        date: date,
        score: score,
        winningTeamID: winningTeamID,
        winningTeamName: winningTeamName,
        winningTeamPlayers: winningTeamPlayers,
        losingTeamID: losingTeamID,
        losingTeamName: losingTeamName,
        losingTeamPlayers: losingTeamPlayers,
        videoURL: videoURL
    })
    game.then((game) => {
        //console.log('created new game');
        res.json(
            {
                message: 'Succesfully created new game',
                gameID: game.gameID
            }
    );
    })
    game.catch(err => {
        //console.log(err);
        res.json({message: err});
    });
});

//http://localhost:8080/api/game/get?{game_id}
gameRoutes.get('/get', function(req,res) {
    let gameID = req.query.gameID;

    Game.findOne({
        where: {
            id: gameID
        }
    })
    .then((game) => {
        //console.log('found game');
        res.json(game);
    })
    .catch(err => {
        //console.log(err);
        res.json({message: err});
    });
});

//http://localhost:8080/api/game/getAllGames?{username}
gameRoutes.get('/getAllGames', function(req,res) {
    let username = [req.query.username];
    //username = JSON.parse("[" + username + "]");
    console.log(`Finding games for user: ${username}`);
    Game.findAll({
        where: {
            [Op.or]: 
                [
                    {
                        winningTeamPlayers: {
                            [Op.contains]: username
                        }
                    }, 
                    {
                        losingTeamPlayers: {
                            [Op.contains]: username
                        }
                    }
                ]
        }
    })
    .then((games) => {
        //console.log('found game');
        res.json(games);
    })
    .catch(err => {
        console.log(err);
        res.json({message: err});
    });
});

//http://localhost:8080/api/game/delete
gameRoutes.post('/delete', function(req,res) {
    let gameID = req.body.gameID;

    Game.destroy({
        where: {
            id: gameID
        }
    })
    .then(() => {
        //console.log('device destroyed');
        res.send({message: 'game deleted'});
    })
    .catch ((err) => {
        //console.log(err);
        res.json(err);
    })
});

//http://localhost:8080/api/game/update
gameRoutes.post('/update', function(req,res) {

    let id = req.body.id;
    let date = req.body.date;
    let score = req.body.score;
    score = score.split(",");
    let winningTeamID = req.body.winningTeamID;
    let winningTeamName = req.body.winningTeamName;
    let winningTeamPlayers = req.body.winningTeamPlayers;
    winningTeamPlayers = winningTeamPlayers.split(',');
    let losingTeamID = req.body.losingTeamID;
    let losingTeamName = req.body.losingTeamName;
    let losingTeamPlayers = req.body.losingTeamPlayers;
    losingTeamPlayers = losingTeamPlayers.split(',');
    let videoURL = req.body.videoURL;

    Game.findOne({ where: {id: id} })
    .then(game => {
        //Take the result from that query
        if(!game){
            res.json({
                success: false,
                message: "No game found to update"
            });
        } else{
            game.update({
                date: date,
                score: score,
                winningTeamID: winningTeamID,
                winningTeamName: winningTeamName,
                winningTeamPlayers: winningTeamPlayers,
                losingTeamID: losingTeamID,
                losingTeamName: losingTeamName,
                losingTeamPlayers: losingTeamPlayers,
                videoURL: videoURL
            });
            res.send({message: 'succesfully updated'});
        }
    })
    .catch(err => {
        res.json(err);
    });
});

//Export this route so the main server can make use of.
module.exports = gameRoutes;

