// admin routes
const express = require('express');
const router = express.Router();
const {adminHomePage,
    listofBlogs,
    addNewBlogForm,
    postNewBlog,
    editBlog,
    updateBlog,
    deleteBlog,
    searchBlog,
    adminLogout
} = require('../controllers/admin_controllers');

const {authMiddleware,homepage} = require('../controllers/controllers');


router.get('/',  authMiddleware,homepage);

router.get('/admin', adminHomePage);
router.get('/admin/blogs', listofBlogs);

// add blog form
router.get('/admin/add-blog', authMiddleware,addNewBlogForm);

// post a blog
router.post('/admin/add-blog', authMiddleware,postNewBlog);

// edit
router.get('/admin/edit-blog/:id',authMiddleware, editBlog);
router.put('/admin/edit-blog/:id',authMiddleware, updateBlog);

// delete
router.delete('/admin/delete-blog/:id', authMiddleware,deleteBlog);

// logout
router.get('/admin/logout', adminLogout);


// search

router.post('/search', searchBlog);















module.exports = router;