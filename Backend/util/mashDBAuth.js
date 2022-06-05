const User = require('./userModel');
// const Scream = require('../util/screamsModel');
const jwt = require('jsonwebtoken');

module.exports = mashDBAuth = (req, res, next) => {
    let idToken;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        idToken = req.headers.authorization.split('Bearer ')[1];

    }else{
        console.log("no token found");
        return res.status(403).json({error: "Unauthorized"});
    }
    var secret =Buffer.from("myClientSecret","base64");
    
    jwt.verify(idToken,secret,(err,decodedToken) => {
        
        if(!err){
           
            req.user=decodedToken;
        //  console.log(req.user);
          User.findOne({email:req.user.user.email},(err,doc) => {
            //   console.log("hello");
             
                if (!err){
                    req.user.user.handle = doc.handle;
                    req.user.user.imageUrl = doc.imageUrl;
                    // console.log(req.user.user);
                    // console.log(doc);
                    return next();
                }else{
                    console.log("z "+err);
                }
            })
        }else{
            console.log("w " + err);
            return res.status(403).json(err);
        }
       
    })
}