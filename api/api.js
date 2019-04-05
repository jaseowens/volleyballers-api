//This is the main API route
//Requirements:
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Player = require('../models/player');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config')
const apiRoutes = express.Router();
const Common = require('../Common');

//Should let use localhost to connect to server, need to look into implications of
//using this live.
apiRoutes.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

//Import routes
const playerRoutes = require('./player')
apiRoutes.use('/player', playerRoutes);
const gameRoutes = require('./game')
apiRoutes.use('/game', gameRoutes);
const teamRoutes = require('./team')
apiRoutes.use('/team', teamRoutes);
const statRoutes = require('./stats')
apiRoutes.use('/stats', statRoutes);

//http://localhost:8080/api/authenticate
apiRoutes.post('/authenticate', function(req,res){
    console.log(`finding player: ${req.body.username}`);
    //Post a username and pass to /api/authenticate (this is essentially logging in)
    //Then take that and use our model with sequelize to look for the passed in user
    Player.findOne({ where: {username: req.body.username} })
    .then(player => {
        //Take the result from that query
        if(!player){
            //If the player was not found:
            res.json({success: false, message: 'Authentication failed, no user'});
        } else if (player){
            //If player was found:
            if(bcrypt.compareSync(req.body.password, player.password)){
                //If password and user correct, form JWT 
                const payload = {
                    //Payload needs to contain min amount of info for security purposes
                    username: player.username,
                    id: player.userid
                };
                //use jwt to sign the token with our payload and secret defined in the config file.
                var token = jwt.sign(payload, config.secret, {
                    //Set expiration time, i think this is seconds? need to look into
                    expiresIn: 1440 
                });
                res.json({
                    //Send JSON back to the requestor with success msg, and token
                    success: true,
                    message: 'Token provided',
                    token: token,
                    profileImage: player.profileImage,
                    username: player.username,
                    user_id: player.id
                });
            } else{
                //If password incorrect:
                res.json({success: false, message: 'Authentication failed, wrong password'});
            }
        }
    })
});

//http://localhost:8080/api/
apiRoutes.get('/', Common.verifyToken, function(req,res) {
    //If verified give message
    res.json({message: 'success'});
});

//Export this route so the main server can make use of.
module.exports = apiRoutes;

