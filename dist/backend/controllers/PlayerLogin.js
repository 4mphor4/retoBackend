'use strict';

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// READ PLAYER

module.exports.getPlayerDetails = function (req, res) {
    //User.findOne({_id: req.payload._id}).exec((err, user) => {  
    _user2.default.findOne({ phoneNo: req.params['phoneNo'] }).exec(function (err, user) {
        if (err) {
            return res.json({ 'success': false, 'message': 'Could not retrieve Player.' });
        }
        return res.json({ 'success': true, 'message': 'Player fetched successfully', user: user });
    });
};

// UPDATE/EDIT PLAYER

module.exports.editPlayerProfile = function (req, res) {
    _user2.default.findOne({ phoneNo: req.params['phoneNo'] }).exec(function (err, user) {
        if (err) {
            return res.json({ 'success': false, 'message': 'Could not retrieve Player.' });
        }

        user.save(function (err, user) {
            if (err) {
                return res.status(404).json(err);
            }
            if (user) {
                //User.findOneAndUpdate({PhoneNo: req.params['PhoneNo']}, { $set: {name:'Aakash'} }).then((err, user) => {
                return res.json({ 'success': true, 'message': 'User Updated successfully!', user: user });
                // })
            }
        });
    });
};

//DELETE PLAYER (DISABLE)