const express = require('express');
const router = express.Router();
const client = require('../config/dbConnection');
const message = require('../models/message');

router.get('/:receiverId/:senderId', async (req, res, next) => {
    message.getAllDoc(req, res).catch(console.dir);
});

router.get('/:receiverId', async (req, res, next) => {
    console.log(req.params.receiverId);
    message.getDocById(req, res).catch(console.dir);
});

router.post('/', async (req, res) => {
   message.insertDoc(req, res).catch(console.dir);
});

router.delete('/:id', (req, res, next) => {
    message.deleteDoc(req, res).catch(console.dir);
});

module.exports = router;