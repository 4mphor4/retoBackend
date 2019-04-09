import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../backend/models/user';

passport.use(new LocalStrategy({
    usernameField: 'phoneNo'
},
    function (username, password, done) {
        User.findOne({ phoneNo: username }, function (err, user) {
            if (err) { return done(err); }
            // Return if user not found in database
            if (!user) {
                return done(null, false, {
                    message: 'User not Found'
                });
            }
            // Return if password is wrong
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Invalid Password'
                });
            }
            // Return User if both are correct
            return done(null, user);
        });
    }
));