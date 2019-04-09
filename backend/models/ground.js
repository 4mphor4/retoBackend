import mongoose from 'mongoose';

const GroundSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },  
    location:{
        address: {
            type: String,
            required: true
        },
        latitude:{
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true,
        }
    },  
    startTime:{
        type: String,
        required: true
    }, 
    endTime:{
        type: String,
        required: true
    },
    timeSlots:[{
        type: String,
        required: true
    }],
    groundBooked:{
        date:{
            type:String,
        },
        bookingTime:[{
            type:String
        }]
    },
    cost:{
        type: String,
        required: true
    },
    numberOfPlayers:{
        type: Number,
        required: true,
        max: [22,'No greater than required']
    },
    amenities:[{
        type: String      
    }]
});


 GroundSchema.methods.convert_to_24h = function(time_str) {
    // Convert a string like 10:05:23 PM to 24h format, returns like [22,5,23]
    console.log(time_str);
    var time = time_str.match(/(\d+):(\d+):(\d+) (\w)/);
    console.log(time);
    var hours = Number(time[1]);
    // var minutes = Number(time[2]);
    // var seconds = Number(time[3]);
    var meridian = time[4].toLowerCase();

    if (meridian == 'p' && hours < 12) {
      hours += 12;
    }
    else if (meridian == 'a' && hours == 12) {
      hours -= 12;
    }
     return hours;
  };

  GroundSchema.methods.createTimeSlots = function(startHr, endHr) {
    let timeslots = []; 
    for(let i=startHr; i<endHr; i++){
        if(i<10){
            timeslots.push('0' + String((i)+':00' + '-' + (i+1) + ':00'));  
        }
        else{
          timeslots.push(String((i)+':00' + '-' + (i+1) + ':00'));  
        }
      }
    return timeslots;
  }

module.exports = mongoose.model('Ground',GroundSchema);

    