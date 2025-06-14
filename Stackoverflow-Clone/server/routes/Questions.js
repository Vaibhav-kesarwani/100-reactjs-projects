import express from 'express'
import {AskQuestion} from '../controllers/Questions.js'
import {getAllQuestions} from '../controllers/Questions.js'
const router=express.Router()
router.post('/Ask',AskQuestion)
router.get('/get',getAllQuestions)
export default router