// * We import libraries
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// * Initialization
const app = express();

// * Configurations
// ? Port number configuration
app.set('PORT', process.env.PORT || 8080);
// ? Define where the views folder is located
app.set('views', path.join(__dirname, 'views'));
// ? Configuration of handlebars
const hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// * Intermediaries
// ? When data is received, it makes them turn into a JSON file
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// * Global variables
app.use((req, res, next) => {
    res.locals.msg_successfull = req.flash('msg_successfull');
    res.locals.msg_error = req.flash('msg_error');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


// * Routes
// ? Path where the application starts
app.get('/', (req, res) => {
    res.render('index')
});
app.use(require('./routes/athletes.routes'));

// * Static files
// ? Define where the public folder is
app.use(express.static(path.join(__dirname, 'public')));

// ? We export 
module.exports = app;