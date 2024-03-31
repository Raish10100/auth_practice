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
    const userInfo = userModel(req.body); 
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

const signin = async (req,res,next) => {
    const { email,password } = req.body ;

    const user = await userModel.findOne({           //! Done mistake: forget to write await
        email                                          
    }).select('+password');


    if(!user || user.password !== password){
        res.status(400).json({
            success: false,
            message:  "Invalid credential"
        })
    }

    try {
        const token = user.jwtToken();

        user.password = undefined

        const cookieOption = {
            maxAge: 24*60*60*100,
            httponly: true 
        }


        res.cookie('token',token,cookieOption);

        res.status(200).json({
            success: true,
            data: user 
        })
    } catch(e) {
        res.status(400).json({
            success: false,
            message: e.message 
        })
    }
}

const getUser = async (req,res,next) => {
    const userId = req.user.id;

try {
    const user = await userModel.findById(userId);

    return res.status(200).json({
        success: true,
        data: user 
    })
} catch(e){
    return res.status(400).json({
        success: false,
        message : e.message 
    })
}


}

const logout = (req,res,next) => {
    
    try {

            const cookieOption = {
                expire: new Date(),
                httponly: true 
            }

            res.cookie('token',null,cookieOption);
            res.status(200).json({
                success: true,
                message: "Log Out"
            })
        } catch(e) {
            res.status(400).json({
                success: false,
                message: e.message 
            })
        }
}

module.exports = {
    signup,
    signin,
    getUser,
    logout
}