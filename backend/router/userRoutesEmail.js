import express,{ Router } from 'express';
import {EmailUserController} from '../controller/userControllersEmail.js';
import {isEmployeeAuthenticated} from "../middlewares/auth.js"


const userRouter = Router()

userRouter.post('/email',isEmployeeAuthenticated, EmailUserController)

export default userRouter;
