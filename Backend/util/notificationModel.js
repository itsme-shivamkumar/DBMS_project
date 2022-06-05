const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');
const notificationsSchema ={                          //schema
    createdAt: String,
    recipient: String,
    sender: String,
    type: String,
    read: Boolean,
    screamId: String,
    elementId: String

};

module.exports= Notification = mongoose.model("Notification", notificationsSchema);