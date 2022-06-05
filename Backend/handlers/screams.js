const Scream = require('../util/screamsModel');
const Like = require('../util/likesModel');
const Comment = require('../util/commentModel');
exports.getAllScreams = (req,res) => {
    Scream.find({}, function(err, foundScreams){
        if(!err){
            let screams = [];
            for(let i=foundScreams.length-1 ; i>=0;i--){
                screams.push({
                    screamId: foundScreams[i]._id,
                    body: foundScreams[i].body,
                    userHandle: foundScreams[i].userHandle,
                    createdAt: foundScreams[i].createdAt,
                    commentCount: foundScreams[i].commentCount,
                    likeCount: foundScreams[i].likeCount,
                    userImage: foundScreams[i].userImage
                }); 
            }
            // console.log(foundScreams[0])
            return res.status(201).json(screams);
        }else{
            return res.json({message: "there is an error"});
        }
    
      });
}

exports.postOneScream = (req,res) => {
    if(req.body.body.trim() === ''){
        return res.status(400).json({body:"Body must not be empty"});
    }
    const newScream = {
        body: req.body.body,
        createdAt: new Date().toISOString(),
        userImage: req.user.user.imageUrl,
        userHandle: req.user.user.handle,
        likeCount: 0,
        commentCount: 0,
        userImage: req.user.user.imageUrl
        
    };
//     console.log(req.user.user);
// console.log("hello");
    // console.log(req.body);
    // console.log(newScream);

    Scream.insertMany(newScream , (err,doc) => {
        if(err){
            
            return res.json({message: err});
            
        }

        else{
            // console.log(newScream);
            const resScream = newScream;
            console.log(doc[0]);
            resScream.screamId = doc[0]._id;
            Scream.findOneAndUpdate({_id:doc[0]._id},{screamId:doc[0]._id}).then(()=>{
                console.log("hello");
            }).catch((err) => {
                console.log(err);
            })
            return res.json(resScream);
        }
    })

}; 

exports.getScreams = (req,res) => {
    let screamData = {};
    Scream.findOne({_id: req.params.screamId}, (err,doc) => {
        console.li
        if(!err){
            if(Object.keys(doc) === 0){
                return res.status(404).json({ error : "file not found"});
            }
            screamData.createdAt= doc.createdAt;
            screamData.userHandle=doc.userHandle;
            screamData.body=doc.body;
            screamData.screamId = doc._id;
            screamData.userImage = doc.userImage;
            screamData.commentCount = doc.commentCount;
            screamData.likeCount = doc.likeCount;
            // console.log(doc);            
            // console.log(screamData);
            Comment.find({screamId: req.params.screamId}, (err,data) => {
                if(!err){
                    // console.log(data);
                    // console.log("helo");
                   screamData.comments =[];
                //    for(let i=0;i<data.length;i++){
                //        screamData.comments.push(data[i]);
                //    };
                //    data.forEach(doc =>{
                //        screamData.comments.push(doc);
                //     //    console.log(doc)
                //    });
                   for(let i=data.length-1 ; i>=0;i--){
                    screamData.comments.push(data[i]);
                   }
                   return res.json(screamData);
                }else{
                    return res.json(err);
                }
            })
        }else{
            return res.json(err);
        }
    })

}

//comment on scream

exports.commentOnScream = (req,res) => {
    console.log(req.body);
     if(req.body.body.trim() ==='') return res.status(400).json({comment: "Must not be empty"});

     const newComment = {
         body: req.body.body,
         createdAt: new Date().toISOString(),
         screamId: req.params.screamId,
         userHandle: req.user.user.handle,
         userImage: req.user.user.imageUrl
     };

     Scream.findOne({_id:req.params.screamId},(err, doc) => {
        if(!err){
            if(Object.keys(doc).length ===0 ){
                return res.status(404).json({error: 'scream not found'});
            }
            Scream.findOneAndUpdate({_id:req.params.screamId},{commentCount: doc.commentCount+1},(err) => {
                if(!err){
                    console.log("successfull updated the comment count");
                }else{
                    console.log(err);
                }
            })
            Comment.insertMany(newComment,(err,doc) => {
                if(!err){
                    return res.json(doc[0]);
                }else{
                    return res.json(err);
                }
            })
        }else{
            return res.status(500).json(err);
        }
     })
} 

exports.likeScream = (req,res) => {
    let likeDocument=[];
    
    // console.log("heloo");
    Like.find({screamId: req.params.screamId,userHandle: req.user.user.handle}, (err,doc) => {
        if(!err){
           
            likeDocument=doc;

            let screamData;
    Scream.find({_id:req.params.screamId},(err,doc) => {
        if(!err){
            if(doc.length !== 0){
                screamData=doc[0];
                screamData.screamId = doc[0]._id;
                if(likeDocument.length === 0){
                    Like.insertMany({screamId: req.params.screamId, userHandle: req.user.user.handle},(err,doc) => {
                        if(!err){
                            // console.log(likeDocument);
                            // console.log(doc.length);
                        screamData.likeCount++;
                        Scream.findOneAndUpdate({_id:req.params.screamId},{likeCount: screamData.likeCount},(err)=>{
                            if(!err){
                                console.log("updated successfully");
                            }else{
                                console.log(err);
                            }
                        });
                        return res.json(screamData);
                        }
                    })
                }else{
                    return res.status(400).json({error: "scream already liked"});
                }
            }else{
                console.log("scream doenst exist");
            }
        }else{
            console.log(err);
        }
    })
            
        }else{
            console.log(err);
        }
    });
    
   
    

};
 
exports.unlikeScream = (req,res) => {
    let likeDocument=[];
    
    
    Like.find({screamId: req.params.screamId,userHandle: req.user.user.handle}, (err,doc) => {
        
        if(!err){
            
        console.log(req.user.user.handle);
            likeDocument=doc;
            // console.log("1");
            // console.log(likeDocument);
            // console.log("2");

            let screamData;

    Scream.find({_id:req.params.screamId},(err,doc) => {
        if(!err){
            
            if(doc.length !== 0){
                screamData=doc[0];
                screamData.screamId = doc[0]._id;
                // console.log(screamData);
                // console.log(likeDocument);
                if(likeDocument.length === 0){
                    return res.json({error: "scream already unliked"});
                  
                }else{
                   Like.findOneAndDelete({_id:likeDocument[0]._id},(err) => {
                       
                    if(!err){  
                        
                        screamData.likeCount--;
                       Scream.findOneAndUpdate({_id:req.params.screamId},{likeCount: screamData.likeCount}, (err,doc) => {
                           if(!err){
                               return res.json(screamData);
                           }else{
                               console.log(err);
                           }
                       });
                   
                    }else{
                        console.log(err);
                    }
                   })
                }
            }else{
                console.log("scream doenst exist");
            }
        }else{
            console.log(err);
        }
    })

        }else{
            console.log(err);
        }
    });
   
    
};

//delete Scream
exports.deleteScream = (req,res) => {

    Scream.findOne({_id:req.params.screamId}, (err,doc) => {
        console.log(doc);
        if(!err){
            console.log()
            if(Object.keys(doc) ===0 ){
                return res.json({error: "scream not found"});
            }
            if(doc.userHandle !== req.user.user.handle ){
                return res.status(403).json({error: "unauthorized"});    
            }else{
                Scream.findOneAndDelete({_id:req.params.screamId},(err) => {
                    if(!err){
                        console.log("the scream is successfully deleted");
                        return res.json({message: "the scream is successfully deleted"});
                    }else{
                        console.log(err);
                    }
                })
            }
        }else{
            console.log(err);
            return res.status(500).json({err});
        }
    })

};