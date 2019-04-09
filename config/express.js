import express from "express";
import routes from "../backend/routes";
import bodyParser from "body-parser";
import logger from "morgan";
import passport from "passport";
import "../config/passport";
// import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ urlencoded: true, extended: false }));
app.use(logger("dev"));
// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize());

app.use("/api", routes);
// app.use(cors());
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// [SH] Catch unauthorised errors
app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401);
    res.json({ message: err.name + ": " + err.message });
  }
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

export default app;
