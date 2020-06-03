const express  = require('express')
const UserContoller = require('./controllers/UserController')
const {auth}  = require('./middlewares/auth')
const router  = express.Router()

router.get('/api/auth' , auth , (req,res) => {
   return res.json({
      isAuth: true
   })
})

router.post('/api/register', UserContoller.register)
router.post('/api/login',UserContoller.login)
router.get('/api/logout',auth,UserContoller.logout)
module.exports = router