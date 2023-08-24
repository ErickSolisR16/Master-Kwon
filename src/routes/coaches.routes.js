const { Router } = require('express');
const router = Router();

const {
    renderForm,
    newCoach 
} = require('../controllers/coaches.controller');

router.get('/coaches/add', renderForm);

router.post('/coaches/newCoach', newCoach);

module.exports = router;