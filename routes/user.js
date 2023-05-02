const express = require('express');
const router = express.Router();
const client = require('../config/dbConnection');
const user = require('../models/user');

router.get('/', async (req, res, next) => {
    user.getAllDoc(req, res).catch(console.dir);
});

router.get('/:id', async (req, res, next) => {
    user.getDocById(req, res).catch(console.dir);
});

router.post('/', async (req, res) => {
   user.insertDoc(req, res).catch(console.dir);
});

router.put('/:id', (req, res) => {
    user.updateDoc(req, res).catch(console.dir);
});

router.delete('/:id', (req, res, next) => {
    user.deleteDoc(req, res).catch(console.dir);
});

module.exports = router;