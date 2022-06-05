const express = require("express");
const bodyParser = require("body-parser");
const {
  getAllScreams,
  postOneScream,
  getScreams,
  commentOnScream,
  likeScream,
  unlikeScream,
  deleteScream,
} = require("./handlers/screams");
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails,
  markeNotificationRead,
} = require("./handlers/users");
const { getChats } = require("./handlers/chats");
const mashDBAuth = require("./util/mashDBAuth");
const Chat = require("./util/chatModel");
require('dotenv').config();
//mongodb...........................................................................................................
const mongoose = require("mongoose");
const connect = mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

//multer............................................................................................................
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./storage/");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  console.log(file.mimetype);
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    console.log("can't be uploaded");
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
//.............................................................................
const app = express();
app.use(bodyParser.json());
app.use("/storage", express.static("storage"));

const server = require("http").createServer(app);
const io = require("socket.io")(server);

//screams
app.get("/scream", getAllScreams);
app.post("/scream", mashDBAuth, postOneScream);
app.get("/scream/:screamId", getScreams);
app.post("/scream/:screamId/comment", mashDBAuth, commentOnScream);
app.get("/scream/:screamId/like", mashDBAuth, likeScream);
app.get("/scream/:screamId/unlike", mashDBAuth, unlikeScream);
app.delete("/scream/:screamId", mashDBAuth, deleteScream);

//Users routes
app.post("/signup", signup); //done
app.post("/login", login); //done
app.post("/user/image", mashDBAuth, upload.single("productImage"), uploadImage);
app.post("/user", mashDBAuth, addUserDetails);
app.get("/user", mashDBAuth, getAuthenticatedUser);
app.get("/user/:handle", getUserDetails);
app.post("/notifications", mashDBAuth, markeNotificationRead);
//socket.io
io.on("connection", (socket) => {
  // socket.on("Input Chat Message", msg => {
  //     Chat.insertMany({message: msg.chatMessage, sender: msg.userId, type: msg.type}).then(doc => {
  //         return io.emit("Output Chat Message", doc[0]);
  //     }).catch(err => {
  //         console.log(err);
  //         return res.json(err);
  //     })
  // })

  socket.on("Input Chat Message", (msg) => {
    connect.then((db) => {
      try {
        let chat = new Chat({
          message: msg.chatMessage,
          sender: msg.userId,
          type: msg.type,
        });

        chat.save((err, doc) => {
          if (err) return resizeBy.json({ success: false, err });

          Chat.find({ _id: doc._id })
            .populate("sender")
            .exec((err, doc) => {
              return io.emit("Output Chat Message", doc);
            });
        });
      } catch (error) {
        console.log(error);
      }
    });
  });
});
//chat
app.get("/getChats", getChats);


server.listen(5000, () => {
  console.log("the server is started at local host 5000");
});

// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const User = require('./util/userModel');
// const Scream = require('./util/screamsModel');

// mongoose.connect("mongodb://localhost:27017/mashDB", {useNewUrlParser:true , useUnifiedTopology: true});
//Schema of the Screams...............................
// const screamsSchema ={                          //schema
//     body: String ,
//     createdAt: String,
//     userHandle: String
// };

// const Scream = mongoose.model("Scream", screamsSchema);                 //model

// const scream1 = {
//     body: "helooo",
//     createdAt: "",
//     userHandle: "new"
// }

//Schema of the users..............................

// const userSchema = {
//     email : String,
//     password: String,
//     confirmPassword: String,
//     handle:String,
//     createdAt: String
// }

// const User = mongoose.model("User", userSchema);

// app.get("/",(req,res) => {
//     Scream.find({}, function(err, foundScreams){
//         if(foundScreams.length===0){
//           Scream.insertMany(scream1,function(err){
//             if(err){
//               console.log(err);
//             }else{
//                return res.json({message : `document craeted successfully`});         //insertion method
//             }
//           });

//         }else{
//             return res.json({message : "jehhff"});
//         }

//       });
// })

//mongoDB auth function.......................................................................

//Screams..........................................................................................

//User Authentication.................................................................................................
//helper function to check the valid email

//..............................................................................................................................................................
