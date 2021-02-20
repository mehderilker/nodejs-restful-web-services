const mongose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

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
    },
    tokens:[{
        token:{
            type: String,
            required : true
        }
    }]
})

userSchema.methods.generateAuthToken = async function() {
    const user = this

    const token =  jwt.sign({_id : user._id.toString()},'devToken')
    
    user.tokens = user.tokens.concat({token})

    await user.save()
    return token
}

userSchema.pre('save',  async function (next){
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

const User = mongose.model('User', userSchema)


module.exports = User