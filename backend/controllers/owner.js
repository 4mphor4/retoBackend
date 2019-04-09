import mongoose from 'mongoose';
import User from '../models/user';

//  NOT needed as all details will be passed from ground.OwnerGround
// function getOwnerDetails(req, res){      
//     User.findOne({_id: req.payload._id}).exec((err, user) => {
//         if (err) {
//             return res.json({ 'success': false, 'message': 'Could not retrieve Owner.' });
//         }
//         return res.status(200).json({ 'success': true, 'message': 'Owner fetched successfully', user });
//     });
// }

// export default {getOwnerDetails}