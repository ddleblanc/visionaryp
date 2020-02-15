const express = require('express');
const router = express.Router();
const path = require('path');
const env = require('../config/env');
const passport = require('passport');
const querystring = require('query-string');
const jwt = require('jsonwebtoken');
const Player = require('../models/player');
const config = require('../config/database');
var request = require('request');
const multer = require('multer');
// var scope = 'playlist-modify-private playlist-modify-public user-read-birthdate user-read-currently-playing user-read-playback-state user-read-email user-read-private user-library-read user-library-modify app-remote-control streaming'


var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

router.get('/spotify_login', function (req, res) {

  // requests authorization code
  // after user login

  // then redirects to /spotify_redirect

  var state = generateRandomString(16);
  res.cookie(stateKey, state);
  console.log('sent state: ' + state)

  var scope = 'user-read-email user-read-private user-library-read user-modify-playback-state user-read-playback-state'
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: env.env.my_client_id,
      scope: scope,
      redirect_uri: env.env.my_redirect_uri,
      state: state
    })
  )
});



router.get('/spotify_redirect', function (req, res) {

  // receives authorization code
  // and state

  // then compares that state to the stored state (cookies)
  // and requests refresh and access tokens
  // after checking state 

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;
  console.log('returned state: ' + req.cookies)

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: env.env.my_redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(env.env.my_client_id + ':' + env.env.my_client_secret).toString('base64'))
      },
      json: true
    };



    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: {
            'Authorization': 'Bearer ' + access_token
          },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('http://localhost:4200/nowplaying-spotify/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});


module.exports = router;