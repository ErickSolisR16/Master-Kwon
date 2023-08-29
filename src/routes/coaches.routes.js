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
    signin,
    renderchangePassword,
    changePassword
} = require('../controllers/coaches.controller');
const { isAuthenticated } = require('../helpers/auth');

router.get('/coaches/add', isAuthenticated, renderForm);

router.post('/coaches/newCoach', isAuthenticated, newCoach);

router.get('/coaches', isAuthenticated, rendercoaches);

router.get('/coaches/edit/:id', isAuthenticated, renderEditForm);

router.put('/coaches/edit/:id', isAuthenticated, update);

router.delete('/coaches/delete/:id', isAuthenticated, deleteCoach);

router.get('/coaches/signin', renderSigninForm);

router.post('/coaches/signin', signin);

router.get('/coaches/changesPassword', renderchangePassword);

router.put('/coaches/changesPassword/', changePassword);

module.exports = router;