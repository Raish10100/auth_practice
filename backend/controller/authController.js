const userModel = require('../model/userSchema')
const emailValidater = require('email-validator')

const signup = async (req,res,next) => {

    const { name,email,password,confirmPassword } = req.body; 
    console.log(name,email,password,confirmPassword);

if(!name || !email ||!password || !confirmPassword){
    return res.status(400).json({
        success: false,
        message : "Every field is required"
    })
}

const validEmail = emailValidater.validate(email);
if(!validEmail){
    return res.status(400).json({
        success: false,
        message: "Please enter valid email id"
    })
}

if(password !== confirmPassword){
    return res.status(400).json({
        success: false,
        message: "password and confirm password is not same"
    })
}


try{
    const userInfo = userModel(req.body);//! check here----------------
    const result = await userInfo.save()

    return res.status(200).json({
        success : true,
        data : result
    })
}
catch(e){

if(e.code === 11000){
    return res.status(400).json({
        success: false,
        message: "This account already exists"
    })
}

    return res.status(400).json({
        success : false,
        data : e.message
    })
}

}


module.exports = {
    signup
}