const express =  require('express');
const app = express();
const authRoute = require('./router/authRoute');
//?-L2----------👇👇
const databaseconnect = require('./config/databaseConnection');
const cookieParser = require('cookie-parser');
//?-L2----------👆👆


//?-L2----------👇👇
databaseconnect()
//?-L2----------👆👆


app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoute)

app.use('/',(req,res,next) => {
    res.status(200).json({data : "JWTauth server"})
})


module.exports = app ;