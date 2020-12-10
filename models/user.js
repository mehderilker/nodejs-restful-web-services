const mongose = require('mongoose');
const validator = require('validator');


const userSchema = mongose.Schema({
    name : {
        type: String,
        required: true,
        trim: true,
        lowercase:true,
    },
    password: {
        type: String,
        required: true,
        minlenght: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain password')
            }
        }
    },
    email:{
        type: String,
        unique:true,
        required:true,
        minlenght: 7,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    }
})

const User = mongose.model('User', userSchema)

module.exports = User