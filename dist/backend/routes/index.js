"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _expressJwt = require("express-jwt");

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _authenticate = require("../controllers/authenticate");

var _authenticate2 = _interopRequireDefault(_authenticate);

var _player = require("../controllers/player");

var _player2 = _interopRequireDefault(_player);

var _owner = require("../controllers/owner");

var _owner2 = _interopRequireDefault(_owner);

var _ground = require("../controllers/ground");

var _ground2 = _interopRequireDefault(_ground);

var _Team = require("../controllers/Team");

var _Team2 = _interopRequireDefault(_Team);

var _Employee = require("../controllers/Employee");

var _Employee2 = _interopRequireDefault(_Employee);

var _Challenge = require("../controllers/Challenge");

var _Challenge2 = _interopRequireDefault(_Challenge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var auth = (0, _expressJwt2.default)({
  secret: "useFile",
  userProperty: "payload"
});

//REGISTER AND LOGN
router.post("/register", _authenticate2.default.register);
router.post("/login", _authenticate2.default.login);

//PLAYER
router.get("/player/list", _player2.default.listPlayers);
router.get("/player/:phoneNo", auth, _player2.default.getPlayerDetails);
router.put("/player/edit/:id", _player2.default.updatePlayer);
// auth,
router.post("/player/requestPlayer", auth, _player2.default.joinRequest);
router.post("/player/teamRequest", auth, _player2.default.joinTeam);
router.post("/player/isworking/:id", auth, _player2.default.playerWorking);

//OWNER
// router.get('/owner/:phoneNo',auth, ctrlOwner.getOwnerDetails);

//GROUND
router.get("/ground/list", _ground2.default.ListGround);
router.post("/ground/create", auth, _ground2.default.createGround);
router.get("/owner/:phoneNo", auth, _ground2.default.OwnerGround);
router.get("/ground/:name", auth, _ground2.default.getGroundDetails);

//TEAM
router.get("/team/list", _Team2.default.ListTeam);
router.post("/team/create", auth, _Team2.default.createTeam);
router.get("/team/:name", auth, _Team2.default.getTeamDetails);

//EMPLOYEE
router.post("/employee/addGround", auth, _Employee2.default.addGround);
router.post("/employee/addChallenge", auth, _Employee2.default.addChallenge);
router.post("/employee/edit/:phoneNo", auth, _Employee2.default.updateEmployee);

//Challenge
router.post("/challenge/create/:id", auth, _Challenge2.default.createChallenge);

router.get("/api-status", function (req, res) {
  res.json({
    status: "ok"
  });
});

module.exports = router;