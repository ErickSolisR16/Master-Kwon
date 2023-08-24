const coachesCtrl = {};
const Coach = require('../models/coaches');

/**
 * Render the form of a new coach
 * 
 * @param {*} req 
 * @param {*} res 
 */
coachesCtrl.renderForm = (req, res) => {
    res.render('coaches/newCoach');
};

/**
 * Creation of a new coach
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns coach Object
 */
coachesCtrl.newCoach = async (req, res) => {
    const errors = [];
    const { IDNumber, name, mail, belt, dateBirth, phoneNumber, emergencyNumber, bloodType, password, confirm_password } = req.body;
    let allergies = req.body.allergies;
    let treatments = req.body.treatments;
    if (password != confirm_password) {
        errors.push({ text: 'Las contraseñas no coinciden' });
    }
    if (password.length < 4) {
        errors.push({ text: 'La contraseña debe tener un mínimo de 4 caracteres' });
    }
    if (!IDNumber) {
        errors.push({ text: 'Introduzca el número de cédula del entrenador' });
    }
    if (!name) {
        errors.push({ text: 'Introduzca el nombre del entrenador' });
    }
    if (!mail) {
        errors.push({ text: 'Introduzca el correo del entrenador' });
    }
    if (!belt) {
        errors.push({ text: 'Introduzca el cinturón del entrenador' });
    }
    if (!dateBirth) {
        errors.push({ text: 'Introduzca la fecha de nacimiento del entrenador' });
    }
    if (!phoneNumber) {
        errors.push({ text: 'Introduzca el celular del entrenador' });
    }
    if (!emergencyNumber) {
        errors.push({ text: 'Introduzca el número de emergencia del entrenador' });
    }
    if (!bloodType) {
        errors.push({ text: 'Introduzca el tipo de sangre' });
    }
    if (errors.length > 0) {
        return res.render('coaches/newCoach', {
            errors,
            IDNumber,
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
    } else {
        const IDUser = await Coach.findOne({ IDNumber: IDNumber });
        if (IDUser) {
            errors.push({ text: 'La cédula ya está en uso' });
            return res.render('coaches/newCoach', {
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
        const mailUser = await Coach.findOne({ mail: mail });
        if (mailUser) {
            errors.push({ text: 'El correo ya está en uso' });
            return res.render('coaches/newCoach', {
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
        if (allergies == '') {
            allergies = 'No aplica';
        }
        if (treatments == '') {
            treatments = 'No aplica';
        }
        var age = calculateAge(dateBirth);
        const newCoach = new Coach({ IDNumber, name, mail, belt, dateBirth, age, phoneNumber, emergencyNumber, bloodType, password, allergies, treatments });
        newCoach.password = await newCoach.encryptPassword(password);
        await newCoach.save();
        req.flash('msg_successfull', 'Entrenador registrado exitosamente');
        res.redirect('/');
    }
};

/**
 * We calculate the age of the athlete
 * 
 * @param {String} dateBirth 
 * @returns age Number
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

module.exports = coachesCtrl;