const mongoose=require('mongoose');
const ChatEngine= new mongoose.Schema({
    message:{
        type:String,
        required: true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    chatroom:{
        type:String,
        required: true,
    }

},{
    timestamps:true,
});
const Chatting=mongoose.model('Chatting',ChatEngine);
module.exports=Chatting;