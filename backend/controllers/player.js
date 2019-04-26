import User from "../models/user";
import Team from "../models/team";
import { userInfo } from "os";

// READ PLAYER

function getPlayerDetails(req, res) {
  User.findOne({ _id: req.payload._id }, "-salt -hash -Owner -Employee")
    .populate("Player.TeamID")
    .populate({ path: "Player.requests", select: "name" })
    .exec((err, player) => {
      if (err) {
        return res.json({
          success: false,
          message: "Could not retrieve Player."
        });
      }
      console.log(player);
      return res
        .json({ success: true, message: "Player Details", player })
        .status(200);
    });
}

// UPDATE/EDIT PLAYER

function updatePlayer(req, res) {
  console.log(`req.body : ${JSON.stringify(req.body)}`);
  User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { Player: req.body.Player } },
    { new: true },
    (err, user) => {
      if (err) {
        return res.json({
          success: false,
          message: "Could not retrieve Player."
        });
      } else {
        return res.json({
          success: true,
          message: "User Updated successfully!",
          user
        });
      }
    }
  );
}

// PLAYER LIST

function listPlayers(req, res) {
  User.find({ role: "Player" }, "-salt -hash -Owner -Employee")
    .populate("Player.TeamID")
    .exec((err, Players) => {
      if (err) {
        return res.json({
          success: false,
          message: "Could not retrieve Players"
        });
      }
      return res.json({ success: true, message: "Player list", Players });
    });
}

function joinRequest(req, res) {
  User.findOneAndUpdate(
    { _id: req.body.playerID },
    { $addToSet: { "Player.requests": req.body.teamID } }
  ).exec(user => {
    return res.json({
      success: true,
      message: "Request Sent to User!",
      user
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
    Team.findOneAndUpdate(
      { _id: req.body.team },
      { $push: { players: req.body.player } }
    ).exec((err, x) => {
      if (err) {
        console.log(err);
      }
      User.findOne({ _id: req.body.player }).exec((err, user) => {
        // console.log(user);

        if (err) {
          console.log(err);
        } else {
          console.log("User id before save:", user._id);
          let tempUser = new User(user);
          // console.log(tempUser);
          tempUser.addTeamToPlayer(x._id);

          tempUser.save((err, xuser) => {
            if (err) {
              console.log(err);
            }
            if (xuser) {
              console.log(`user id after save ${xuser._id}`);
              return res.json({
                success: true,
                message: " Team added To Player successfully",
                xuser
              });
            }
          });
        }
      });
    });
  } else if (req.body.request === false) {
    console.log("in false request");
    User.findOne({ _id: req.body.player }).exec((err, user) => {
      if (err) {
        console.log(err);
      } else {
        let tempUser = new User(user);
        tempUser.removeRequest(req.body.team);
        tempUser.save((err, newUser) => {
          if (err) {
            console.log(err);
          } else {
            return res.json({
              success: true,
              message: "Request Removed",
              newUser
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

export default {
  getPlayerDetails,
  updatePlayer,
  listPlayers,
  joinRequest,
  joinTeam,
  playerWorking
};
