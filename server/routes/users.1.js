const express = require('express');
const router = express.Router();
const path = require('path');
const env = require('./../config/env');
const passport = require('passport');
const querystring = require('query-string');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');
var request = require('request');
const multer = require('multer');
// var scope = 'playlist-modify-private playlist-modify-public user-read-birthdate user-read-currently-playing user-read-playback-state user-read-email user-read-private user-library-read user-library-modify app-remote-control streaming'

// Set Storage Engine
const storage = multer.diskStorage({
  destination: './../coop/src/assets',
  filename : function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const imageFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// Init Upload
const upload = multer({
    storage: storage
    ,fileFilter: imageFilter
}).single('avatar');

// Register
router.post('/register', (req, res, next) => {
    upload(req, res, (err) => {
        if(err){
            console.log(err)
        } else {
            
            let userData = JSON.parse(req.body.user);
            console.log(userData)
            if(req.file){
                let newUser = new User({
                    username: userData.username,
                    password: userData.password,
                    avatar: req.file.filename
                });
                User.addUser(newUser, (err, user) => {
                    if(err){
                        res.json({success: false, msg:'Failed to register user'})
                    } else {
                        res.json({success: true, msg:'User registered'})
                    }
                })
            } else {
                let newUser = new User({
                    username: userData.username,
                    password: userData.password
                });
                User.addUser(newUser, (err, user) => {
                    if(err){
                        res.json({success: false, msg:'Failed to register user'})
                    } else {
                        res.json({success: true, msg:'User registered'})
                    }
                })
            }      
        }
    });
});


router.get('/spotify_login', function(req, res) {
    var scope = 'user-read-email user-read-private user-library-read user-modify-playback-state user-read-playback-state'
    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
        response_type: 'code',
        client_id: env.env.my_client_id,
        scope: scope,
        redirect_uri: env.env.my_redirect_uri
    })
    )
});

router.get('/spotify_redirect', function(req, res) {
    console.log('log code: '+JSON.stringify(req.query.code))
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            grant_type: 'authorization_code',
            code: req.query.code,
            redirect_uri: env.env.my_redirect_uri

        },
        headers :{
            'Authorization': 'Basic ' + (new Buffer(env.env.my_client_id + ':' + env.env.my_client_secret).toString('base64'))
        },
        json: true
    };

    request.post(authOptions, function(err, res, body){
        console.log('post works')
        if(err){
            console.log(err)
        }
        else {
            console.log('This is the access token ' +res.body.access_token)
            var authOptions = {
                url: 'https://api.spotify.com/v1/me',
                headers :{
                    'Authorization': 'Bearer ' + res.body.access_token
                },
                json: true
            };
            request.get(authOptions, function(err, res, body){
                console.log('get works')
                if(err){
                    console.log(err)
                }
                else {
                    console.log('This is the user info ' +res.body.display_name)
                }
            })
        }
    })
});


// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
        return res.json({succes: false, msg: 'Invalid username or password.'})
    }
    User.comparePassword(password, user.password, (err, isMatch) =>  {
        if(err) throw err;
        if(isMatch){
            const token = jwt.sign(user.toJSON(), config.secret, {
                expiresIn: 604800 // 1 week
            });

            res.json({
                success: true,
                token: 'bearer '+token,
                user: {
                    id: user._id,
                    name: user.username,
                    email: user.email
                }
            });
        } else {
            return res.json({success: false, msg: 'Invalid username or password'});
        }
    })
  })
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), async (req, res, next) => {
  res.json({user: req.user})
});

// Photographers
router.get('/photographers', async (req, res, next) => {
    User.find()
    .select('posts stories _id email username avatar')
    .then((users)=> {
        res.send(users);
    })
  });

// Photographers
router.get('/photographer/:id', async (req, res, next) => {
    console.log('jaaaaaaaaaa')
    User.find({_id: req.params.id})
    .select('posts stories _id email username avatar')
    .then((user)=> {
        res.send(user);
    })
  });

// Delete Profile
router.delete('/profile/:id', passport.authenticate('jwt', {session:false}), async (req, res, next) => {
    let query = {_id:req.params.id}
    User.remove(query, function(err){
        if(err){
            console.log(err);
        }
        res.send('success')
    })
    
  });

module.exports = router;
