const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const moment = require('moment')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        required: true,
        type: String,
        maxlength: 50
    },
    email:{
        required: true,
        type: String,
        trim: true,
        unique:1
    },
    password:{
        type: String,
        required: true
    },
    image:String,
    token:{
        type:String
    },
    tokenExp:{
        type: Number
    }
})

userSchema.pre('save', function(next){
    let user = this

    if(user.isModified('password')){
        bcrypt.genSalt(10, function(err, salt){
            if(err) return next(err)

            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    }else{
        next()
    }
})

userSchema.methods.comparePassword = function(password,cb){
    let user = this
    bcrypt.compare(password,user.password,(err,isMatch) => { 
        if(err) return cb(err)
        cb(null,isMatch)
    })
} 

userSchema.methods.generateToken = function(cb){
    let user = this
    let token = jwt.sign(user._id.toHexString(),'secret')
    let onHour = moment().add(1,'hour').valueOf()

    user.tokenExp = onHour
    user.token  = token
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null,user)
    })
}

userSchema.statics.findByToken = function(token, cb){
    let user = this
    jwt.verify(token,'secret',function(err,decode){
        user.findOne({'_id':decode,"token":token},function(err,user){
            if(err) return cb(err)
            cb(null,user)
        })
    })
}

const User = mongoose.model('User',userSchema)

module.exports = User