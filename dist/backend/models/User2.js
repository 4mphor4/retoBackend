'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Entity Schema
function AbstractUserSchema() {
    _mongoose2.default.Schema.apply(this, arguments); //call super                                         
    this.add({ //add
        name: {
            type: String,
            required: true,
            trim: true
        },
        salt: String,
        hash: {
            type: String,
            required: true,
            trim: true
        },
        phoneNo: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            max: [10, 'No greater than required'],
            min: [10, 'No smaller than required']
        },
        email: {
            type: String,
            //required: true,
            trim: true
        },
        isPlayer: {
            type: Boolean,
            default: false
        },
        isOwner: {
            type: Boolean,
            default: false
        },
        isEmployee: {
            type: Boolean,
            default: false
        }
    });
}
//import extendSchema from 'mongoose-extend-schema';
;
_util2.default.inherits(AbstractUserSchema, _mongoose2.default.Schema);
var UserSchema = new AbstractUserSchema();

//Player Schema
var PlayerSchema = new AbstractUserSchema({
    teamID: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'Team'
    },
    points: {
        type: Number,
        default: '0'
    }
});

//Owner Schema
var OwnerSchema = new AbstractUserSchema({
    GroundID: [{
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'Ground'
    }],
    employeeID: [{
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'UserSchema'
    }]
});

//Employee Schema
var EmployeeSchema = new AbstractUserSchema({
    GroundID: [{
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'Ground'
    }],
    ChallengeID: [{
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'Challenge'
    }]
    /*Bookings:[{
            date: String,
            time: String
        }]*/
});

var User = _mongoose2.default.model('User', UserSchema); // our base model   
var Player = User.discriminator('Player', PlayerSchema); // our derived model (see discriminator)
var Owner = User.discriminator('Owner', OwnerSchema);
var Employee = User.discriminator('Employee', EmployeeSchema);

module.exports = {
    User: User,
    Player: Player,
    Owner: Owner,
    Employee: Employee
};