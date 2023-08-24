const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const coachesSchema = new Schema({
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
    dateBirth: {
        type: String, required: true
    },
    age: {
        type: Number, required: true
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
    password: {
        type:String, required: true
    },
    allergies: {
        type: String, required: false
    },
    treatments: {
        type: String, required: false
    }
});

/**
 * Encrypt the coach's password
 * 
 * @param {String} password 
 * @returns password encrypted
 */
coachesSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

/**
 * We compare the encrypted password 
 * 
 * @param {String} password 
 * @returns password 
 */
coachesSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = model('coaches', coachesSchema);