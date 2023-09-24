// LIyIwUtMYqvBrGpw
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://gauravkhede1:LIyIwUtMYqvBrGpw@cluster0.z0aw7ty.mongodb.net/?retryWrites=true')

const db = mongoose.connection;
db.on('error',console.error.bind(console," error connecting to Db"));
db.once('open', () => {
    console.log('Connection with database is successfull');
});
module.exports = db;