const mongoose = require('mongoose');

const placeOfResident = mongoose.Schema({

    country:{
      type: String,
      required: [true, 'Please provide company country name'],
    },
  
    provices: {
      type: String,
      required: [true, 'Please provide company provices name'],
    },
  
    city: {
      type: String,
      required: [true, 'Please provide company city name'],
    }
  })

const jobschema = new mongoose.Schema({

    position: {
        type: String,
        required: [true, 'Please provide position'],
        maxlength: 100,
      },
    
    company: {
        type: String,
        required: [true,'please enter your company name'],
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },

    // location: [placeOfResident],

    country:{
        type: String,
        required: [true, 'Please provide company country name'],
      },
    
    provices: {
        type: String,
        required: [true, 'Please provide company provices name'],
      },
    
    city: {
        type: String,
        required: [true, 'Please provide company city name'],
      },

    prices: {
        type: String,
        required: [true, 'Please provide company city name'],
    },

    description: {
        type: String,
        required: [true,'please add information '],
        maxlength: [20000, 'Description can not be more than 20000 characters'],
    },
    
    timePeriod: {
        type: String,
        enum: ['Full-time', 'Temporary', 'pending'],
        default: 'pending',
      },
    
    status: {
        type: String,
        enum: ['looking', 'Temporary', 'pending'],
        default: 'pending',
      },

      boost: {
        type: Number,
        
      }
    


},
{
    timestamps: true,
},
);

module.exports = mongoose.model('Jobs', jobschema);