'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _team = require('./team');

var _team2 = _interopRequireDefault(_team);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extendSchema = require('./mongoose-extend-schema');

var PlayerSchema = extendSchema(UserSchema, {
    teamID: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'Team'
    },
    points: {
        type: Number,
        default: '0'
    }
});

module.exports = _mongoose2.default.model("Player", PlayerSchema);