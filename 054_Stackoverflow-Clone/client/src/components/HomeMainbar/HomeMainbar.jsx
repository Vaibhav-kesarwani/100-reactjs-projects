import React from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import './HomeMainbar.css'
import QuestionList from './QuestionList'
import { useSelector } from 'react-redux'
const HomeMainbar = () => {
    const navigate= useNavigate()
    const user= 1;
    const Checknull = () => {
        if (user===null){
            alert("Login or SignUp to Ask a Question")
            navigate('/Auth') 
        }else{
            navigate('/AskQuestions')
        }
    }
    

    const questionsList=useSelector(state=>state.questionsReducer)
    console.log(questionsList)
    
    // var questionsList=[{
    //     _id:'1',
    //     upVotes:3,
    //     downVotes:2,
    //     noOfAnswers:2,
    //     questionTitle:"What is a function?",
    //     questionBody:"It meant to be",
    //     questionTags:["java","node.js","react.js","mongodb"],
    //     userPosted:"Aravinth",
    //     userId:1,

    //     askedOn:"June1",
    //     answer:[{
    //         answerBody:"Answer",
    //         userAnswered:"Aravinth",
    //         answeredOn:"Jan2",
    //         userId:"2"
    //     }]
    // },{
    //     _id:'2',
    //     upVotes:4,
    //     downVotes:2,
    //     noOfAnswers:0,
    //     questionTitle:"What is a function of HTML?",
    //     questionBody:"It meant to be",
    //     questionTags:["java","node.js","react.js","mongodb"],
    //     userPosted:"Aravinth",
    //     userId:1,

    //     askedOn:"June1",
    //     answer:[{
    //         answerBody:"Answer",
    //         userAnswered:"Aravinth",
    //         answeredOn:"Jan2",
    //         userId:"2"
    //     }]
    // },{
    //     _id:'3',
    //     upVotes:21,
    //     downVotes:12,
    //     noOfAnswers:6,
    //     questionTitle:"What is a function of CSS?",
    //     questionBody:"It meant to be",
    //     questionTags:["java","node.js","react.js","mongodb"],
    //     userPosted:"Aravinth",
    //     userId:1,

    //     askedOn:"June1",
    //     answer:[{
    //         answerBody:"Answer",
    //         userAnswered:"Aravinth",
    //         answeredOn:"Jan2",
    //         userId:"2"
    //     }]
    // }]
    

    const location = useLocation()

    return (
        <div className='main-bar'>
            <div className='main-bar-header'>
                {
                    location.pathname ==='/' ?<h1>Top Questions</h1> : <h1>All Questions</h1>
                     
                }
                <button onClick={Checknull} className='ask-btn'>Ask Questions</button>
            </div>
            <div>
                {
                    questionsList.data === null ?
                    <h1>Loading...</h1> :
                    <>
                        <p>{ questionsList.data.length  } Questions</p>
                        
                        <QuestionList questionsList={questionsList.data}/>
                    </>
                }
            </div>

        </div>
    )
}

export default HomeMainbar