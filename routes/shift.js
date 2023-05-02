const express = require('express');
const router = express.Router();
const client = require('../config/dbConnection');
const shift = require('../models/shift');

router.get('/', async (req, res, next) => {
    shift.getAllDoc(req, res).catch(console.dir);
});

router.get('/:id', async (req, res, next) => {
    shift.getDocById(req, res).catch(console.dir);
});

router.post('/', async (req, res) => {
   shift.insertDoc(req, res).catch(console.dir);
});

router.put('/:id', (req, res) => {
    shift.updateDoc(req, res).catch(console.dir);
});

router.delete('/:id', (req, res, next) => {
    shift.deleteDoc(req, res).catch(console.dir);
});

module.exports = router;