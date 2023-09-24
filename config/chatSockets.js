const Chatting=require('../models/chatEngine');
const User = require('../models/userSchema');
const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');
module.exports.chatSockets= function(socketServer){
    let io= require('socket.io')(socketServer,{ cors:{ origin:'*'}});


    io.sockets.on('connection',function(socket){
        console.log("new connection recieved",socket.id);
        socket.on('join_room',async (data) => {
            console.log("rendered Join_Room");
            let reverseChatroom=data.chatRoom.split("_")[1]+"_"+data.chatRoom.split("_")[0];
            const docs = await Chatting.find({ chatroom:{$in: [ data.chatRoom, reverseChatroom ] } }).populate('user');
            // console.log(docs," is the docs");
            if(docs) {
                socket.emit('load_old_messages',docs);
            }
            socket.join(data.chatRoom);
            io.in(data.chatRoom).emit('user_joined',data);
        })
        socket.on('send_message', async function(data){
            const userFound = await User.findOne({email:data.email});
            console.log(data.chatRoom," is the data inside chatroom");
            const userId = new ObjectId(userFound._id);
            var newMsg= await Chatting.create({message:data.newMessage,user:userId,chatroom:data.chatRoom});
            if(data.friend_email!==undefined){
                io.to([data.email.split("@")[0]+"_"+data.friend_email.split("@")[0], data.friend_email.split("@")[0]+"_"+data.email.split("@")[0]]).emit("recieve_message",data);
            }else{
            io.in(data.chatRoom).emit('recieve_message',data);
            }
            });
    })
}