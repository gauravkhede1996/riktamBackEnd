const User = require('../models/userSchema');
const Group = require('../models/groupSchema');
const Chatting = require('../models/chatEngine');
const {ObjectId} = require('mongodb');

module.exports.signup = async function (req,res) {
     console.log(req.body);
     const userFound = await User.findOne({email: req.body.email});
     if( userFound) {
        return res.status(403).json({success: false, message:'User Already Exist'});
     }
     let newUser = await User.create({name: req.body.name, email: req.body.email, password: req.body.password, age: req.body.age});
     console.log(newUser," is the new User created with a success")
     return res.status(200).json(newUser)
}

module.exports.login = async function (req,res) {
    const userFound = await User.findOne({email: req.body.email});
    if(!userFound || req.body.email === '' || req.body.password === '') {
        return res.status(404).json({
            success: false,
            user: null,
            message: 'No User exist with email and Password you entered'
        })
    }
    if (userFound && userFound.password !== req.body.password) {
        return res.status(404).json({
            success: false,
            user: null,
            message: 'Wrong Credentials!'
        }) 
    }
    return res.status(200).json({
        success: true,
        message: 'Login Success',
        user: userFound,
    })
}

module.exports.allGroups = async function(req,res) {
    let allGroups = await Group.find({}).populate('admin');
    if( !allGroups) {
        return res.status(400).json({
            success: false,
            message: 'Error fetching all groups'
        })
    }
    return res.status(200).json({
        success: true,
        allGroups
    })
}

module.exports.allUsers = async function(req,res) {
    let allUsers = await User.find({});
    if( !allUsers) {
        return res.status(400).json({
            success: false,
            message: 'Error fetching all Users'
        })
    }
    return res.status(200).json({
        success: true,
        allUsers
    })
}

module.exports.createNewGroup = async function(req,res) {
    let admin = await User.findOne({email:req.body.email});
    let adminObjectId = new ObjectId(admin._id);
    let newlyCreatedGroup = await Group.create({admin: adminObjectId,chatroom: req.body.chatroom });
    console.log(newlyCreatedGroup, " is the newly created group");
    if( !newlyCreatedGroup) {
        return res.status(403).json({
            success: false,
            message: 'Error creating group in backend'
        })
    }
    return res.status(200).json({
        success: true,
        newlyCreatedGroup
    })
}

module.exports.lastMessage = async function(req,res) {
    console.log(req.params.chatroom," is the chatroom recieved to find lastMessage");
    let messageArray = await Chatting.find({chatroom:req.params.chatroom},{message:1,createdAt:1});
    console.log(messageArray," for chatroom", req.params.chatroom);
    let lastMessage= messageArray[messageArray.length-1]? messageArray[messageArray.length-1].message:null;
    console.log(lastMessage," is the lastMessage");
    if(lastMessage) {
        return res.status(200).json({
            success: true,
            lastMessage
        });
    }
    return res.status(200).json({
        success: false,
        message:'Error in finding lastMessage'
    })
}

module.exports.deleteGroup = async function(req,res) {
    let allMessagesOfGroup = await Chatting.deleteMany({ chatroom: req.params.chatroom});
    let groupToBeDeleted = await Group.findOneAndDelete({chatroom:req.params.chatroom});
    console.log(groupToBeDeleted," is groupToBeDeleted variable")
    if(allMessagesOfGroup ) {
        return res.status(200).json({
            success:true,
            message: 'Group deleted successfully'
        })
    }
    else {
        return res.status(404).json({
            success:false,
            message: 'Group deletion failed because Messages are not deleted '
        })
    }

    
}