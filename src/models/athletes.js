const { Schema, model } = require('mongoose');

const athletesSchema = new Schema({
    IDNumber: {
        type: Number, required: true
    },
    name: {
        type: String, required: true
    },
    mail: {
        type: String, required: true
    },
    belt: {
        type: String, required: true
    },
    headquarters: {
        type: String, required: true
    },
    dateBirth: {
        type: String, required: true
    },
    age: {
        type: Number, required: true
    },
    trainingClass: {
        type: String, required: true
    },
    phoneNumber: {
        type: Number, required: true
    },
    emergencyNumber: {
        type: Number, required: true
    },
    bloodType: {
        type: String, required: true
    },
    allergies: {
        type: String, required: false
    }, 
    treatments: {
        type: String, required: false
    }
});

module.exports = model('Athletes', athletesSchema);