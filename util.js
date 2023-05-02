const ObjectId = require('mongodb').ObjectId;

const getDBName = (req) => {
    return req.headers.DB || req.headers.db;
}

const getObjectID = (id) => {
    //assert.equal(24, objectId.toHexString().length);
    const objID = new ObjectId("640844832b717a0a40c438cd"); 
}

module.exports = {
    getDBName, getObjectID
}