'use strict';

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function load(req, res, next, id) {
    _user2.default.findById(id).exec().then(function (user) {
        req.dbUser = user;
        return next();
    }, function (err) {
        return next(err);
    });
}

function get(req, res) {
    return res.json(req.dbUser);
}

function create(req, res) {
    _user2.default.create({
        username: req.body.username

    });
}