import mongoose from 'mongoose';

const ChallengeSchema = new mongoose.Schema({
    challengeCreate:{       
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    challengeAccept:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    groundID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ground'
    },
    membersTeam1:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    membersTeam2:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    date:{
        type: String,
        required: true
    },  
    time:{
        type: String,
        required: true
    },
    winner:{       
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },

    team1Payment:{
        type:Boolean,
        default:false
    },

    team2Payment:{
        type:Boolean,
        default:false
    },

    isEnabled:{
        type:Boolean,
        default:false
    }
});

ChallengeSchema.methods.setEnable = function(team1Payment, team2Payment){  
    if (team1Payment==true && team2Payment==true){
        Challenge.isEnabled = true;
    }
}

module.exports= mongoose.model('Challenge', ChallengeSchema);

