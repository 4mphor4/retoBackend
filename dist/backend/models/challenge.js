'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChallengeSchema = new _mongoose2.default.Schema({
    challengeCreate: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'Team'
    },
    challengeAccept: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'Team'
    },
    groundID: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'Ground'
    },
    membersTeam1: [{
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'User'
    }],
    membersTeam2: [{
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'User'
    }],
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    winner: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'Team'
    },

    team1Payment: {
        type: Boolean,
        default: false
    },

    team2Payment: {
        type: Boolean,
        default: false
    },

    isEnabled: {
        type: Boolean,
        default: false
    }
});

ChallengeSchema.methods.setEnable = function (team1Payment, team2Payment) {
    if (team1Payment == true && team2Payment == true) {
        Challenge.isEnabled = true;
    }
};

module.exports = _mongoose2.default.model('Challenge', ChallengeSchema);