const postService = require('../services/postService');

async function index(req, res) {
    let posts = await postService.getAllPosts();
    const { category, sort } = req.query;

    if (category) {
        posts = posts.filter(post => post.category === category);
    }

    if (sort === 'title') {
        posts.sort((a, b) => a.title.localeCompare(b.title));
    } else {
        posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    let viewedPosts = [];
    if (req.session.user && req.session.viewedPosts) {
        viewedPosts = posts.filter(p =>
            req.session.viewedPosts.includes(p.id)
        );
    }

    res.render('posts/list', {
        Title: 'LiberalPost',
        posts,
        viewedPosts,
        category,
        sort
    });
}

async function show(req, res) {
    const slug = req.params.slug;
    const post = await postService.getPostBySlug(slug);

    if (!post) {
        return res.status(404).render('errors', {
            Title: 'Nie znaleziono',
            error: 'Post nie istnieje.'
        });
    }

    if (req.session.user) {
        if (!req.session.viewedPosts) {
            req.session.viewedPosts = [];
        }

        req.session.viewedPosts = [
            post.id,
            ...req.session.viewedPosts.filter(id => id !== post.id)
        ].slice(0, 5);
    }

    res.render('posts/show', {
        Title: post.title,
        post
    });
}

async function adminList(req, res) {
    const posts = await postService.getAllPosts();
    res.render('admin/index', { Title: 'Panel admina', posts });
}

function newForm(req, res) {
    res.render('admin/new', { Title: 'Nowy post', errors: null, values: {} });
}

async function create(req, res) {
    const { title, content, author, category } = req.body;
    const errors = [];

    if (!title || title.trim().length < 5) errors.push('Tytuł min. 5 znaków.');
    if (!content || content.trim().length < 20) errors.push('Treść min. 20 znaków.');
    if (!category) errors.push('Kategoria wymagana.');

    if (errors.length > 0) {
        return res.status(400).render('admin/new', {
            Title: 'Nowy post',
            errors,
            values: req.body
        });
    }

    await postService.createPost({ title, content, author, category });
    res.redirect('/admin/posts');
}

async function editForm(req, res) {
    const post = await postService.getPostById(req.params.id);
    if (!post) {
        return res.status(404).render('errors', {
            Title: 'Nie znaleziono',
            error: 'Post nie istnieje.'
        });
    }

    res.render('admin/edit', {
        Title: 'Edytuj post',
        errors: null,
        values: post
    });
}

async function update(req, res) {
    const { title, content, author, category } = req.body;
    const errors = [];

    if (!title || title.trim().length < 5) errors.push('Tytuł min. 5 znaków.');
    if (!content || content.trim().length < 20) errors.push('Treść min. 20 znaków.');

    if (errors.length > 0) {
        return res.status(400).render('admin/edit', {
            Title: 'Edytuj post',
            errors,
            values: { ...req.body, id: req.params.id }
        });
    }

    await postService.updatePost(req.params.id, { title, content, author, category });
    res.redirect('/admin/posts');
}

async function remove(req, res) {
    await postService.deletePost(req.params.id);
    res.redirect('/admin/posts');
}

module.exports = {
    index,
    show,
    adminList,
    newForm,
    create,
    editForm,
    update,
    remove
};
