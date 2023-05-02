const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://127.0.0.1:27017";
module.exports = new MongoClient(process.env.MONGO_URI);