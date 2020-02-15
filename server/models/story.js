const mongoose = require('mongoose');
const config = require('../config/database');

//Post Schema
const StorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    subject: [{
        type: String,
        enum: ['Politics', 'Sports', 'Nature', 'Humanity', 'Art', 'Music']
    }],
    author: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    postDate: {
        type: Date, default: Date.now
    }
});

const Story = module.exports = mongoose.model('Story', StorySchema);

module.exports.getPostById = function(id, callback) {
    Post.findById(id, callback);
}

module.exports.getPostByTitle = function(title, callback) {
    const query = {title: title}
    Post.findOne(query, callback);
}

module.exports.addPost = function(newPost, callback){
    newPost.save(callback);
}

module.exports.addLike = function(postId, like) {
    Post.update(
      {_id: postId}, // query
      {$addToSet: {likes: {like: like}}}, // update
      function(err) { // callback
         // handle error
         // other logic
      }
    );
  };

