import User from '../models/user';
import Ground from './ground';
import Challenge from './Challenge';

// UPDATE/EDIT Employee

function updateEmployee (req, res){   
    User.findOneAndUpdate ({phoneNo: req.params.phoneNo}, {$set: {Employee: req.body}}, {new: true}, (err, employee) => {
        if (err){
            return res.json ({ 'success': false, 'message': 'Could not retrieve Employee.'});
        }   
        else {
            return res.json ({ 'success': true, 'message': 'User Updated successfully!', employee});
        }
    });
}


//ADD NEW GROUND
function addGround (req, res){   
    console.log ('Add Ground'); 
    if (!req.payload._id) {
        res.status(401).json({'message': 'UnauthorizedError: private profile'});
    }
    User.findOneAndUpdate({_id: req.payload._id}, {$push: {"Employee.GroundID": req.body.GroundID}}).exec((err, user) => {
        if(err){
            return res.json({success: false, message: "Could not add ground to employee."});
        }        
        return res.json({success: true, message: "Ground added to employee successfully", user});
    })
    .catch(err =>{
        if(err.name =='MongoError' || err.code == 11000){
            return res.status(401).json({'message': 'Ground already added to the employee'});
        }
        return res.status(500).json(err);
    });
}


//ADD NEW CHALLENGE
function addChallenge (req, res){   
    console.log ('Add Challenge'); 
    if (!req.payload._id) {
        res.status(401).json({'message': 'UnauthorizedError: private profile'});
    }
    User.findOneAndUpdate({_id: req.payload._id}, {$push: {"Employee.ChallengeID": res.body.Employee.ChallengeID}}).exec((err, user) => {
        if(err){
            return res.json({success: false, message: "Could not add challenge to employee."});
        }        
        return res.json({success: true, message: "Challenge added to employee successfully", user});
    })
    .catch(err =>{
        if(err.name =='MongoError' || err.code == 11000){
            return res.status(401).json({'message': 'Challenge already assigned to the employee'});
        }
        return res.status(500).json(err);
    });
}

export default {
    updateEmployee,
    addGround,
    addChallenge
}