'use strict';

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _user = require('../backend/models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_passport2.default.use(new _passportLocal2.default({
    usernameField: 'phoneNo'
}, function (username, password, done) {
    _user2.default.findOne({ phoneNo: username }, function (err, user) {
        if (err) {
            return done(err);
        }
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
}));