const { connectDB } = require('./db');

async function getUser(username) {
    const db = await connectDB();
    return db.collection('users').findOne({ username });
}

async function createUser({ username, password, role }) {
    const db = await connectDB();
    await db.collection('users').insertOne({ username, password, role });
}

module.exports = { getUser, createUser };
