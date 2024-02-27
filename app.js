//git config --global core.autocrlf true
//git rm -r --cached node_modules //git commit -m 'Remove the now ignored directory node_modules'
//git rm --cached .env
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layouts/main');


//searching 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views','./views');



const myRoutes = require('./server/routers/routes');
const adminRoutes = require('./server/routers/admin_routes');







const port = process.env.PORT || 3000;
const connectString=process.env.MONGODB_STRING;


// cookies
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: MongoStore.create({ mongoUrl:process.env.MONGODB_STRING }),
    // cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day

}));


// method-override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));





app.use('/', myRoutes);
app.use('/', adminRoutes);
mongoose.connect(connectString).then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.log('Error connecting to database', err);
});
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});









