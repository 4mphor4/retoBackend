'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _ground = require('./ground');

var _ground2 = _interopRequireDefault(_ground);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extendSchema = require('mongoose-extend-schema');

var OwnerSchema = extendSchema(UserSchema, {
    GroundID: [{
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'Ground'
    }],
    employeeID: [{
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = _mongoose2.default.model("Owner", OwnerSchema);