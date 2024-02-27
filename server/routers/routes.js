// routes.js
const express = require('express');
const router = express.Router();
const {homepage,getBlogById,
    registrationForm,
    loginForm,
    registerUser,
    loginUser,
    authMiddleware,
    adminLoginForm,
    loginAdmin
} = require('../controllers/controllers');






router.get('/', homepage);
router.get('/blog/:id', getBlogById);

// register user
router.get('/register', registrationForm);

// login user
router.get('/login', loginForm);

// post user credintials
router.post('/register', registerUser);

// login
router.post('/login', loginUser);

//admin login form
router.get('/adminLogin', adminLoginForm);
//login Admin
router.post('/adminLogin', loginAdmin);



// search




module.exports = router;