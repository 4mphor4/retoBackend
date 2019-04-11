"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var env = process.env.PORT || "development";
var config = require("./" + env);

exports.default = config;
module.exports = exports["default"];