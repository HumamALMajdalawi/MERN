const express = require('express')
const cors  = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const router = require('./router')
require('./db/db')

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(router)



const PORT = 4000
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`))
