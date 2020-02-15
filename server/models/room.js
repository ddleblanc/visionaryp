const mongoose = require('mongoose');
const config = require('../config/database');


//Room Schema
const GameSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Game', GameSchema);

module.exports.getRoomById = function (id, callback) {
    Game.findById(id, callback);
}

module.exports.getGames = function (callback) {
    Game.find(callback);
}

module.exports.getGameByTitle = function (title, callback) {
    const query = {
        title: title
    }
    Game.findOne(query, callback);
}

module.exports.addGame = function (newGame, callback) {
    console.log('im saving this: ' + newGame)
    newGame.save(callback);
}