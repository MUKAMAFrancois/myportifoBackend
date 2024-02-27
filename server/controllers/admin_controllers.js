const Blog = require('../models/Blog');
const adminLayout = 'layouts/admin_main';



// admin homepage


const adminHomePage = async (req, res) => {
    try {
        res.render('admin_pages/adminhome', {layout: adminLayout});
    } catch (err) {
        console.error(err);
        res.send(err.message);
    }
}

const listofBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.render('admin_pages/listofblogs', {layout: adminLayout, blogs:blogs});
    } catch (err) {
        console.error(err);
        res.send(err.message);
    }
}


// add new blog form

const addNewBlogForm = async (req,res) =>{
    res.render('admin_pages/add_blog');
}


const postNewBlog = async (req, res) => {
    try{
        const { title,image,description,typeOfBlog } = req.body;
        const newBlog = new Blog({ title,image,description,typeOfBlog });
        await Blog.create(newBlog);
        res.redirect('/admin/blogs');
    
    } catch (err) {
        console.error(err);
        res.send(err.message);
    }
}


// edit new Blog 

const editBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.render('admin_pages/update_blog', { blog:blog});
    } catch (err) {
        console.error(err);
        res.send(err.message); 
    }
}


const updateBlog= async (req, res) => {
    try {
       const { title, image, description, typeOfBlog } = req.body;
       await Blog.findByIdAndUpdate(req.params.id, { title, image, description, typeOfBlog,updatedAt: Date.now()});
       res.redirect('/admin/blogs');
   } catch (err) {
       console.error(err);
       res.send(err.message);
   }
   }


// delete a blog
const deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.redirect('/admin/blogs');
    } catch (err) {
        console.error(err);
        res.send(err.message);
    }
}






// search Blog

const searchBlog = async (req, res) => {
    try {
        const search = req.body.searchBlog;
        const searchNoSpecialChar=search.replace(/[^a-zA-Z0-9]/g, '');
        const blogs=await Blog.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar,'i')} },
                { description: { $regex: new RegExp(searchNoSpecialChar,'i')} }
            ]
        });

        res.render('searchresult', { blogs: blogs });

    } catch (err) {
        console.error(err);
        res.send('Server error');
    }
}


const adminLogout = async (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
}


module.exports = {adminHomePage,
    listofBlogs,
    addNewBlogForm,
    postNewBlog,
    editBlog,
    updateBlog,
    deleteBlog,
    searchBlog,
    adminLogout
};