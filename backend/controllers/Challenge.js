import User from '../models/user';
import Ground from './ground';
import Challenge from '../models/challenge';

function createChallenge(req, res) {
    console.log(req.body);
    console.log(req.params.id);
    if (!req.payload._id) {
        res.status(401).json({'message': 'UnauthorizedError: private profile'});
    }
    // Store data in challenge
    let challenge = new Challenge();
    challenge.challengeCreate = req.params.id;
    challenge.groundID = req.body.groundID;
    challenge.date = req.body.date;
    challenge.time = req.body.time;
    challenge.membersTeam1 = req.body.Players.id;
    challenge.save().then(challenge => {
        if(challenge) {
            return res.status(200).json({ 'success': true, 'message': 'Challenge created successfully!', challenge });
        }
    })
    .catch(err => {
        if (err.name == 'MongoError' || err.code == 11000) {
            console.log(err);
            return res.status(401).json({ 'message': 'Backend Error' });
        }
        return res.status(500).json(err);
    });

    // ground boooked date and time

    // add challenge to employee page
}

export default {
    createChallenge
}