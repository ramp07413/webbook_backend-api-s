const { catchAsyncErrors } = require("./catchAsyncErrors");
const { Errorhandle } = require("./errorMiddlewares");
const jwt = require('jsonwebtoken')
const User = require('../models/userModels')

const isAuthenticated = catchAsyncErrors(async(req, res, next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new Errorhandle("user is not authenticated.", 400))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id);
    next();
})

const isAuthorized =  (...roles)=>{
    return(req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return next(new Errorhandle(`user with this role ${req.user.role} not allowed to access this resource.`, 400))
        }
        next();
    }
    
}

module.exports = {isAuthenticated, isAuthorized}