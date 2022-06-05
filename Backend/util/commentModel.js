const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');

const commentSchema ={                          //schema
    userHandle: String,
    screamId: String,
    body:String,
    createdAt: String,
    userImage: String
};

module.exports= Comment = mongoose.model("Comment", commentSchema);