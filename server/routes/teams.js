const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/player');
const Team = require('../models/team');
const config = require('../config/database');
const multer = require('multer');

// Set Storage Engine
const storage = multer.diskStorage({
    destination: './angular-src/src/assets',
    filename: function (req, file, cb) {
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
    storage: storage,
    fileFilter: imageFilter
}).single('photo');


// Add Post to user
router.post('', (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        } else {
            // console.log(req.file.path)
            let postData = JSON.parse(req.body.post);
            // console.log(postData);

            if (req.file) {
                console.log('file found');
                let newTeam = new Team({
                    title: postData.title,
                    subtitle: postData.subtitle,
                    body: postData.body,
                    subject: postData.subject,
                    author: postData.author,
                    photo: req.file.filename,
                    // comments: null
                });
                Team.addPost(newTeam, (err, team) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to post'
                        })
                    } else {
                        return Team.getTeamById(postData.name, (err, user) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: 'No user found'
                                })
                            } else if (user) {
                                user.posts.push(newPost._id);
                                user.save();
                                res.json({
                                    success: true,
                                    msg: 'Posted',
                                    _id: newPost._id
                                })
                            }
                        })


                    }
                })
            } else {
                // console.log('no file found');
                let newTeam = new Team({
                    title: postData.title,
                    subtitle: postData.subtitle,
                    body: postData.body,
                    subject: postData.subject,
                    author: postData.author,
                    // comments: null
                });
                Team.addTeamt(newTeam, (err, post) => {
                    if (err) {
                        console.log(err)
                        res.json({
                            success: false,
                            msg: 'Failed to post'
                        })
                    } else {
                        return User.findOne({
                            _id: postData.userId
                        }).then((user) => {
                            if (!user) {
                                console.log('no user found')
                                res.json({
                                    success: false,
                                    msg: 'No user found'
                                })
                            } else if (user) {
                                // console.log( 'post id: ' + post._id)
                                user.posts.push(post._id);
                                user.save();
                                res.json({
                                    success: true,
                                    msg: 'Posted',
                                    _id: newPost._id
                                })
                            }
                        })

                    }
                })
            }
        }
    });
});

// Add Comment to post

router.post('/:id/comments', (req, res, next) => {
    // console.log(req.body)
    Post.findById(req.params.id)
        .populate('comments')
        .then((post) => {
            if (post != null) {
                let newComment = new MyComment({
                    user: req.body.user,
                    comment: req.body.comment
                })
                MyComment.addComment(newComment, (err, comment) => {
                    if (err) {
                        console.log(err)
                        res.json({
                            success: false,
                            msg: 'Failed to add comment'
                        })
                    } else if (comment) {
                        post.comments.push(comment._id)
                        post.save().then(
                            res.json({
                                success: true,
                                msg: 'Added comment',
                                post
                            })
                        )

                    }
                })
            }
        })
})

// router.post('/:id/comments', (req, res, next) => {
//     var comment = {comment : req.comment, user : req.user};
//     query = {'_id': req.params.id};

//     Post.findOne(query, function(err, post) {
//         if (err) {
//                     return res.status(500).send(err);
//                 }
//                 if (!post) {
//                     return res.status(404).end();
//                 }
//                 console.log(post)
//             post.comments.push(comment);
//         post.save();
//                 return res.status(200).send(data);

//     });



// Post.findOneAndUpdate(query, function(err, data){
//     if (err) {
//         return res.status(500).send(err);
//     }
//     if (!data) {
//         return res.status(404).end();
//     }
//     console.log(res)
//     return res.status(200).send(data);
// })

// });

// Get all posts
router.get('', (req, res) => {
    Post.find().then((posts) => {
        res.send(posts);
    })
});

// Get posts by genre
router.get('/subject/:subject', (req, res) => {
    Post.find({
        subject: req.params.subject
    }).then((posts) => {
        res.send(posts);
    })
});

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .then((post) => {
            // console.log(post)
            res.send(post);
        })
    //     Post.
    //   findOne({ _id: req.params.id }).
    //   populate('comments').
    //   exec(function (err, comments) {
    //     if (err) return handleError(err);
    //     console.log('The author is %s', comments);

    //   });
});

router.delete('/:id', (req, res) => {
    var id = req.params.id;
    Post.findOneAndRemove({
        _id: req.params.id
    }, req.body, (err, data) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to post',
                err
            })
        } else {
            res.send({
                success: true,
                msg: 'Deleted ' + id,
                id
            })
        }
    })

    //     Post.
    //   findOne({ _id: req.params.id }).
    //   populate('comments').
    //   exec(function (err, comments) {
    //     if (err) return handleError(err);
    //     console.log('The author is %s', comments);

    //   });
});

router.put('/:id', (req, res) => {
    // console.log(req.body)
    let postData = JSON.parse(req.body.post);
    req.newData.title = postData.title
    req.newData.subtitle = postData.subtitle
    req.newData.body = postData.body
    req.newData.subject = postData.subject

    var query = {
        '_id': req.params.id
    };
    // req.newData.username = req.user.username;
    Post.findOneAndUpdate(query, req.newData, {
        upsert: true
    }, function (err, doc) {
        if (err) return res.send(500, {
            error: err
        });
        return res.send("succesfully saved");
    });
})

// Get all posts from a single user
router.get('/photographer/:id', (req, res) => {

    // User.findById(req.params.id).then((user)=> {
    //     res.send(user);
    // })
    User.findById(req.params.id)
        .populate('posts')
        .exec(function (err, user) {
            if (err) return handleError(err);
            // console.log('These are his posts: ', user.posts);
            res.send(user.posts);
            // prints "The author is Ian Fleming"
        });
});


// Register
// router.post('/post', (req, res, next) => {

//         if(!req){
//             console.log("err")
//         } else {
//             // console.log(req.file.path)


//                 let postData = req.body;
//                 User.findById(postData.userId).then(function(result){

//                     result.posts.push({
//                         title: postData.title,
//                         body: postData.body,
//                         tag: postData.tag,
//                         author: postData.author
//                     })
//                     result.save().then(()=>{
//                         res.send(result)
//                     })

//                 })
//             }      


// });

// Authenticate
// router.post('/authenticate', (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   User.getUserByUsername(username, (err, user) => {
//     if(err) throw err;
//     if(!user){
//         return res.json({succes: false, msg: 'Invalid username or password.'})
//     }
//     User.comparePassword(password, user.password, (err, isMatch) =>  {
//         if(err) throw err;
//         if(isMatch){
//             const token = jwt.sign(user.toJSON(), config.secret, {
//                 expiresIn: 604800 // 1 week
//             });

//             res.json({
//                 success: true,
//                 token: 'bearer '+token,
//                 user: {
//                     id: user._id,
//                     name: user.username,
//                     email: user.email
//                 }
//             });
//         } else {
//             return res.json({success: false, msg: 'Invalid username or password'});
//         }
//     })
//   })
// });

// // Profile
// router.get('/profile', passport.authenticate('jwt', {session:false}), async (req, res, next) => {
//   res.json({user: req.user})
// });

module.exports = router;