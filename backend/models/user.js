import mongoose, { mongo } from "mongoose";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
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
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Team"
        }
      ],
      validate: [
        arrayLimit,
        "A player can only be a part of one team at a time."
      ]
    },
    requests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
      }
    ],

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
    GroundID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ground"
      }
    ],
    EmployeeID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  Employee: {
    GroundID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ground"
      }
    ],
    ChallengeID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge"
      }
    ]
  }
});

function arrayLimit(val) {
  return val.length <= 1;
}

UserSchema.methods.removeRequest = function(TeamID) {
  console.log("Team ID:", TeamID);
  var index = this.Player.requests.indexOf(TeamID);
  if (index > -1) {
    let x = this.Player.requests.splice(index, 1);
    console.log("value of splice return ", x);
  }
};

UserSchema.methods.addTeamToPlayer = function(teamID) {
  this.Player.TeamID.push(teamID);
  let length = this.Player.requests.length;
  this.Player.requests.splice(0, length);
};

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};

UserSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      phoneNo: this.phoneNo,
      role: this.role,
      exp: parseInt(expiry.getTime() / 1000)
    },
    "useFile"
  ); // TODO: make file with secret key.
};

module.exports = mongoose.model("User", UserSchema);
