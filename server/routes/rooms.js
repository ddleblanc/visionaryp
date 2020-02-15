const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/user');
const Message = require('../models/message')
const Room = require('../models/room');
const Track = require('../models/track')
const config = require('../config/database');
const multer = require('multer');

// Set Storage Engine
const storage = multer.diskStorage({
    destination: './angular-src/src/assets',
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
  }).single('photo');


// Add Room to user
router.post('', (req, res, next) => {
    {
        // console.log(req.body);
        let newRoom = new Room({
            name: req.body.name
        });
        Room.addRoom(newRoom, (err, room) => {
            if(err){
                console.log(err)
                res.json({success: false, msg:'Failed to room'})
            } else {
                res.json({success: true, msg:'Room created', _id: newRoom._id})

            }
        })
    } 
});

// Add Message to room

router.post('/:id/messages', (req, res, next) => {
    // console.log(req.body)
    Room.findById(req.params.id)
    .populate('comments')
    .then((room) => {
      if (room != null) {
        let newMessage = new Message({
            user: req.body.user,
            username: req.body.username,
            message: req.body.message
        })
        Message.addMessage(newMessage, (err, message) => {
            if(err){
                console.log(err)
                res.json({success: false, msg:'Failed to add message'})
            } else if (message){
                room.messages.push(message._id)
                room.save().then(
                    res.json({success: true, msg:'Added message', room})
                )
                
            }
        }
  )
      }
  })
})

// Add Track to room

router.post('/:id/tracks', (req, res, next) => {
    // console.log(req.body)
    Room.findById(req.params.id)
    .populate('tracks')
    .then((room) => {
      if (room != null) {
        let newTrack = new Track({
            title: req.body.title,
            artists: req.body.artists,
            track: req.body.track
        })
        Track.addTrack(newTrack, (err, track) => {
            if(err){
                console.log(err)
                res.json({success: false, msg:'Failed to add message'})
            } else if (track){
                room.tracks.push(track._id)
                room.save().then(
                    res.json({success: true, msg:'Added message', room})
                )
                
            }
        }
  )
      }
  })
})

// router.room('/:id/comments', (req, res, next) => {
//     var comment = {comment : req.comment, user : req.user};
//     query = {'_id': req.params.id};

//     Room.findOne(query, function(err, room) {
//         if (err) {
//                     return res.status(500).send(err);
//                 }
//                 if (!room) {
//                     return res.status(404).end();
//                 }
//                 console.log(room)
//             room.comments.push(comment);
//         room.save();
//                 return res.status(200).send(data);
        
//     });

    

    // Room.findOneAndUpdate(query, function(err, data){
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

// Get all rooms
router.get('', (req, res) => {
    Room.find().then((rooms)=> {
        res.send(rooms);
    })
  });

// Get rooms by genre
  router.get('/subject/:subject', (req, res) => {
    Room.find({subject: req.params.subject}).then((rooms)=> {
        res.send(rooms);
    })
  });

  router.get('/:id', (req, res) => {
    Room.findById(req.params.id)
    .populate('messages')
    .populate('tracks')
    .then((room)=> {
        // console.log(room)
        res.send(room);
    })
//     Room.
//   findOne({ _id: req.params.id }).
//   populate('comments').
//   exec(function (err, comments) {
//     if (err) return handleError(err);
//     console.log('The author is %s', comments);
  
//   });
  });

  router.delete('/:id', (req, res) => {
      var id = req.params.id;
    Room.findOneAndRemove({_id: req.params.id}, req.body, (err,data)=> {
        if(err){
            res.json({success: false, msg:'Failed to room', err})
        }
        else {
            res.send({success: true, msg:'Deleted ' + id , id})
        }
    })

//     Room.
//   findOne({ _id: req.params.id }).
//   populate('comments').
//   exec(function (err, comments) {
//     if (err) return handleError(err);
//     console.log('The author is %s', comments);
  
//   });
  });

  router.put('/:id', (req, res) => {
    // console.log(req.body)
    let roomData = JSON.parse(req.body.room);
    req.newData.title = roomData.title
    req.newData.subtitle = roomData.subtitle
    req.newData.body = roomData.body
    req.newData.subject = roomData.subject

    var query = {'_id':req.params.id};
    // req.newData.username = req.user.username;
    Room.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
        if (err) return res.send(500, { error: err });
        return res.send("succesfully saved");
    });
  })

  // Get all rooms from a single user
  router.get('/photographer/:id', (req, res) => {

    // User.findById(req.params.id).then((user)=> {
    //     res.send(user);
    // })
    User.findById(req.params.id)
        .populate('rooms')
        .exec(function (err, user) {
    if (err) return handleError(err);
    // console.log('These are his rooms: ', user.rooms);
    res.send(user.rooms);
    // prints "The author is Ian Fleming"
  });
  });
  

// Register
// router.room('/room', (req, res, next) => {

//         if(!req){
//             console.log("err")
//         } else {
//             // console.log(req.file.path)
            

//                 let roomData = req.body;
//                 User.findById(roomData.userId).then(function(result){
                    
//                     result.rooms.push({
//                         title: roomData.title,
//                         body: roomData.body,
//                         tag: roomData.tag,
//                         author: roomData.author
//                     })
//                     result.save().then(()=>{
//                         res.send(result)
//                     })

//                 })
//             }      
        

// });

// Authenticate
// router.room('/authenticate', (req, res, next) => {
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
