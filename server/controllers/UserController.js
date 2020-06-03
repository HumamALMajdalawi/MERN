const User = require('../models/User')

const UserContoller = {
    register : (req,res) => {
        const user  = new User(req.body)
        user.save((err,user) => {
            if(err) console.log(err.message)
            return res.status(200).json({
                success: true
            })
                })

    },

    login: (req,res) => {
        console.log("req body login: ",req.body);
        
        User.findOne({email : req.body.email},(err,user) => {
            if(!user) return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"             
            })
            console.log('user controller : ', user)
            user.comparePassword(req.body.password,(err,isMatch) => {
                if(!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: "Wrong Password"             
                })
                user.generateToken((err,user) => {
                    if(err) return res.status(400).send(err)
                    console.log("user controller token: ", user.token)
                    res.setHeader('Cache-Control', 'private')
                    res.cookie("w_authExp",user.tokenExp,{ httpOnly: true })
                    res.cookie('w_auth',user.token,{ httpOnly: true })
                              res.status(200)
                                .json({
                                    loginSuccess: true,
                                    userID: user._id,
                                    token: user.token
                                })  
                }) 
            })
        })
    },
   
    logout: (req,res) => {
        console.log("logout req body: ",req.user)
        User.findOneAndUpdate({_id:req.user._id},{token:"",tokenExp:""},
        {useFindAndModify: false}, (err, user) =>{
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            });
        })
    }
}

module.exports = UserContoller