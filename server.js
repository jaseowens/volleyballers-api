//Express is used for routing
const express = require('express');
//Instantiate express as app
const app = express();
//Bodyparser middleware to understand parameters
const bodyParser = require('body-parser');
//Morgan is used for dev logging 
const morgan = require('morgan');
//bcrypt for encrypting pass
const bcrypt = require('bcrypt');

//jwt is the authentication solution
const jwt = require('jsonwebtoken');
//Confg file contains db path and jwt secret
const config = require('./config/config');
//Models defined here
const Player = require('./models/player');
const Game = require('./models/game');
const Team = require('./models/team');
const League = require('./models/league');
const Event = require('./models/event');
const Stats = require('./models/stats');

//Secret for JWT
app.set('superSecret', config);



//Middleware for body parsing
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

//Should let use localhost to connect to server, need to look into implications of
//using this live.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Import routes
const apiRoutes = require('./api/api')
//Make use of routes
app.use('/api', apiRoutes);

//Set port
var port = process.env.PORT || 8080;

//Signup route, needs to be fully implemented, is hardcoded as of now.
app.post('/signup', function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    Player.findOne({ where: {username: username} })
    .then(player => {
        //Take the result from that query
        if(!player){
            console.log("No found prev existing player");
            //There is not a player with that name already
            let hash = bcrypt.hashSync(password, 10);

            bcrypt.hash(password, 10).then(function(hash){
                try{
                    let player = Player.create(
                        {
                            username: username,
                            password: hash,
                            role: 'REGULAR'
                        }
                    )
                    player.then(player => {
                        //If password and player correct, form JWT 
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
                            username: player.username,
                            user_id: player.userid
                        });
                    });
                    player.catch(err => {
                        res.json({
                            //Send JSON back to the requestor with success msg
                            success: false,
                            message: 'Something went wrong creating the player'
                        });
                    });
                    
                } catch (err){
                    return res.status(400).send(err);
                }
                
            });
        } else{
            //There is a player with that name already
            res.json({
                //Send JSON back to the requestor with success msg
                success: false,
                message: 'player exists'
            });
        }
    });
});

//Set the app to listen on port defined above.
app.listen(port);
console.log("Listening on " + port);