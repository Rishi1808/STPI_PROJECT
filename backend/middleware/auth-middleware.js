const jwt = require('jsonwebtoken');


const authMidlleware = (req, res, next) => {
    console.log("Auth Middleware");

    const authheader = req.headers.authorization;
    console.log(authheader);
    const token=authheader && authheader.split(' ')[1];
    if(!token){
        return res.status(401).json({
            satisfies:false,
            message:"Access Denied"});
    }
    try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
            console.log(decoded);

            req.userInfo=decoded;
            next();
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error,not able to verify token"
        });
    }
    




}


module.exports = authMidlleware;