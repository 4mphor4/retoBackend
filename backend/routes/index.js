import express from "express";
import jwt from "express-jwt";
import ctrlAuth from "../controllers/authenticate";
import ctrlPlayer from "../controllers/player";
import ctrlOwner from "../controllers/owner";
import ctrlGround from "../controllers/ground";
import ctrlTeam from "../controllers/Team";
import ctrlEmployee from "../controllers/Employee";
import ctrlChallenge from "../controllers/Challenge";

const router = express.Router();
const auth = jwt({
  secret: "useFile",
  userProperty: "payload"
});

//REGISTER AND LOGN
router.post("/register", ctrlAuth.register);
router.post("/login", ctrlAuth.login);

//PLAYER
router.get("/player/list", ctrlPlayer.listPlayers);
router.get("/player/:phoneNo", auth, ctrlPlayer.getPlayerDetails);
router.put("/player/edit/:id", ctrlPlayer.updatePlayer);
// auth,
router.post("/player/requestPlayer", auth, ctrlPlayer.joinRequest);
router.post("/player/teamRequest", auth, ctrlPlayer.joinTeam);
router.post("/player/isworking/:id", auth, ctrlPlayer.playerWorking);

//OWNER
// router.get('/owner/:phoneNo',auth, ctrlOwner.getOwnerDetails);

//GROUND
router.get("/ground/list", ctrlGround.ListGround);
router.post("/ground/create", auth, ctrlGround.createGround);
router.get("/owner/:phoneNo", auth, ctrlGround.OwnerGround);
router.get("/ground/:name", auth, ctrlGround.getGroundDetails);

//TEAM
router.get("/team/list", ctrlTeam.ListTeam);
router.post("/team/create", auth, ctrlTeam.createTeam);
router.get("/team/:name", auth, ctrlTeam.getTeamDetails);

//EMPLOYEE
router.post("/employee/addGround", auth, ctrlEmployee.addGround);
router.post("/employee/addChallenge", auth, ctrlEmployee.addChallenge);
router.post("/employee/edit/:phoneNo", auth, ctrlEmployee.updateEmployee);

//Challenge
router.post("/challenge/create/:id", auth, ctrlChallenge.createChallenge);

router.get("/api-status", (req, res) => {
  res.json({
    status: "ok"
  });
});

module.exports = router;
