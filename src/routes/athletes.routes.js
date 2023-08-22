const { Router } = require('express');
const router = Router();

const {
    renderForm, 
    newAthlete,
    renderAthletes,
    renderEditForm,
    update
} = require('../controllers/athletes.controller');

router.get('/athletes/add', renderForm);

router.post('/athletes/newAthlete', newAthlete);

router.get('/athletes', renderAthletes);

router.get('/atheltes/edit/:id', renderEditForm);

router.put('/atheltes/edit/:id', update);

module.exports = router;