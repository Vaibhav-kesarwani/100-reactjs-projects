import mongoose from 'mongoose'


const QuesitionSchema = mongoose.Schema({
    questionTitle:{type:String ,required:"Questions must have a title"},
    questionBody:{type:String ,required:"Questions must have Body"} ,
    questionTag:{type: [String ],required:"Questions must have a tags"}, 
    noOfAnswers:{type:Number,default :0},
    upVotes:{type:[String],default:[]},
    downVotes:{type:[String],default:[]},
    userPosted:{type:String ,required:"Questions must have an author"},
    userId:{type:String},
    askedOn:{type:Date,default:Date.now},
    answer:[{
        answerBody:{type:String},
        userAnswered:{type:String},
        userId:{type:String},
        answeredOn:{type:Date ,default:Date.now},
    }] 
})

export default mongoose.model("Question",QuesitionSchema)