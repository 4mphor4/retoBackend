'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _team = require('../models/team');

var _team2 = _interopRequireDefault(_team);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createTeam(req, res) {
    if (!req.payload._id) {
        res.status(401).json({ 'message': 'UnauthorizedError: private profile' });
    }
    var team = new _team2.default();
    team.name = req.body.name;
    team.assignTeamCaptain(req.payload._id);
    team.save().then(function (team) {
        if (team) {
            _user2.default.findOneAndUpdate({ _id: req.payload._id }, { $push: { "Player.TeamID": team._id } }).exec(function (user) {
                return res.json({ 'success': true, 'message': 'Team created successfully!', user: user });
            });
        }
    }).catch(function (err) {
        if (err.name == 'MongoError' || err.code == 11000) {
            console.log(err);
            return res.status(401).json({ 'message': 'Team Already exists' });
        }
        return res.status(500).json(err);
    });
};

function ListTeam(req, res) {
    _team2.default.find(function (err, teams) {

        if (err) {
            return res.json({ 'success': false, 'message': 'Could not retrieve teams' });
        }
        return res.json({ 'success': true, 'message': 'Team list', teams: teams });
    });
}
// , 'phoneNo', 'points', 'position'


function getTeamDetails(req, res) {
    console.log('in team edtails');
    _team2.default.findOne({ _id: req.params['name'] }).populate({
        path: 'players',
        select: '-salt -hash -Owner -Employee -role -Player.TeamID'
    }).exec(function (err, team) {
        if (err) {
            return res.json({ 'success': false, 'message': 'Could not retrieve team details.' });
        }
        return res.json({ 'success': true, 'message': 'Team fetched successfully.', team: team });
    });
}

exports.default = {
    createTeam: createTeam,
    ListTeam: ListTeam,
    getTeamDetails: getTeamDetails
};
module.exports = exports['default'];