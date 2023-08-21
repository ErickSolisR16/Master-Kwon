// * We import libraries
const express = require('express');
const path = require('path');

// * Initialization
const app = express();

// * Configurations
// ? Port number configuration
app.set('PORT', process.env.PORT || 8080);
// ? Define where the views folder is located
app.set('views', path.join(__dirname, 'views'));

// * Static files
// ? Define where the public folder is
app.use(express.static(path.join(__dirname, 'public')));

// ? We export 
module.exports = app;