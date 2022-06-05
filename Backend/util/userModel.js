
const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');
const userSchema = {
    email : String,
    password: String,
    confirmPassword: String,
    handle:String,
    imageUrl: String,
    beforeImageUrl: String,
    createdAt: String,
    bio: String,
    website: String,
    location: String
}
module.exports= User = mongoose.model("User", userSchema);