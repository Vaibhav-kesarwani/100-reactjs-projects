const {connectDB} = require("./lib/db")
const {register,login,getuser}= require("./lib/auth")
module.exports = {
  connectDB,
  register,
  login,
  getuser
};
