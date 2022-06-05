
const User = require('../util/userModel');
const Scream = require('../util/screamsModel');
const {validateSignupData , validateLoginData , reduceUserDetail} = require('../util/validator');
const jwt = require('jsonwebtoken');
const Like = require('../util/likesModel');
const Notification = require('../util/notificationModel');

//Signup of user ........................................................................................................................


exports.signup = (req,res) => {
   
  
    const user={
        email : req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle:req.body.handle,
        createdAt:new Date().toISOString(),
        imageUrl:"http://localhost:5000/storage/noImage.png?alt=media"
    };

    // console.log(req.body);

    const {valid, errors} = validateSignupData(user);

    if(!valid) return res.status(400).json(errors);
    
//validate data

    User.find({handle:user.handle},(err,foundUser) => {
        User.find({email:user.email},(err,doc) => {
            if(!err){
                if(foundUser.length !== 0){
                    return res.json({email:"email already exist"});
                }
            }
        })
        if(foundUser.length!==0){
            if(!err){
                console.log(foundUser);
                return res.json({handle:"this handle is already taken"});
            }else{
                console.log("0 "+err);
                return res.json({err});
            }

            
        }else{
            User.insertMany(user, (err) => {
                if(err){
                    console.log("1 " + err);
                    return res.json({err});
                }else{
                    var secret =Buffer.from("myClientSecret","base64");
                   
                    jwt.sign({user} ,secret,{ expiresIn: '1h' },(err,idToken) => {
                       if(!err){
                        //    token=idToken;
                        //    const userCredentials = {
                        //        handle: newUser.handle,
                        //        email: newUser.email,
                        //        createdAt: new Date().toISOString()
                        //    }
                            // console.log(doc);
                           return res.status(200).json({idToken});
                       }else{
                           console.log("2 " + err);
                           return res.json({general : "something Went Wrong"});
                       } 
                    })
                }

            })
        }
    })
};

//Login for user ................................................................................................................

exports.login = (req,res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    const {valid, errors} = validateLoginData(user);

    if(!valid) return res.status(400).json(errors);

    
    User.find({email:user.email, password:user.password},(err,foundUser) => {
        if(!err){
            if(foundUser.length !== 0){
                var secret =Buffer.from("myClientSecret","base64");
                jwt.sign({user},secret,{ expiresIn: '1h' }, (err,idToken) => {
                    if(!err){
                        return res.json({idToken});
                    }else{
                        console.log("b "+err);
                        return res.json({err});
                    }
                    
                })
            }else{
                errors.general="wrong credentials";
                return res.status(400).json(errors)
            }

        }else{
            console.log("a "+err);
        }
        
    })

};


//Add User detail . ............................................................................................................
exports.addUserDetails = (req,res) => {
    let userDetails = reduceUserDetail(req.body);

    console.log(userDetails);

    User.findOneAndUpdate({handle:req.user.user.handle},userDetails,(err,doc) => {
        if(!err){
            return res.json({message: 'Details added successfully'});
        }else{
            console.log(err);
            return res.status(500).json({error:err.code});
        }
    })
};
//Get any user's datails
exports.getUserDetails = (req, res) => {
    let userData = {};
    User.findOne({handle: req.params.handle}).then((doc) => {
        
        if(doc){
            console.log(doc);
            userData.user = doc;
            Scream.find({userHandle: req.params.handle}).then(data => {
                userData.screams = [];
                data.forEach(doc => {
                    userData.screams.push({
                      body: doc.body,
                      createdAt: doc.createdAt,
                      userHandle: doc.userHandle,
                      userImage: doc.userImage,
                      likeCount: doc.likeCount,
                      commentCount: doc.commentCount,
                      screamId: doc.screamId  
                    })
                });
        
                return res.json(userData);
            }).catch(err => {
                console.log(err);
                return res.status(500).json(err);
            })
        }else{
            return res.status(400).json({error:"user not found"});
        }
    }).catch(err => {
        console.log(err);
    });

    

}
//Get own user details.........................................................................................................
exports.getAuthenticatedUser = (req,res) => {

    let userData = {};

    User.findOne({handle: req.user.user.handle }, (err,doc) => {
        if(!err){
            if(doc.length !== 0){
                userData.credential = doc;
                Like.find({userHandle : req.user.user.handle} , (err,data) => {
                    if(!err){
                        console.log(req.user.user.handle);
                        userData.likes=[];
                        data.forEach(doc => {
                            userData.likes.push(doc);
                        });
                        Notification.find({recipient: req.user.user.handle}, (err,data) => {
                            if(!err){
                                userData.notifications=[];
                                data.forEach( (doc) =>{
                                 userData.notifications.push({
                                     recipient: doc.recipient,
                                     sender: doc.sender,
                                     read: doc.read,
                                     screamId: doc.screamId,
                                     type: doc.type,
                                     createdAt: doc.createdAt,
                                     notificationId: doc._id
                                 });
                                })
                                return res.json(userData);
                            }else{
                                console.log(err);
                            }
                      
                             
                        })
                        // return res.json(userData);
                    }else{
                        console.log(err);
                    }
                    
                }) 

            }
        }else{
            return res.json({err});
        }
    });

    // Like.find({userHandle : req.user.user.handle} , (err,data) => {
    //     if(!err){
    //         console.log(req.user.user.handle);
    //         userData.likes=[];
    //         data.forEach(doc => {
    //             userData.likes.push(doc);
    //         });
    //     }
    // });

    // Notification.find({recipient: req.user.user.handle}, (err,data) => {
    //     if(!err){
    //         userData.notifications=[];
    //         data.forEach( (doc) =>{
    //          userData.notifications.push({
    //              recipient: doc.recipient,
    //              sender: doc.sender,
    //              read: doc.read,
    //              screamId: doc.screamId,
    //              type: doc.type,
    //              createdAt: doc.createdAt,
    //              notificationId: doc._id
    //          });


    //         })

    //         return res.json(userData);
    //     }else{
    //         console.log(err);
    //     }
  
         
    // });

};

//Upload user photo ............................................................................................................
exports.uploadImage = (req,res) => {

    
    // let mimetype=;

    if(!req.file){
        
        return res.status(400).json({error: "Wrong file format"});
    }else if (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png'){
    
    // const imageExtension = req.file.originalname.split('.')[req.file.originalname.split('.').length-1];
    
    // console.log(imageExtension);
    // const imageFilename = `${Math.round(Math.random()*10000000000000)}.${imageExtension}`;
    // console.log(imageFilename);
    // const filepath = path.join(os.tmpdir(),imageFilename);
    
    // const imageToBeUploaded = {
    //     filepath ,
    //     mimetype
    // }

    // req.file.originalname=imageFilename;
    // console.log(req.file);
    // console.log(req.user.user);

    User.findOneAndUpdate({handle: req.user.user.handle}, {imageUrl:`http://localhost:5000/storage/${req.file.filename}?alt=media`}, (err, doc) => {
        if(!err){
            // console.log(doc);
            return res.json({message:"The image is successfully added"});
        }else{
           
            console.log(err);
            return res.json({err});
        }
    })
}
};

//

exports.markeNotificationRead = (req,res) => {

    Notification.updateMany({ _id: { $in: req.body }} , { read: true}).then((doc) => {
        // console.log(doc);
        
        // res.setHeader("Content-Type", "application/json");
        return res.json({message: "Notification marked read"});
    })
    .catch(err => {
        console.log(err);
       
        return res.status(500).json(err);
    });



};