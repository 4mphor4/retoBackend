'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _challenge = require('./challenge');

var _challenge2 = _interopRequireDefault(_challenge);

var _ground = require('./ground');

var _ground2 = _interopRequireDefault(_ground);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extendSchema = require('./mongoose-extend-schema');

var EmployeeSchema = extendSchema(UserSchema, {
    GroundID: [{
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'Ground'
    }],
    ChallengeID: [{
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'Challenge'
    }]
    /*Bookings:[{
            date: String,
            time: String
        }]*/
});

module.exports = _mongoose2.default.model("Employee", EmployeeSchema);