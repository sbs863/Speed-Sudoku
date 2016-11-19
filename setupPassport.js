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
            }).then(function(users) {
                if (users === null) {
                    return done(null, false, { message: 'Incorrect credentials.' });
                }

                var hashedPassword = bcrypt.hashSync(password, users.salt);

                if (users.password === hashedPassword) {
                    return done(null, users);
                }

                return done(null, false, { message: 'Incorrect credentials.' });
            });
        }
    ));

    passport.serializeUser(function(users, done) {
        done(null, users.id)
    });

    passport.deserializeUser(function(id, done) {
        Model.users.findOne({
            where: {
                'id': id
            }
        }).then(function(users) {
            if (users == null) {
                done(new Error('Wrong user id.'));
            }

            done(null, users);
        });
    });

}