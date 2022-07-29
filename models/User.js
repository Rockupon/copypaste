const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
const validator = require('validator');

const UserSchemer = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'please enter name'],
        minlength: 3,
        maxlength:50,
    },

    email: {
        type: String,
        required: [true,'please enter your email'],
        validate: {
            validator: validator.isEmail,
            message: 'please provide your correct email',
        },
    },

    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },

    role: {
        type: String,
        enum: ['employee','employer','admin'],
        default: 'employee'
    }
})

UserSchemer.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})

UserSchemer.methods.comparePassword = async function(inputPassword){
    const ismatch = await bcrypt.compare(inputPassword,this.password)
    return ismatch;
    // return ismatch = await bcrypt.compare(inputPassword,this.password)
}

module.exports = mongoose.model('User',UserSchemer);