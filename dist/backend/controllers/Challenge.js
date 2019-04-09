'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _ground = require('./ground');

var _ground2 = _interopRequireDefault(_ground);

var _challenge = require('../models/challenge');

var _challenge2 = _interopRequireDefault(_challenge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createChallenge(req, res) {
    console.log(req.body);
    console.log(req.params.id);
    if (!req.payload._id) {
        res.status(401).json({ 'message': 'UnauthorizedError: private profile' });
    }
    // Store data in challenge
    var challenge = new _challenge2.default();
    challenge.challengeCreate = req.params.id;
    challenge.groundID = req.body.groundID;
    challenge.date = req.body.date;
    challenge.time = req.body.time;
    challenge.membersTeam1 = req.body.Players.id;
    challenge.save().then(function (challenge) {
        if (challenge) {
            return res.status(200).json({ 'success': true, 'message': 'Challenge created successfully!', challenge: challenge });
        }
    }).catch(function (err) {
        if (err.name == 'MongoError' || err.code == 11000) {
            console.log(err);
            return res.status(401).json({ 'message': 'Backend Error' });
        }
        return res.status(500).json(err);
    });

    // ground boooked date and time

    // add challenge to employee page
}

exports.default = {
    createChallenge: createChallenge
};
module.exports = exports['default'];