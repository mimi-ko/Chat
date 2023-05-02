const client = require('../config/dbConnection');

const ObjectId = require('mongodb').ObjectId;

const util = require('../util');
const collectionName = 'shifts';

const getAllDoc = async (req, res) => {
    try {
        await client.connect();
        const dbName = util.getDBName(req);
        const db = client.db(dbName);
        const dbCollections = db.collection(collectionName);
    
        const query = {};
        const options = {
            sort: { dutyInTime: 1 },
            projection: {_id: 1, dutyInTime: 1},
        };
    
        if ((await dbCollections.countDocuments(query)) === 0) {
            return res.status(400).json({message:"No document found"});
        }
        else {
            const cursor = dbCollections.find(query, options);
            const records = await cursor.toArray();
            return res.status(200).json(records);
        }
    
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

const getDocById = async (req, res) => {
    try {
        await client.connect();
        dbName = util.getDBName(req);

        const db = client.db(dbName);
        const dbCollections = db.collection(collectionName);
        
        const query = {_id: new ObjectId(req.params.id)};

        const options = {
            sort: { description: 1 },
            projection: { }
        };

        // print a message if no documents were found
        if ((await dbCollections.countDocuments(query)) === 0) {
            return res.status(400).json({message:"No document found"});
        } else {
            const record = await dbCollections.findOne(query, options);
            return res.status(200).json(record);
        }
    
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

const insertDoc = async(req, res) => {
    const shift = {
        shortCode:req.body.shortCode,
        description:req.body.description,
        bonusAmount:req.body.bonusAmount,
        bonusPercentage:req.body.bonusPercentage,
        defaultShift:req.body.defaultShift,
        morningOTStart:req.body.morningOTStart,
        morningOTEnd:req.body.morningOTEnd,
        dutyInTime:req.body.dutyInTime,
        lateInTime:req.body.lateInTime,
        breakTimeStart:req.body.breakTimeStart,
        breakTimeEnd:req.body.breakTimeEnd,
        earlyOutTime:req.body.earlyOutTime,
        dutyOutTime:req.body.dutyOutTime,
        eveningOTStart:req.body.eveningOTStart,
        eveningOTEnd:req.body.eveningOTEnd,
        created_by:req.body.userId,
        created_at:new Date(),
        updated_by:req.body.userId,
        updated_at:new Date()
    };

    try {
        await client.connect();
        const dbName = util.getDBName(req);

        const db = client.db(dbName);
        const dbCollections = db.collection(collectionName);
        const result = await dbCollections.insertOne(shift);

        console.log(result.insertedId);
        return res.status(200).json({message:"Insert success", insertedId:result.insertedId});

        // display the results of your operation
        
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

const updateDoc = async(req, res) => {
    const shift = {
        shortCode:req.body.shortCode,
        description:req.body.description,
        bonusAmount:req.body.bonusAmount,
        bonusPercentage:req.body.bonusPercentage,
        defaultShift:req.body.defaultShift,
        morningOTStart:req.body.morningOTStart,
        morningOTEnd:req.body.morningOTEnd,
        dutyInTime:req.body.dutyInTime,
        lateInTime:req.body.lateInTime,
        breakTimeStart:req.body.breakTimeStart,
        breakTimeEnd:req.body.breakTimeEnd,
        earlyOutTime:req.body.earlyOutTime,
        dutyOutTime:req.body.dutyOutTime,
        eveningOTStart:req.body.eveningOTStart,
        eveningOTEnd:req.body.eveningOTEnd,
        updated_by:req.body.userId,
        updated_at:new Date()
    };

    try {
        await client.connect();
        const dbName = util.getDBName(req);

        const db = client.db(dbName);
        const dbCollections = db.collection(collectionName);
    
        const query = {_id: new ObjectId(req.params.id)};
        // create a document that sets the plot of the movie
    
        const result = await dbCollections.replaceOne(query, shift);
        
        return res.status(200).json({message:"Update success", modifiedCount:result.modifiedCount});
        
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

const deleteDoc = async(req, res) => {
    const shift = {
        
    };

    try {
        await client.connect();
        const dbName = util.getDBName(req);

        const db = client.db(dbName);
        const dbCollections = db.collection(collectionName);
    
        const filter = {_id: new ObjectId(req.params.id)};
        const updateDoc = {
            $set: {
                deleted_by:req.body.userId,
                deleted_at:new Date()
            },
          };
          const result = await dbCollections.updateOne(filter, updateDoc);
    
    

        //const result = await dbCollections.replaceOne(query, shift);
        
        return res.status(200).json({message:"Update success", modifiedCount:result.modifiedCount});
        
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

const hardDeleteDoc = async(req, res) => {
    try {
        await client.connect();
        const dbName = util.getDBName(req);

        const db = client.db(dbName);
        const dbCollections = db.collection(collectionName);
        
        const query = {_id: new ObjectId(req.params.id)};

        const result = await dbCollections.deleteOne(query);
        if (result.deletedCount === 1) {
            return res.status(200).json({message:"Delete success", deletedCount:result.deletedCount});
        } else {
            return res.status(200).json({message:"Delete fail", deletedCount:result.deletedCount});
        }
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

module.exports = { getAllDoc, getDocById, insertDoc, updateDoc, deleteDoc, hardDeleteDoc }