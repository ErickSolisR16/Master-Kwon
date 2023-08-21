const athletesCtrl = {};
const Athlete = require('../models/athletes');

/**
 * Render the form of a new athlete
 * 
 * @param {*} req 
 * @param {*} res 
 */
athletesCtrl.renderForm = (req, res) => {
    res.render('athletes/newAthlete');
}

/**
 * Render the form of a new athlete
 * 
 * @param {*} req 
 * @param {*} res 
 */
athletesCtrl.newAthlete = async (req, res) => {
    const errors = [];
    const { IDNumber, name, mail, headquarters, dateBirth, phoneNumber, emergencyNumber, bloodType } = req.body;
    let belt = req.body.belt;
    let allergies = req.body.allergies;
    let treatments = req.body.treatments;
    if (!IDNumber) {
        errors.push({ text: 'Introduzca el número de cédula del atleta' });
    }
    if (!name) {
        errors.push({ text: 'Introduzca el nombre del atleta' });
    }
    if (!mail) {
        errors.push({ text: 'Introduzca el correo del atleta' });
    }
    if (!dateBirth) {
        errors.push({ text: 'Introduzca la fecha de nacimiento del atleta' });
    }
    if (!phoneNumber) {
        errors.push({ text: 'Introduzca el celular del atleta' });
    }
    if (!emergencyNumber) {
        errors.push({ text: 'Introduzca el celular de emergencia del atleta' });
    }
    if (!bloodType) {
        errors.push({ text: 'Introduzca el tipo de sangre del atleta' });
    }
    if (errors.length > 0) {
        return res.render('athletes/newAthlete', {
            errors,
            IDNumber,
            name,
            mail,
            dateBirth,
            phoneNumber,
            emergencyNumber,
            bloodType,
            allergies,
            treatments
        });
    } else {
        const IDUser = await Athlete.findOne({ IDNumber: IDNumber });
        if (IDUser) {
            errors.push({ text: 'La cédula ya está en uso' });
            return res.render('athletes/newAthlete', {
                errors,
                name,
                mail,
                belt,
                dateBirth,
                phoneNumber,
                emergencyNumber,
                bloodType,
                allergies,
                treatments
            });
        }
        const mailUser = await Athlete.findOne({ mail: mail });
        if (mailUser) {
            errors.push({ text: 'El correo ya está en uso' });
            return res.render('athletes/newAthlete', {
                errors,
                IDNumber,
                name,
                belt,
                dateBirth,
                phoneNumber,
                emergencyNumber,
                bloodType,
                allergies,
                treatments
            });
        }
        if (belt == '') {
            belt = 'Blanco';
        }
        if (allergies == '') {
            allergies = 'No aplica';
        }
        if (treatments == '') {
            treatments = 'No aplica';
        }
        var age = calculateAge(dateBirth);
        var trainingClass = assignClass(age);
        const newAthlete = new Athlete({ IDNumber, name, mail, headquarters, belt, dateBirth, age, trainingClass, phoneNumber, emergencyNumber, bloodType, allergies, treatments });
        await newAthlete.save();
        req.flash('msg_successfull', 'Atleta registrado exitosamente');
        res.redirect('/');
    }
};

/**
 * We calculate the age of the athlete
 * 
 * @param {String} dateBirth 
 * @returns age number
 */
function calculateAge(dateBirth) {
    var dateFormat = dateBirth.split('/');
    var day = dateFormat[0];
    var month = dateFormat[1];
    var year = dateFormat[2];

    var newDate = new Date(year, month, day);
    var diferenceTime = Date.now() - newDate.getTime();
    var age = new Date(diferenceTime).getFullYear() - 1970;
    return age;
};

/**
 * We assign the athlete's class
 * 
 * @param {Number} age 
 * @returns class String
 */
function assignClass(age) {
    if (age > 4 && age < 12) {
        return 'Infantil';
    } else if (age >= 12 && age < 16) {
        return 'Cadete';
    } else if (age >= 15 && age < 19) {
        return 'Juvenil';
    } else {
        return 'Adulto';
    }
};


module.exports = athletesCtrl;