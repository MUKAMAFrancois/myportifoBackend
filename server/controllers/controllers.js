// controllers.js
const Blog=require('../models/Blog');
const User=require('../models/UserAccount');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const jwtSecret=process.env.JWT_SECRET;



/* Check if is Logged In */

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.locals.isAuthenticated = false;
        next();
    }
    try {
        const data = jwt.verify(token, jwtSecret);
        req.username = data.username;
        res.locals.isAuthenticated = true;
        next();
    } catch (err) {
        res.locals.isAuthenticated = false;
        next();
    }
}



// rendering the home page


const homepage= async (req, res) => {
    try{
        let perPage = 6;
        let page = req.query.page || 1;
        const blogs= await Blog.find().skip((perPage * page) - perPage).limit(perPage).sort({createdAt: 'desc'});
        const count = await Blog.countDocuments();
        res.render('index_home',{blogs: blogs, current: page, pages: Math.ceil(count / perPage)})
    } catch (error){
        console.log(error.message);
    }
}


const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        const blogs= await Blog.find().sort({createdAt: 'desc'});
        const locals={
            title:blog.title,

        }
        res.render('single_blog', { blog: blog, locals:locals, blogs:blogs});
    } catch (err) {
        console.error(err);
        res.send('Server error');
    }
}



const registrationForm= async (req, res) => {
    try{
        res.render('register_user');
    } catch (error){
        console.log(error.message);
    }
}


// register a user

const registerUser = async (req, res) => {
    try {
        const { email, password, confirm_password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        if (password !== confirm_password) {
            return res.send('Passwords do not match');
        }

        try {
            const user_data = { email, password: hashedPassword };
            await User.create(user_data); 
            console.log('User registered successfully');
            res.redirect('/login');
        } catch (err) {
            res.status(500).send(err);
        }
    } catch (err) {
        console.error(err);
        res.send(err.message);
    }
};



const loginForm= async (req, res) => {
    try{
        res.render('login_user');
    } catch (error){
        console.log(error.message);
    }
}



const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).send('User not found');
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).send('Invalid password');
            } else {
                const token = jwt.sign({ email }, jwtSecret);
                res.cookie('token', token);
                res.redirect('/');
            }
        } catch (err) {
            res.status(500).send(err);
        }
    } catch (err) {
        console.error(err);
        res.send('Server error');
    }
}


// admin Login form

const adminLoginForm= async (req, res) => {
    try{
        res.render('admin_login');
    } catch (error){
        console.log(error.message);
    }
}

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if(user.email !=="admin@gmail.com"){
                return res.status(401).send('Verify your Email, you are not an admin');
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).send('Invalid password');
            } else {
                const token = jwt.sign({ email }, jwtSecret);
                res.cookie('token', token);
                res.redirect('/admin');
            }
        } catch (err) {
            res.status(500).send(err);
        }
    } catch (err) {
        console.error(err);
        res.send('Server error');
    }
}


const logout = async (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
}


module.exports = {homepage,getBlogById,
    registrationForm,
    loginForm,
    registerUser,
    loginUser,
    authMiddleware,
    adminLoginForm,
    loginAdmin,
    logout
}









// const blogData=[
//     {
//         "title": "React Hooks",
//         "image": "https://th.bing.com/th/id/OIP.U-Lw71ugoK-7wjiS3AGFcAHaHa?w=1080&h=1080&rs=1&pid=ImgDetMain",
//         "description": "Explore advanced patterns and techniques in React for building complex UIs.",
//         "typeOfBlog": "Tutorial",
//         "author": "Sarah Johnson"
//     },
//     {
//         "title": "The future of AI",
//         "image": "https://th.bing.com/th/id/OIP.oie2WFth9JcbmvaWJZPmugHaE8?w=900&h=600&rs=1&pid=ImgDetMain",
//         "description": "Learn strategies for scaling Node.js applications to handle high traffic loads.",
//         "typeOfBlog": "Tips & Tricks",
//         "author": "Michael Brown"
//     },
//     {
//         "title": "Software Testing",
//         "image": "https://th.bing.com/th/id/OIP.Hzg4-_3TX3sz2X39jyNpAwHaEM?w=1200&h=680&rs=1&pid=ImgDetMain",
//         "description": "Understand why testing is crucial in software development and learn best practices.",
//         "typeOfBlog": "Educational",
//         "author": "Emily Chen"
//     },
//     {
//         "title": "Solid WOrks 2021",
//         "image": "https://th.bing.com/th/id/OIP.EF61zyaZXQSqXFcNOoyNrAHaE8?w=1000&h=667&rs=1&pid=ImgDetMain",
//         "description": "Learn how to create RESTful APIs using Express.js for your web applications.",
//         "typeOfBlog": "Tutorial",
//         "author": "David Lee"
//     },
//     {
//         "title": "Progressive Web Apps",
//         "image": "https://th.bing.com/th/id/OIP.vdGWOdKCs4PEAd3yOxQcqAHaEK?rs=1&pid=ImgDetMain",
//         "description": "Discover the benefits of progressive web apps and how to build them.",
//         "typeOfBlog": "Opinion",
//         "author": "Sophia Martinez"
//     }
// ]

// Blog.insertMany(blogData)
//     .then((docs) => {
//         console.log('Documents inserted successfully:', docs);
//     })
//     .catch((err) => {
//         console.error('Error inserting documents:', err);
//     });