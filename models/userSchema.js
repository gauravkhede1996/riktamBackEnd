const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    age: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        require: true,
        enum:['Admin','NormalUser'],
        default: 'NormalUser'
    }
}, {
    timestamps: true,
});
const User = new mongoose.model('User', userSchema);
module.exports = User;