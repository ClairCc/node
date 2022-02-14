const express = require('express');
const router = express.Router();
const controller = require('./controller.js');
const response = require('../../network/index');
const multer = require('multer');

const upload = multer({
    dest: 'uploads/',
});

router.post('/', upload.single('file'), function (req, res) {
    controller
        .addMessage(req.body.chat, req.body.user, req.body.message)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
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

router.get('/', async (req, res) => {
    try {
        let listChat = await controller.listUsers(req.query.userId);
        response.succes(req, res, listChat, 201);
    } catch (error) {
        response.error(req, res, 'Internal error', 500, error);
    }
});

module.exports = router;
