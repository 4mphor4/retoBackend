import User from "../models/user";
import Employee from "./Employee";
import passport from "passport";

// CREATE USER

function register(req, res) {
  var user = new User();

  user.name = req.body.userName;
  user.phoneNo = req.body.phoneNo;
  // user.email = req.body.email;
  user.role = req.body.role;
  user.setPassword(req.body.password);
  console.log(req.body);
  if (user.role == "Employee") {
    user.Employee.GroundID = req.body.GroundID;
    user.save(function(err) {
      if (err) {
        return res.status(404).json(err);
      }
      return res.status(200).json("Employee Created!");
    });
  }

  if (user.role != "Employee") {
    user.save(function(err) {
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
  passport.authenticate("local", function(err, user, info) {
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

export default { register, login };
