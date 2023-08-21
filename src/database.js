// ? Here the database connection is made.
require('dotenv').config();

const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(
    db => console.log('Connected to the database')
).catch(
    console.log(err => console(err))
);