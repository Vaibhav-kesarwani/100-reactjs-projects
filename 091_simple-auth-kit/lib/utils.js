const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const JWT_SERECT='fd*x$hT&nB#'
async function hashPassword(password) {
    console.log(password)
    const salt= await bcrypt.genSalt(12)
    const hashPassword= await bcrypt.hash(password,salt)
    return hashPassword;    
}
async function comparepassword(raw,haspass) {
    const chakepass= await bcrypt.compare(raw,haspass)
    if(chakepass){
        return true
    }
    return false
}
async function fecthuser(authtoken) {
    try {
        if(!authtoken){
            return false
        }
        const data= jwt.verify(authtoken,JWT_SERECT)
        return data
        
    } catch (error) {
        console.log(error)
        return false
        
    }
}
module.exports={hashPassword,comparepassword,fecthuser}