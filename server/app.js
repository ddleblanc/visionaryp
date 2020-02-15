const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const cors = require('cors');
// const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const http = require('http');


process.setMaxListeners(0);

// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});


const app = express();
// const players = require('./routes/players');
const teams = require('./routes/teams');
const spotify = require('./routes/spotify');
const livescore = require('./routes/livescore');
const es11 = require('./routes/es11');
const soccer = require('./routes/soccer')

// Port Number
const port = 3000;

// CORS Middleware // 
app.use(cors());
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
// app.use(passport.initialize());
// app.use(passport.session());

// require('./config/passport')(passport);

// Routes
// app.use('/players', players);
app.use('/spotify', spotify);
app.use('/es11', es11);
app.use('/teams', teams);
app.use('/livescore', livescore);
app.use('/soccer', soccer);
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.set('port', port);


var server = http.createServer(app);
var io = require('socket.io').listen(4201);
var currentRoom;





// Start Server
app.listen(port, () => {
  console.log('CORS-enabled web server listening on port ' + port);
});
