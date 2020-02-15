const mongoose = require('mongoose');
const config = require('../config/database');
const Player = require('./player');

//Post Schema
const TeamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }],
    postDate: {
        type: Date,
        default: Date.now
    },
    game: [{
        type: String,
        required: true
    }],
});

module.exports = mongoose.model('Team', TeamSchema);

module.exports.getTeamById = function (id, callback) {
    Team.findById(id, callback);
}

module.exports.getTeams = function (callback) {
    Team.find(callback);
}

module.exports.getTeamByName = function (name, callback) {
    const query = {
        name: name
    }
    Lineup.findOne(query, callback);
}

module.exports.addTeam = function (newTeam, callback) {
    // console.log('im saving this: ' + newPost)
    newTeam.save(callback);
}

module.exports.addPlayer = function (newPlayer, callback) {
    // console.log('im saving this: ' + newPost)
    newPlayer.save(callback);
}