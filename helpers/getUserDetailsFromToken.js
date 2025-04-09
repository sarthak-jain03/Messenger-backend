const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')

const getUserDetailsFromToken = async(token)=>{
    
    if(!token){
        return {
            message : "session out",
            logout : true,
        }
    }

    const decode = await jwt.verify(token,process.env.JWT_SECRETKEY)
    
    // IF U WANT TO HIDE OR DONT WANT TO SHOW ANY FIELD (LIKE PASSWORD), JUST USE .SELECT(-{THATFIELD})
    const user = await UserModel.findById(decode.id).select('-password')

    return user
}

module.exports = getUserDetailsFromToken