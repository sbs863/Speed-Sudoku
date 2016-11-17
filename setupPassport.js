var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcryptjs'),
    Model = require('./models');

module.exports = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(
        function(username, password, done) {
            Model.users.findOne({
                where: {
                    'username': username
                }
            }).then(function(user) {
                if (user === null) {
                    return done(null, false, { message: 'Incorrect credentials.' });
                }

                var hashedPassword = bcrypt.hashSync(password, user.salt);

                if (user.password === hashedPassword) {
                    return done(null, user);
                }

                return done(null, false, { message: 'Incorrect credentials.' });
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id)
    });

    passport.deserializeUser(function(id, done) {
        Model.users.findOne({
            where: {
                'id': id
            }
        }).then(function(user) {
            if (user == null) {
                done(new Error('Wrong user id.'));
            }

            done(null, user);
        });
    });

}