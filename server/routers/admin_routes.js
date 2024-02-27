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


router.get('/admin', adminHomePage);
router.get('/admin/blogs', listofBlogs);

// add blog form
router.get('/admin/add-blog', addNewBlogForm);

// post a blog
router.post('/admin/add-blog', postNewBlog);

// edit
router.get('/admin/edit-blog/:id', editBlog);
router.put('/admin/edit-blog/:id', updateBlog);

// delete
router.delete('/admin/delete-blog/:id', deleteBlog);

// logout
router.get('/admin/logout', adminLogout);


// search

router.post('/search', searchBlog);















module.exports = router;