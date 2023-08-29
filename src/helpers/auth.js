const helpers = {};

/**
 * Help to verify if the user is logged in or not
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('msg_error', 'No estás autorizado');
    res.redirect('/coaches/signin');
};

module.exports = helpers;