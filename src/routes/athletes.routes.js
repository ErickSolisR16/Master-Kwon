const { Router } = require('express');
const router = Router();

const {
    renderForm,
    newAthlete,
    renderAthletes,
    renderEditForm,
    update,
    deleteAthlete, 
    searchAthlete
} = require('../controllers/athletes.controller');

router.get('/athletes/add', renderForm);

router.post('/athletes/newAthlete', newAthlete);

router.get('/athletes', renderAthletes);

router.get('/atheltes/edit/:id', renderEditForm);

router.put('/atheltes/edit/:id', update);

router.delete('/athletes/delete/:id', deleteAthlete);

router.post('/athletes/search', searchAthlete);

module.exports = router;