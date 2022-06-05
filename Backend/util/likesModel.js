const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');
const likeSchema ={                          //schema
    userHandle: String,
    screamId: String
};

module.exports= Like = mongoose.model("Like", likeSchema);