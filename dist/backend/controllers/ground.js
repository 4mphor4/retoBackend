'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ground = require('../models/ground');

var _ground2 = _interopRequireDefault(_ground);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createGround(req, res) {
    if (!req.payload._id) {
        res.status(401).json({ 'message': 'UnauthorizedError: private profile' });
    }
    var ground = new _ground2.default();
    ground.name = req.body.name;
    ground.location = req.body.location;
    ground.startTime = req.body.startTime;
    ground.endTime = req.body.endTime;
    ground.amenities = req.body.amenities;
    ground.location.address = req.body.location.address;
    ground.location.longitude = req.body.location.lng;
    ground.location.latitude = req.body.location.lat;
    ground.cost = req.body.cost;
    ground.numberOfPlayers = req.body.numberOfPlayers;

    ground.timeSlots = ground.createTimeSlots(ground.convert_to_24h(req.body.startTime), ground.convert_to_24h(req.body.endTime));

    ground.save().then(function (saved) {
        if (saved) {
            console.log(saved);
            _user2.default.findOneAndUpdate({ _id: req.payload._id }, { $push: { "Owner.GroundID": saved._id } }).exec(function (user) {
                return res.json({
                    success: true,
                    message: "Ground created successfully!", user: user
                });
            });
        }
    }).catch(function (err) {
        return res.json({
            success: false,
            message: "Error while saving ground details", err: err
        });
    });
}

function OwnerGround(req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            message: "UnauthorizedError: private profile"
        });
    }
    _user2.default.findOne({ _id: req.payload._id }, '-salt -hash -Player -Employee').populate("Owner.GroundID").exec(function (err, grounds) {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                message: "Could not retrieve owner owned grounds."
            });
        }
        return res.json({
            success: true,
            message: "Owner Grounds fetched Successfully", grounds: grounds
        });
    });
}

function ListGround(req, res) {
    _ground2.default.find(function (err, grounds) {
        if (err) {
            return res.json({
                'success': false,
                'message': 'Could not retrieve grounds'
            });
        }
        return res.json({
            'success': true,
            'message': 'Ground list', grounds: grounds
        });
    });
}

function getGroundDetails(req, res) {
    _ground2.default.findOne({ _id: req.params['name'] }).exec(function (err, ground) {
        if (err) {
            return res.json({ 'success': false, 'message': 'Could not retrieve ground details.' });
        }
        _user2.default.findOne({ "Employee.GroundID": req.params['name'] }, '-salt -hash').exec(function (err, user) {
            if (err) {
                return res.json({ 'success': false, 'message': 'Could not retrieve Employee details.' });
            }
            return res.json({ 'success': true, 'message': 'Ground fetched successfully.', ground: ground, user: user });
        });
    });
}

exports.default = {
    createGround: createGround,
    OwnerGround: OwnerGround,
    ListGround: ListGround,
    getGroundDetails: getGroundDetails
};
module.exports = exports['default'];