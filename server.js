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
const cors = require('cors')
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

app.use(cors());

//Should let use localhost to connect to server, need to look into implications of
//using this live.
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//     next();
// });

//Middleware for body parsing
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

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
    var displayName = req.body.displayName;

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
                            displayName: displayName,
                            role: 'REGULAR'
                        }
                    )
                    player.then(player => {
                        //If password and player correct, form JWT 
                        const payload = {
                            //Payload needs to contain min amount of info for security purposes
                            username: player.username,
                            id: player.id
                        };
                        //use jwt to sign the token with our payload and secret defined in the config file.
                        var token = jwt.sign(payload, config.secret, {
                            //Set expiration time, i think this is seconds? need to look into
                            expiresIn: 1440 
                        });
                        res.json({
                            //Send JSON back to the requestor with success msg, and token
                            success: true,
                            message: 'Token provided to you',
                            token: token,
                            username: player.username,
                            user_id: player.id
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

app.get('/', function(req,res){
    res.send({
        success: true,
        message: 'Volleyballers API'
    });
});
//Set the app to listen on port defined above.
app.listen(port);
console.log("Listening on " + port);