import Ground from '../models/ground';
import User from '../models/user';

function createGround(req, res) {
    if (!req.payload._id) {
        res.status(401).json({'message': 'UnauthorizedError: private profile'});
    }
    var ground = new Ground();
    ground.name = req.body.name;
    ground.location = req.body.location;
    ground.startTime = req.body.startTime;
    ground.endTime = req.body.endTime;
    ground.amenities = req.body.amenities;
    ground.location.address = req.body.location.address;
    ground.location.longitude = req.body.location.lng;
    ground.location.latitude = req.body.location.lat;
    ground.cost = req.body.cost;
    ground.numberOfPlayers = req.body.numberOfPlayers;
    
    ground.timeSlots = (ground
                          .createTimeSlots(ground.convert_to_24h(req.body.startTime), ground.convert_to_24h(req.body.endTime)));
    
    ground.save()
    .then (saved => {      
        if(saved){
            console.log(saved);
            User.findOneAndUpdate({_id: req.payload._id}, {$push: {"Owner.GroundID": saved._id}}).exec(user => {
                return res.json({
                    success: true,
                    message: "Ground created successfully!", user
                });
            });

        }
    })
    .catch(err => {        
        return res.json ({
            success: false,
            message: "Error while saving ground details", err
        })
    });        
}

function OwnerGround(req, res){   
    if (!req.payload._id) {
        res.status(401).json({
          message: "UnauthorizedError: private profile"
        });
      }    
    User.findOne({_id: req.payload._id }, '-salt -hash -Player -Employee')
    .populate("Owner.GroundID")
    .exec((err, grounds) => {
        if(err){
            console.log (err);
            return res.json({
                success: false,
                message: "Could not retrieve owner owned grounds."
            });
        }        
        return res.json({
            success: true,
            message: "Owner Grounds fetched Successfully", grounds
        });
    });
}

function ListGround(req, res){    
    Ground.find((err, grounds) => {        
        if(err){
            return  res.json({                
                'success': false,
                'message': 'Could not retrieve grounds'
            })
        }    
        return res.json({            
            'success': true,
            'message': 'Ground list', grounds
        })        
    });
}

function getGroundDetails (req, res){     
    Ground.findOne({ _id: req.params['name'] }).exec((err, ground) => {
        if (err) {
            return res.json({'success': false, 'message': 'Could not retrieve ground details.'});
        }        
        User.findOne({"Employee.GroundID": req.params['name']}, '-salt -hash').exec((err, user) => {
            if (err) {
                return res.json({'success': false, 'message': 'Could not retrieve Employee details.'});
            }         
            return res.json({'success': true, 'message': 'Ground fetched successfully.', ground, user});
        })    
    }); 
}

export default {
    createGround,
    OwnerGround,
    ListGround,
    getGroundDetails
}