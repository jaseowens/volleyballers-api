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
gameRoutes.get('/', Common.verifyToken, function(req,res) {
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
    let winningTeamID = req.body.winningTeamID;
    let losingTeamID = req.body.losingTeamID;
    let videoURL = req.body.videoURL;

    let game = Game.create({
        date: date,
        score: score,
        winningTeamID: winningTeamID,
        losingTeamID: losingTeamID,
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

//http://localhost:8080/api/game/getAllGames?{playerID}
gameRoutes.get('/getAllGames', function(req,res) {
    let playerID = req.query.playerID;
    playerID = parseInt(playerID);
    playerID = JSON.parse("[" + playerID + "]");
    Game.findAll({
        where: {
            [Op.or]: 
                [
                    {
                        winningTeamPlayers: {
                            [Op.contains]: playerID
                        }
                    }, 
                    {
                        losingTeamPlayers: {
                            [Op.contains]: playerID
                        }
                    }
                ]
            // [Op.or]: {
            //     winningTeamID: {
            //         [Op.contains]: playerID
            //     },
            //     losingTeamID: {
            //         [Op.contains]: playerID
            //     }
            //   }
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

    let gameId = req.body.gameId;
    let date = req.body.date;
    let score = req.body.score;
    let winningTeamID = req.body.winningTeamID;
    let losingTeamID = req.body.losingTeamID;
    let videoURL = req.body.videoURL;
    
    console.log('Trying to update');

    Game.findOne({ where: {id: gameId} })
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
                losingTeamID: losingTeamID,
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

