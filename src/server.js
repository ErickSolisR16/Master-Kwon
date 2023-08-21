// * We import libraries
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

// * Initialization
const app = express();

// * Configurations
// ? Port number configuration
app.set('PORT', process.env.PORT || 8080);
// ? Define where the views folder is located
app.set('views', path.join(__dirname, 'views'));
// ? Configuration of handlebars
const hbs = exphbs.create({
    defaultLayout: false,
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// * Routes
// ? Path where the application starts
app.get('/', (req, res) => {
    res.render('index')
});

// * Static files
// ? Define where the public folder is
app.use(express.static(path.join(__dirname, 'public')));

// ? We export 
module.exports = app;