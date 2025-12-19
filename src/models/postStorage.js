const { connectDB } = require('./db');

async function getPosts(filter = {}, sort = {}) {
    const db = await connectDB();
    return db.collection('posts').find(filter).sort(sort).toArray();
}

async function getPostBySlug(slug) {
    const db = await connectDB();
    return db.collection('posts').findOne({ slug });
}

async function getPostById(id) {
    const db = await connectDB();
    return db.collection('posts').findOne({ id });
}

async function insertPost(post) {
    const db = await connectDB();
    await db.collection('posts').insertOne(post);
}

async function updatePost(id, data) {
    const db = await connectDB();
    await db.collection('posts').updateOne({ id }, { $set: data });
}

async function deletePost(id) {
    const db = await connectDB();
    await db.collection('posts').deleteOne({ id });
}

module.exports = {
    getPosts,
    getPostBySlug,
    getPostById,
    insertPost,
    updatePost,
    deletePost
};
