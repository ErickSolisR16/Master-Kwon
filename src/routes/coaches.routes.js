const { Router } = require('express');
const router = Router();

const {
    renderForm,
    newCoach, 
    rendercoaches 
} = require('../controllers/coaches.controller');

router.get('/coaches/add', renderForm);

router.post('/coaches/newCoach', newCoach);

router.get('/coaches', rendercoaches);

module.exports = router;