const mongoose=require('mongoose');
const groupSchema= new mongoose.Schema({
    allUsers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    admin:{
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
const Group=mongoose.model('Group',groupSchema);
module.exports=Group;