const { Router } = require('express');
const router = Router();

const {
    renderForm,
    newAthlete,
    renderAthletes,
    renderEditForm,
    update,
    deleteAthlete, 
    searchAthlete, 
    athleteSummary
} = require('../controllers/athletes.controller');
const { isAuthenticated } = require('../helpers/auth');

router.get('/athletes/add', isAuthenticated, renderForm);

router.post('/athletes/newAthlete', isAuthenticated, newAthlete);

router.get('/athletes', isAuthenticated, renderAthletes);

router.get('/atheltes/edit/:id', isAuthenticated, renderEditForm);

router.put('/atheltes/edit/:id', isAuthenticated, update);

router.delete('/athletes/delete/:id', isAuthenticated, deleteAthlete);

router.post('/athletes/search', isAuthenticated, searchAthlete);

router.get('/athletes/summary', isAuthenticated, athleteSummary);

module.exports = router;