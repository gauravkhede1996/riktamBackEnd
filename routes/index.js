const express = require('express');
const router = express.Router();
const userController = require('../controllers.js/userController')
router.get('/',(req,res) => {
    return res.render('Home');
})
router.post('/signup',userController.signup)
router.post('/login',userController.login);
router.get('/allGroups/:email', userController.allGroups);
router.get('/allUsers', userController.allUsers);
router.post('/newCreateGroup', userController.createNewGroup);
router.get('/lastMessage/:chatroom', userController.lastMessage);
router.delete('/deleteGroup/:chatroom', userController.deleteGroup);
router.post('/addUserToGroup', userController.addUserToGroups);
module.exports = router;