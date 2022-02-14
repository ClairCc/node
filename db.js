const db = require('mongoose');
db.Promise = global.Promise;

async function connect(url) {
    await db.connect(url, { useNewUrlParser: true });
    console.log('db has connect with exit');
}

module.exports = connect;
