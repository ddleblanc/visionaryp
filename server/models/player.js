const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const Team = require('./team')

var PlacementSchema = mongoose.Schema({
    game: {
        type: mongoose.Types.ObjectId,
        ref: 'Game'
    },
    place: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }
});
mongoose.model('Placement', PlacementSchema);

//User Schema
const PlayerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    joiningDate: {
        type: Date,
        default: Date.now()
    },
    placements: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Placement'
    }],
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }],
});

const Player = module.exports = mongoose.model('Player', PlayerSchema);

module.exports.getPlayerById = function (id, callback) {
    Player.findById(id, callback);
}

module.exports.getPlayerByName = function (name, callback) {
    const query = {
        name: name
    }
    Player.findOne(query, callback);
}

module.exports.addPlayer = function (newPlayer, callback) {
    newPlayer.password = hash;
    newPlayer.save(callback);
}