const mongoose = require('mongoose');
const Schema = mongoose.Schema

mongoose.connect("mongodb+srv://admin-ankur:ak47@cluster0-rxcv2.mongodb.net/mashDB", {useNewUrlParser:true , useUnifiedTopology: true});
const chatSchema = mongoose.Schema({                          //schema
    message: {
        type:String,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String
    }
   

}, {timestamps: true});
mongoose.set('useFindAndModify', false);

// module.exports= Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat = mongoose.model("Chat",chatSchema);

