'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _ground = require('./ground');

var _ground2 = _interopRequireDefault(_ground);

var _Challenge = require('./Challenge');

var _Challenge2 = _interopRequireDefault(_Challenge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// UPDATE/EDIT Employee

function updateEmployee(req, res) {
    _user2.default.findOneAndUpdate({ phoneNo: req.params.phoneNo }, { $set: { Employee: req.body } }, { new: true }, function (err, employee) {
        if (err) {
            return res.json({ 'success': false, 'message': 'Could not retrieve Employee.' });
        } else {
            return res.json({ 'success': true, 'message': 'User Updated successfully!', employee: employee });
        }
    });
}

//ADD NEW GROUND
function addGround(req, res) {
    console.log('Add Ground');
    if (!req.payload._id) {
        res.status(401).json({ 'message': 'UnauthorizedError: private profile' });
    }
    _user2.default.findOneAndUpdate({ _id: req.payload._id }, { $push: { "Employee.GroundID": req.body.GroundID } }).exec(function (err, user) {
        if (err) {
            return res.json({ success: false, message: "Could not add ground to employee." });
        }
        return res.json({ success: true, message: "Ground added to employee successfully", user: user });
    }).catch(function (err) {
        if (err.name == 'MongoError' || err.code == 11000) {
            return res.status(401).json({ 'message': 'Ground already added to the employee' });
        }
        return res.status(500).json(err);
    });
}

//ADD NEW CHALLENGE
function addChallenge(req, res) {
    console.log('Add Challenge');
    if (!req.payload._id) {
        res.status(401).json({ 'message': 'UnauthorizedError: private profile' });
    }
    _user2.default.findOneAndUpdate({ _id: req.payload._id }, { $push: { "Employee.ChallengeID": res.body.Employee.ChallengeID } }).exec(function (err, user) {
        if (err) {
            return res.json({ success: false, message: "Could not add challenge to employee." });
        }
        return res.json({ success: true, message: "Challenge added to employee successfully", user: user });
    }).catch(function (err) {
        if (err.name == 'MongoError' || err.code == 11000) {
            return res.status(401).json({ 'message': 'Challenge already assigned to the employee' });
        }
        return res.status(500).json(err);
    });
}

exports.default = {
    updateEmployee: updateEmployee,
    addGround: addGround,
    addChallenge: addChallenge
};
module.exports = exports['default'];