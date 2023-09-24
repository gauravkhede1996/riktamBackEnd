const express= require('express');
const port = 8000;
const app = express();
const cors = require('cors');
const path = require('path');
const db = require('./config/mongoose');



app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(cors());
app.use(express.urlencoded());

app.use('/',require('./routes'));

const chatServer= require('http').Server(app);
const chatSockets= require('./config/chatSockets').chatSockets(chatServer);
chatServer.listen(5000);

app.listen(port, () => {
    console.log('Chat-App-Backend is running on port#',port);
})