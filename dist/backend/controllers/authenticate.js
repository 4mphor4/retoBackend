"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

var _Employee = require("./Employee");

var _Employee2 = _interopRequireDefault(_Employee);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// CREATE USER

function register(req, res) {
  var user = new _user2.default();

  user.name = req.body.userName;
  user.phoneNo = req.body.phoneNo;
  // user.email = req.body.email;
  user.role = req.body.role;
  user.setPassword(req.body.password);
  console.log(req.body);
  if (user.role == "Employee") {
    user.Employee.GroundID = req.body.GroundID;
    user.save(function (err) {
      if (err) {
        return res.status(404).json(err);
      }
      return res.status(200).json("Employee Created!");
    });
  }

  if (user.role != "Employee") {
    user.save(function (err) {
      if (err) {
        return res.status(404).json(err);
      }
      var token;
      token = user.generateJwt();
      res.status(200);
      res.json({
        token: token
      });
    });
  }
}

function login(req, res) {
  _passport2.default.authenticate("local", function (err, user, info) {
    var token;

    if (err) {
      return res.status(404).json(err);
    }

    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        token: token
      });
    } else {
      // User not found
      res.status(401).json(info);
    }
  })(req, res);
}

exports.default = { register: register, login: login };
module.exports = exports["default"];