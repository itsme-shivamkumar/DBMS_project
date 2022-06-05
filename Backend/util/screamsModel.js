
const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');
const screamsSchema ={                          //schema
    body: String ,
    createdAt: String,
    userHandle: String,
    likeCount: Number,
    commentCount: Number,
    screamId: String,
    userImage: String,
    imageUrl: String
};

module.exports= Scream = mongoose.model("Scream", screamsSchema);