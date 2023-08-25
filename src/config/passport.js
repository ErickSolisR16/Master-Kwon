const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Coach = require('../models/coaches');

/**
 * Configure a local authentication strategy
 */
passport.use(new LocalStrategy({
    usernameField: 'mail',
    passwordField: 'password'
}, async (mail, password, done) => {
    const coach = await Coach.findOne({ mail });
    if (!coach) {
        return done(null, false, { message: 'Usuario no encontrado' });
    } else {
        const match = await coach.matchPassword(password);
        if (match) {
            return done(null, coach);
        } else {
            return done(null, false, { message: 'Contraseña incorrecta' });
        }
    }
}));

/**
 * User serialization used to store user information in a session
 */
passport.serializeUser((coach, done) => {
    done(null, coach.id);
});

/**
 * User deserialize used to store user information in a session
 */
passport.deserializeUser(async (id, done) => {
    try {
        const coach = await Coach.findById(id);
        done(null, coach);
    } catch (error) {
        done(error, null);
    }
});
