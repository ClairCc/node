const express = require('express');
const router = express.Router();
const controller = require('./controller.js');
const response = require('../../network/index');

router.post('/', (req, res) => {
    controller
        .addUser(req.body.name)
        .then((data) => {
            response.succes(req, res, data, 201);
        })
        .catch((err) => {
            response.error(req, res, 'Internal error', 500, err);
        });
});

router.get('/', async (req, res) => {
    try {
        let users = await controller.listUser();
        response.succes(req,res,users,200)
    } catch (error) {
        response.error(req,res,'Internal error list user',500, error)
    }
});

module.exports = router;
