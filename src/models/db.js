const { MongoClient } = require('mongodb');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = 'liberalpost';
let client;

async function connectDB() {
    if (!client) {
        client = new MongoClient(MONGO_URI);
        await client.connect();
    }
    return client.db(DB_NAME);
}

module.exports = { connectDB };
