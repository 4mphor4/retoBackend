"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

var _team = require("../models/team");

var _team2 = _interopRequireDefault(_team);

var _os = require("os");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// READ PLAYER

function getPlayerDetails(req, res) {
  _user2.default.findOne({ _id: req.payload._id }, "-salt -hash -Owner -Employee").populate("Player.TeamID").populate({ path: "Player.requests", select: "name" }).exec(function (err, user) {
    if (err) {
      return res.json({
        success: false,
        message: "Could not retrieve Player."
      });
    }
    console.log(user);
    return res.json({
      success: true,
      // message: "Player fetched successfully", get should not have a message body
      user: user
    });
  });
}

// UPDATE/EDIT PLAYER

function updatePlayer(req, res) {
  console.log("req.body : " + JSON.stringify(req.body));
  _user2.default.findOneAndUpdate({ _id: req.params.id }, { $set: { Player: req.body.Player } }, { new: true }, function (err, user) {
    if (err) {
      return res.json({
        success: false,
        message: "Could not retrieve Player."
      });
    } else {
      return res.json({
        success: true,
        message: "User Updated successfully!",
        user: user
      });
    }
  });
}

// PLAYER LIST

function listPlayers(req, res) {
  _user2.default.find({ role: "Player" }, "-salt -hash -Owner -Employee").populate("Player.TeamID").exec(function (err, Players) {
    if (err) {
      return res.json({
        success: false,
        message: "Could not retrieve Players"
      });
    }
    return res.json({ success: true, message: "Player list", Players: Players });
  });
}

function joinRequest(req, res) {
  _user2.default.findOneAndUpdate({ _id: req.body.playerID }, { $addToSet: { "Player.requests": req.body.teamID } }).exec(function (user) {
    return res.json({
      success: true,
      message: "Request Sent to User!",
      user: user
    });
  });
}

function joinTeam(req, res) {
  console.log(req.body);
  if (!req.payload._id) {
    res.status(401).json({
      message: "UnauthorizedError: Pleaes relogin!"
    });
  }
  if (req.body.request === true) {
    _team2.default.findOneAndUpdate({ _id: req.body.team }, { $push: { players: req.body.player } }).exec(function (err, x) {
      if (err) {
        console.log(err);
      }
      _user2.default.findOne({ _id: req.body.player }).exec(function (err, user) {
        // console.log(user);

        if (err) {
          console.log(err);
        } else {
          console.log("User id before save:", user._id);
          var tempUser = new _user2.default(user);
          // console.log(tempUser);
          tempUser.addTeamToPlayer(x._id);

          tempUser.save(function (err, xuser) {
            if (err) {
              console.log(err);
            }
            if (xuser) {
              console.log("user id after save " + xuser._id);
              return res.json({
                success: true,
                message: " Team added To Player successfully",
                xuser: xuser
              });
            }
          });
        }
      });
    });
  } else if (req.body.request === false) {
    console.log("in false request");
    _user2.default.findOne({ _id: req.body.player }).exec(function (err, user) {
      if (err) {
        console.log(err);
      } else {
        var tempUser = new _user2.default(user);
        tempUser.removeRequest(req.body.team);
        tempUser.save(function (err, newUser) {
          if (err) {
            console.log(err);
          } else {
            return res.json({
              success: true,
              message: "Request Removed",
              newUser: newUser
            });
          }
        });
      }
    });
  } else {
    res.status(304).json({
      message: "Player-Team request Failed"
    });
  }
}

function playerWorking() {
  console.log("player is working");
}

exports.default = {
  getPlayerDetails: getPlayerDetails,
  updatePlayer: updatePlayer,
  listPlayers: listPlayers,
  joinRequest: joinRequest,
  joinTeam: joinTeam,
  playerWorking: playerWorking
};
module.exports = exports["default"];