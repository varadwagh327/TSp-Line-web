import express,{ Router } from 'express';
import {EmailUserController} from '../controller/userControllersEmail.js';
import {isAuthenticated} from "../middlewares/auth.js";

const userRouter = Router();

// Allow any authenticated role (Employee, Admin, User) to send email
userRouter.post('/email', isAuthenticated, EmailUserController);

export default userRouter;
