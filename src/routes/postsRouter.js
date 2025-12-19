const express = require('express');
const router = express.Router();

const postsController = require('../controllers/postsController');
const { requireAdmin } = require('../middlewares/authMiddleware');

router.get('/', postsController.index);
router.get('/posts/:slug', postsController.show);
router.get('/admin/posts', requireAdmin, postsController.adminList);
router.get('/admin/posts/new', requireAdmin, postsController.newForm);
router.post('/admin/posts', requireAdmin, postsController.create);
router.get('/admin/posts/:id/edit', requireAdmin, postsController.editForm);
router.post('/admin/posts/:id/edit', requireAdmin, postsController.update);
router.post('/admin/posts/:id/delete', requireAdmin, postsController.remove);

module.exports = router;
