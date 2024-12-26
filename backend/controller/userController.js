import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import {generateToken} from "../utils/jwtToken.js";

export const userRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, role } = req.body;
  if (!firstName || !lastName || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User Already Registered!", 400));
  }
  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    role,
  });
  generateToken(user, "registered successfully!", 200, res);
});

export const login = catchAsyncErrors(async(req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;
    if(!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please Provide All Details!", 400));
    }
    if(password !== confirmPassword) {
        return next(new ErrorHandler("Password And Confirm Password Do Not Match!", 400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user) {
        return next(new ErrorHandler("Invalid Password Or Email!", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Password Or Email!", 400));
    }
    if(role !== user.role) {
        return next(new ErrorHandler("User With This Role Not Found!", 400));
    }
    generateToken(user, "logged in successfully!", 200, res);
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
      success: true,
      user,
  });
});

export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res
      .status(200)
      .cookie("userToken", "", {
          httpOnly: true,
          expires: new Date(Date.now()),
      })
      .json({
          success: true,
          message: "logged out successfully!",
      });
});


export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
      .status(200)
      .cookie("adminToken", "", {
          httpOnly: true,
          expires: new Date(Date.now()),
      })
      .json({
          success: true,
          message: "Admin logged out successfully!",
      });
});