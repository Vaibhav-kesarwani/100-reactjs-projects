const mongoose= require('mongoose')
const {Schema}= mongoose;
const userSchema = new Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique: true,
    },
    address:{
        type:String,
    },
    gender:{
        type:String,

    },
    password:{
        type:String,
        require:true
    }
},{ timestamps: true })

module.exports=mongoose.model('User',userSchema);