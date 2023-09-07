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
        res.redirect('/ahletes');
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

/**
 * We render all registered athletes 
 * 
 * @param {*} req 
 * @param {*} res 
 */
athletesCtrl.renderAthletes = async (req, res) => {
    const athletes = await Athlete.find().lean().sort({ age: 'asc' });
    res.render('athletes/allAthletes', { athletes });
};

/**
 * Rendering an athlete's update form
 * 
 * @param {*} req 
 * @param {*} res 
 */
athletesCtrl.renderEditForm = async (req, res) => {
    const athlete = await Athlete.findById(req.params.id).lean();
    res.render('athletes/editAthlete', { athlete });
};

/**
 * Rendering an athlete's update form
 * 
 * @param {*} req 
 * @param {*} res 
 */
athletesCtrl.update = async (req, res) => {
    const errors = [];
    const { name, mail, belt, dateBirth, phoneNumber, emergencyNumber, bloodType } = req.body;
    let allergies = req.body.allergies;
    let treatments = req.body.treatments;
    if (!name) {
        errors.push({ text: 'No se introdujo el nombre del atleta' });
    }
    if (!mail) {
        errors.push({ text: 'No se introdujo el correo del atleta' });
    }
    if (!belt) {
        errors.push({ text: 'No se introdujo el cinturón del atleta' });
    }
    if (!dateBirth) {
        errors.push({ text: 'No se introdujo la fecha de nacimiento del atleta' });
    }
    if (!phoneNumber) {
        errors.push({ text: 'No se introdujo el celular del atleta' });
    }
    if (!emergencyNumber) {
        errors.push({ text: 'No se introdujo el número de emergencia del atleta' });
    }
    if (!bloodType) {
        errors.push({ text: 'No se introdujo el tipo de sangre del atleta' });
    }
    if (errors.length > 0) {
        const athlete = await Athlete.findById(req.params.id).lean();
        return res.render('athletes/editAthlete', {
            errors,
            athlete
        });
    } else {
        if (allergies == '') {
            allergies = 'No aplica';
        }
        if (treatments == '') {
            treatments = 'No aplica';
        }
        var age = calculateAge(dateBirth);
        var trainingClass = assignClass(age);
        await Athlete.findByIdAndUpdate(req.params.id, { name, mail, belt, dateBirth, age, trainingClass, phoneNumber, emergencyNumber, bloodType, allergies, treatments });
        req.flash('msg_successfull', 'Atleta actualizado exitosamente');
        res.redirect('/athletes');
    }
};

/**
 * Elimination of athletes
 * 
 * @param {*} req 
 * @param {*} res 
 */
athletesCtrl.deleteAthlete = async (req, res) => {
    await Athlete.findByIdAndDelete(req.params.id);
    req.flash('msg_successfull', 'Atleta eliminado exitosamente');
    res.redirect('/athletes');
};

/**
 * We create a search filter for athletes
 * 
 * @param {*} req 
 * @param {*} res 
 */
athletesCtrl.searchAthlete = async (req, res) => {
    const nameBody = req.body.name[1];
    const name = new RegExp(nameBody, 'i');
    const athletes = await Athlete.find({ name: name }).lean();
    res.render('athletes/allAthletes', { athletes });
};

/**
 * Athlete data summary
 * 
 * @param {*} req 
 * @param {*} res 
 */
athletesCtrl.athleteSummary = async (req, res) => {
    const athletes = await Athlete.find().lean();
    res.render('athletes/summaryAthletes', { athletes });
};

module.exports = athletesCtrl;