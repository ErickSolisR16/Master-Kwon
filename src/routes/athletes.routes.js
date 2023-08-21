const { Router } = require('express');
const router = Router();

const {
    renderForm, 
    newAthlete
} = require('../controllers/athletes.controller');

router.get('/athletes/add', renderForm);

router.post('/athletes/newAthlete', newAthlete);

module.exports = router;