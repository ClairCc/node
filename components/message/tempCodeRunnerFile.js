const db = require('mongoose');
const Model = require('./model');
db.Promise = global.Promise;
db.connect(
    'mongodb+srv://db_user_tele:MWfzxAigS52KE41I@cluster0.k4uaa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true }
);