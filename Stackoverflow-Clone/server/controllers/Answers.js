import mongoose from "mongoose";
import Questions from '../models/Questions.js'
export const postAnswer =async(req,res)=>{
    const{id:_id}=req.params;
    const{noOfAnswers,answerBody,userAnswered}=req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("question unavailable")
    }
    updateNoofQuestions(_id,noOfAnswers)
    try {
        const updatedQuestion = await Questions.findByIdAndUpdate(_id,{$addToSet:{'answer':[{answerBody,userAnswered,userId:req.userId}]}})
        req.status(200).json(updatedQuestion)
    } catch (error) {
        res.status(400).json(error  )
        
    }
}

const updateNoofQuestions =async(_id,noOfAnswers)=>{
    try {
        await Questions.findByIdAndUpdate(_id,{$set:{'noOfAnswers':noOfAnswers}})
    } catch (error) {
        console.log(error)
    }
}