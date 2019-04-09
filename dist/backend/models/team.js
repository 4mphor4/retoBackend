'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TeamSchema = new _mongoose2.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    captain: { //TODO: Creater of the team should be the captian.
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    players: [{ //Function for the captan to be able to add players
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'User',
        max: [15, 'No greater than required']
    }],
    matchesPlayed: {
        type: Number,
        default: 0
    },
    wins: {
        type: Number,
        default: 0
    },
    losses: {
        type: Number,
        default: 0
    },
    rank: {
        type: Number,
        default: 0
    }
});

TeamSchema.methods.assignTeamCaptain = function (playerID) {
    this.captain = playerID;
    this.addPlayertoTeam(playerID);
};

TeamSchema.methods.addPlayertoTeam = function (playerID) {
    this.players.push(playerID);
};

module.exports = _mongoose2.default.model('Team', TeamSchema);