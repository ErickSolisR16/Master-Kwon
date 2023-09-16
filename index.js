// ? This file starts the application

require('dotenv').config();

const app = require('./src/server');
require('./src/database');

app.listen(app.get('PORT'), () => {
    console.log('Server listening at the port', app.get('PORT'));
});