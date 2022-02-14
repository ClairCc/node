const express = require('express');
const bodyParser = require('body-parser');
let app = express();
const puerto = 3000;

const db = require('./db');
require('dotenv').config({ path: '.env' });

const router = require('./network/routes');

db(process.env.DB_CONNECT);

app.use(bodyParser.json());

router(app);

app.use('/app', express.static('./public'));

app.listen(puerto);
console.log(`Puerto abierto en el ${puerto}`);
