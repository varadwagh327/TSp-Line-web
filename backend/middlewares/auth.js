import {User} from "../models/userSchema.js";
import {catchAsyncErrors} from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

export const isAdminAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const token = req.cookies.adminToken;
    if(!token) {
        return next(new ErrorHandler("Admin Not Authenticated!", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if(req.user.role !== "Admin") {
        return next(new ErrorHandler(`${req.user.role} not authorized for this resources!`, 403));
    }
    next();
});


export const isUserAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const token = req.cookies.userToken;
    if(!token) {
        return next(new ErrorHandler("User Not Authenticated!", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if(req.user.role !== "User") {
        return next(new ErrorHandler(`${req.user.role} not authorized for this resources!`, 403));
    }
    next();
});



export const isEmployeeAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.employeeToken; // ✅ Use employeeToken
    if (!token) {
        return next(new ErrorHandler("Employee Not Authenticated!", 400));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (req.user.role !== "Employee") { // ✅ Check for Employee
        return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403));
    }

    next();
});


export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.userToken || req.cookies.employeeToken || req.cookies.adminToken;
    if (!token) {
        return next(new ErrorHandler("Not Authenticated!", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (!["User", "Employee", "Admin"].includes(req.user.role)) {
        return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403));
    }

    next();
});

export const isGoogleAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.googleToken;
    if (!token) return res.status(401).json({ success: false, message: "Not authenticated" });

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await GoogleUser.findById(payload.id);
    if (!user) return res.status(401).json({ success: false, message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error("Google Auth Middleware Error:", err.message);
    res.status(401).json({ success: false, message: "Authentication failed" });
  }
};



export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized" });
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};