const jwt = require('jsonwebtoken')
exports.auth = (req, res, next) => {
    const authHeader = req.get('Authorization')
    if(!authHeader){
        console.log('3')
        const error = new Error('Not Authenticated')
        error.statusCode = 401
        throw error
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, 'secretkey')
        console.log('1')
        console.log(decodedToken.userID)
    }catch(err){
        console.log('2')
        err.statusCode = 500;
        throw err;
    }
    if(!decodedToken){
        console.log('4')
        const error = new Error('Not authenticated')
        error.statusCode = 401
        throw error
    }
    req.userID = decodedToken.userID
    req.role = decodedToken.role
    next()
}