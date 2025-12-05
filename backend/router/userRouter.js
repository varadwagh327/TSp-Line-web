import express from "express";
import { getUserDetails, login, logoutUser, userRegister, logoutAdmin, logoutEmployee } from "../controller/userController.js";
import { isUserAuthenticated, isAdminAuthenticated, isAuthenticated, isEmployeeAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/user/register", userRegister);
router.post("/login", login);
router.get("/user/me", isAuthenticated, getUserDetails);
// Allow logout endpoints to clear cookies without requiring a valid token
router.get("/user/logout", logoutUser);
router.get("/admin/logout", logoutAdmin);
router.get("/employee/logout", logoutEmployee);


export default router;