import mongoose from 'mongoose';
import User from './user';

const TeamSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },                                                     
    captain:{   //TODO: Creater of the team should be the captian.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    players:[{  //Function for the captan to be able to add players
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        max: [15,'No greater than required'],
    }],
    matchesPlayed:{
        type: Number,
        default: 0 
    },
    wins:{
        type: Number,
        default: 0 
    },
    losses:{
        type: Number,
        default: 0 
    },
    rank:{
        type: Number,
        default: 0 
    }
});

TeamSchema.methods.assignTeamCaptain = function (playerID) {   
    this.captain = playerID;
    this.addPlayertoTeam(playerID);
};
  
TeamSchema.methods.addPlayertoTeam = function (playerID) {
    this.players.push (playerID);
};



module.exports = mongoose.model('Team', TeamSchema);