"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _crypto = require("crypto");

var _crypto2 = _interopRequireDefault(_crypto);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = new _mongoose2.default.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  salt: {
    type: String,
    private: true
  },
  hash: {
    type: String,
    required: true,
    trim: true,
    private: true
  },
  phoneNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    max: [10, "No greater than required"],
    min: [10, "No smaller than required"]
  },
  // email:{
  //     type: String,
  //   //required: true,
  //     trim: true
  // },
  role: {
    type: String,
    required: true
  },
  Player: {
    TeamID: {
      type: [{
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: "Team"
      }],
      validate: [arrayLimit, "A player can only be a part of one team at a time."]
    },
    requests: [{
      type: _mongoose2.default.Schema.Types.ObjectId,
      ref: "Team"
    }],

    points: {
      type: Number,
      default: "0"
    },
    area: {
      type: String,
      default: "-"
    },
    city: {
      type: String,
      default: "-"
    },
    position: {
      type: String,
      default: "-"
    },
    jerseyNo: {
      type: String,
      default: "-"
    }
  },
  Owner: {
    GroundID: [{
      type: _mongoose2.default.Schema.Types.ObjectId,
      ref: "Ground"
    }],
    EmployeeID: [{
      type: _mongoose2.default.Schema.Types.ObjectId,
      ref: "User"
    }]
  },
  Employee: {
    GroundID: [{
      type: _mongoose2.default.Schema.Types.ObjectId,
      ref: "Ground"
    }],
    ChallengeID: [{
      type: _mongoose2.default.Schema.Types.ObjectId,
      ref: "Challenge"
    }]
  }
});

function arrayLimit(val) {
  return val.length <= 1;
}

UserSchema.methods.removeRequest = function (TeamID) {
  console.log("Team ID:", TeamID);
  var index = this.Player.requests.indexOf(TeamID);
  if (index > -1) {
    var x = this.Player.requests.splice(index, 1);
    console.log("value of splice return ", x);
  }
};

UserSchema.methods.addTeamToPlayer = function (teamID) {
  this.Player.TeamID.push(teamID);
  var length = this.Player.requests.length;
  this.Player.requests.splice(0, length);
};

UserSchema.methods.setPassword = function (password) {
  this.salt = _crypto2.default.randomBytes(16).toString("hex");
  this.hash = _crypto2.default.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
};

UserSchema.methods.validPassword = function (password) {
  var hash = _crypto2.default.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
  return this.hash === hash;
};

UserSchema.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return _jsonwebtoken2.default.sign({
    _id: this._id,
    name: this.name,
    phoneNo: this.phoneNo,
    role: this.role,
    exp: parseInt(expiry.getTime() / 1000)
  }, "useFile"); // TODO: make file with secret key.
};

module.exports = _mongoose2.default.model("User", UserSchema);