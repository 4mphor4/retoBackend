'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extendSchema = require('mongoose-extend-schema');
//import extendSchema from 'mongoose-extend-schema';

// const UserSchema = new mongoose.Schema({    
//     name:{
//         type: String,
//         required: true,
//         trim: true
//     },    
//     salt: String,
//     hash: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     phoneNo:{
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         max: [10,'No greater than required'],
//         min:[10,'No smaller than required']
//     },
//     email:{
//         type: String,
//       //required: true,
//         trim: true
//    },

//    isPlayer:{
//         type:Boolean,
//         default:false
//     },
//     player:{
//         teamID:{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Team'
//         },
//         points:{
//             type: Number,  
//             default: '0'
//         }
//     },   
//     isOwner:{
//         type:Boolean,
//         default:false
//     },
//     owner:{
//         GroundID:[{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Ground'
//         }], 
//         employeeID:[{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User'   
//         }]
//     },    
//     isEmployee:{
//         type:Boolean,
//         default:false
//     },
//     employee:{
//         GroundID:[{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Ground',
//         }],
//         ChallengeID:[{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Challenge',
//         }]
//     /*Bookings:[{
//             date: String,
//             time: String
//         }]*/
//     }    
// });            

var UserSchema = new _mongoose2.default.Schema({
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

var PlayerSchema = extendSchema(UserSchema, {
    teamID: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'Team'
    },
    points: {
        type: Number,
        default: '0'
    }
});

var OwnerSchema = extendSchema(UserSchema, {
    GroundID: [{
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'Ground'
    }],
    employeeID: [{
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

var EmployeeSchema = extendSchema(UserSchema, {
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

UserSchema.methods.setPassword = function (password) {
    this.salt = _crypto2.default.randomBytes(16).toString('hex');
    this.hash = _crypto2.default.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function (password) {
    var hash = _crypto2.default.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return _jsonwebtoken2.default.sign({
        _id: this._id,
        name: this.name,
        phoneNo: this.phoneNo,
        exp: parseInt(expiry.getTime() / 1000)
    }, "useFile"); // TODO: make file with secret key.
};

module.exports = _mongoose2.default.model("User", UserSchema);
module.exports = _mongoose2.default.model("Player", PlayerSchema);
module.exports = _mongoose2.default.model("Owner", OwnerSchema);
module.exports = _mongoose2.default.model("Employee", EmployeeSchema);