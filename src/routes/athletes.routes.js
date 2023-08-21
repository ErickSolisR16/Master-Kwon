const { Router } = require('express');
const router = Router();

const {
    renderForm, 
    newAthlete,
    renderAthletes
} = require('../controllers/athletes.controller');

router.get('/athletes/add', renderForm);

router.post('/athletes/newAthlete', newAthlete);

router.get('/athletes', renderAthletes);

module.exports = router;