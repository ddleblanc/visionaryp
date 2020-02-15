const mongoose = require('mongoose');
const config = require('../config/database');
const User = require('./player');

//Track Schema
const TrackSchema = mongoose.Schema({
    track: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('Track', TrackSchema);

module.exports.getTrackById = function (id, callback) {
    Track.findById(id, callback);
}

module.exports.getTracks = function (callback) {
    Track.find(callback);
}

module.exports.getTrackByTitle = function (title, callback) {
    const query = {
        title: title
    }
    Track.findOne(query, callback);
}

module.exports.addTrack = function (newTrack, callback) {
    // console.log('im saving this: ' + newTrack)
    newTrack.save(callback);
}

module.exports.addComment = function (newComment, callback) {
    // console.log('im saving this: ' + newTrack)
    newComment.save(callback);
}

module.exports.addLike = function (trackId, like) {
    Track.update({
            _id: trackId
        }, // query
        {
            $addToSet: {
                likes: {
                    like: like
                }
            }
        }, // update
        function (err) { // callback
            // handle error
            // other logic
        }
    );
};