const express = require('express');
const router = express.Router();
const controller = require('./controller.js');
const response = require('../../network/index');
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
var upload = multer({ storage: storage });
router.get('/', (req, res) => {
    const filterMessages = req.query.user || null;
    controller
        .getMessages(filterMessages)
        .then((messageList) => {
            response.succes(req, res, messageList, 200);
        })
        .catch((e) => {
            response.error(req, res, 'Unexpected Error', 500, e);
        });
});

router.post('/', upload.single('file'), function (req, res) {
    controller
        .addMessage(req.body.chat, req.body.user, req.body.message, req.file)
        .then((fullMessage) => {
            response.succes(req, res, fullMessage, 201);
        })
        .catch((e) => {
            response.error(
                req,
                res,
                'Informacion invalida',
                400,
                'Error en el controlaor'
            );
        });
});

router.patch('/', function (req, res) {
    controller
        .updateMessage(req.query.id, req.body.message)
        .then((data) => response.succes(req, res, data, 200))
        .catch((err) => response.error(req, res, 'Error Interno', 500, err));
});

router.delete('/', function (req, res) {
    controller
        .deleteMessage(req.query.id)
        .then(() =>
            response.succes(req, res, `Usuario ${req.query.id} eliminado `, 200)
        )
        .catch((e) => response.error(req, res, 'Error interno', 500, e));
});
module.exports = router;
