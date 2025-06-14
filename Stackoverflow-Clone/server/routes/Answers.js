import express from 'express'
import {postAnswer} from '../controllers/Answers.js'


const router=express.Router();

router.patch('/post/:id',postAnswer) //Used to Update a particular record .

export default router