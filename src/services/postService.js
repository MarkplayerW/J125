const storage = require('../models/postStorage');

function slugify(title) {
    return title.toLowerCase().trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
}


async function getAllPosts() {
    const dbPosts = await storage.getPosts();
    return [ ...dbPosts];
}

async function getPostBySlug(slug) {
    return await storage.getPostBySlug(slug);
}

async function getPostById(id) {
    return await storage.getPostById(id);
}

async function createPost({ title, content, author, category }) {
    const post = {
        id: Date.now().toString(),
        title,
        content,
        author: author || 'Admin',
        category,
        slug: slugify(title),
        createdAt: new Date()
    };
    await storage.insertPost(post);
    return post;
}

async function updatePost(id, data) {
    await storage.updatePost(id, data);
}

async function deletePost(id) {
    await storage.deletePost(id);
}

module.exports = {
    getAllPosts,
    getPostBySlug,
    getPostById,
    createPost,
    updatePost,
    deletePost
};
