"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require("./config/express");

var _express2 = _interopRequireDefault(_express);

var _env = require("./config/env");

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import cors from "cors";

_mongoose2.default.connect(_env2.default.db, { useNewUrlParser: true });

_mongoose2.default.connection.on("error", function () {
  throw new Error("unable to connect to database " + _env2.default.db);
});
_mongoose2.default.connection.on("disconnected", function () {
  console.log("Disconnected from " + _env2.default.db);
});
_mongoose2.default.connection.on("connected", function () {
  console.log("Connected to database " + _env2.default.db);
});
// app.use(cors());
if (_env2.default.env === "development") {
  _mongoose2.default.set("debug", true);
}

_express2.default.listen(8080 || _env2.default.port, "0.0.0.0", function () {
  console.log("app runnning on " + _env2.default.port + " (" + _env2.default.env + ")");
});

exports.default = _express2.default;
module.exports = exports["default"];