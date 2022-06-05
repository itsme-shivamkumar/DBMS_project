const Chat = require('../util/chatModel');
const User = require('../util/userModel');

exports.getChats = (req,res) => {
    
    // Chat.find({},(err,doc)=>{
    //     if(!err){
    //         if(doc){
                
    //         let chats =[];
    //         let sender={};
    //         for(let i =0; i< doc.length; i++){
    //             User.findOne({_id:doc[i].sender},(err,data)=>{
    //                 if(!err){
    //                     if(data){

                        
    //                     sender=data;
    //                     // console.log(sender);
    //                     chats.push({
    //                         _id:doc[i]._id,
    //                         message:doc[i].message,
    //                         sender:sender,
    //                         type: doc[i].type
    //                     })
    //                     // return res.json(chats);
    //                     console.log(chats)
    //                     }else{
    //                         console.log("no dtaa");
    //                     }
    //                 }else{
    //                     console.log(err);
    //                 }
    //             })
    //             // }).then(data => {
    //             //     // console.log(data)
    //             //    sender = {    _id:data._id}
    //             //             //     email:data.email,
    //             //             //     handle:data.handle,
    //             //             //     createdAt:data.createdAt,
    //             //             //     imageUrl:data.imageUrl
    //             //             // }
    //             //             console.log(data._id)
    //             //     // sender._id=data._id;
    //             //     // sender.email=data.email;
    //             //     // sender.handle=data.handle;
    //             //     // sender.createdAt=data.createdAt;
    //             //     // sender.imageUrl=data.imageUrl;
                    
    //             // }).catch(err => {
    //             //     console.log(err);
    //             // })
    //             // console.log("1");
    //             // console.log(sender);
    //             // console.log("2");
    //             // console.log(doc[i]._id);
                
                
    //         }
    //         return res.json(chats);
            
    //     }else{
    //         console.log(doc);
    //     }
    //     }else{
    //         console.log(err);
    //     }

    // })

    Chat.find()
        .populate('sender')
        .exec((err,chats) => {
            if(err) return res.status(400).send(err);
            res.status(200).send(chats)
        })





}