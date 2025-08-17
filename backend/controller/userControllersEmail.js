import sendEmail from '../config/sendEmail.js';
import  UserModel from '../models/userModelsEmail.js';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import ErrorHandler from "../middlewares/errorMiddleware.js";

export async function EmailUserController(request, response){
    try{
        const {name, email, title,description} = request.body

        if(!name || !email || !title || !description ){
           return next(new ErrorHandler("Please Fill Full Form!", 400));
        }

        const Users = await UserModel.findOne({ email })

        if(Users){
            return response.json({
                message : "Already have email",
                error : true,
                success : false
            })
        }


        const verifyEmail = await sendEmail({
            sendTo : email,
            subject : "Verify email from ProductServer",
            html : verifyEmailTemplate({
               name, 
               email,
               title,
               description
            })
        })

        return response.json({
            message : "User Email successfully",
            error : false,
            success : true,
            data : save
        })

    }catch(error){
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
