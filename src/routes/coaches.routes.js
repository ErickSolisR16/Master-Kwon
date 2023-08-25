const { Router } = require('express');
const router = Router();

const {
    renderForm,
    newCoach, 
    rendercoaches,
    renderEditForm,
    update,
    deleteCoach,
    renderSigninForm,
    signin
} = require('../controllers/coaches.controller');

router.get('/coaches/add', renderForm);

router.post('/coaches/newCoach', newCoach);

router.get('/coaches', rendercoaches);

router.get('/coaches/edit/:id', renderEditForm);

router.put('/coaches/edit/:id', update);

router.delete('/coaches/delete/:id', deleteCoach);

router.get('/coaches/signin', renderSigninForm);

router.post('/coaches/signin', signin);

module.exports = router;