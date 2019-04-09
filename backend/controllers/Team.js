import Team from '../models/team';
import User from '../models/user';

function createTeam(req, res) {
    if (!req.payload._id) {
        res.status(401).json({ 'message': 'UnauthorizedError: private profile' });
    }
    var team = new Team();
    team.name = req.body.name;
    team.assignTeamCaptain(req.payload._id);
    team.save().then(team => {
        if (team) {
            User.findOneAndUpdate({ _id: req.payload._id }, { $push: { "Player.TeamID": team._id } }).exec(user => {
                return res.json({ 'success': true, 'message': 'Team created successfully!', user });
            })
        }
    })
        .catch(err => {
            if (err.name == 'MongoError' || err.code == 11000) {
                console.log(err);
                return res.status(401).json({ 'message': 'Team Already exists' });
            }
            return res.status(500).json(err);
        });
};

function ListTeam(req, res) {
    Team.find((err, teams) => {

        if (err) {
            return res.json({ 'success': false, 'message': 'Could not retrieve teams' })
        }
        return res.json({ 'success': true, 'message': 'Team list', teams })
    });
}
// , 'phoneNo', 'points', 'position'


function getTeamDetails(req, res) {
    console.log('in team edtails')
    Team.findOne({ _id: req.params['name'] })
        .populate({
            path:'players',
            select:'-salt -hash -Owner -Employee -role -Player.TeamID'
        })
        .exec((err, team) => {
            if (err) {
                return res.json({ 'success': false, 'message': 'Could not retrieve team details.' });
            }
            return res.json({ 'success': true, 'message': 'Team fetched successfully.', team });
        });
}



export default {
    createTeam,
    ListTeam,
    getTeamDetails
}