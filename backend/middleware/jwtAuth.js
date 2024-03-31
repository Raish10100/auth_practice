const JWT = require('jsonwebtoken')

const jwtAuth = (req,res,next) => {

const token = (req.cookies && req.cookies.token) || null ;

if(!token){
    return res.status(400).json({
        success: false,
        message: "token is not available" 
    })
}

try {
    
    const payload = JWT.verify(token,process.env.SECRET);
    
    req.user = {id: payload.id, email: payload.email};
    
        next()

} catch(e) {
    return res.status(400).json({
        success: false,
        message: e.message
    })
}
}

module.exports = jwtAuth;