import express from "express";
import { getUserDetails, login, logoutUser, userRegister, logoutAdmin, logoutEmployee } from "../controller/userController.js";
import { isUserAuthenticated, isAdminAuthenticated, isAuthenticated, isEmployeeAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/user/register", userRegister);
router.post("/login", login);
router.get("/user/me", isAuthenticated, getUserDetails);
router.get("/user/logout", isUserAuthenticated, logoutUser);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/employee/logout", isEmployeeAuthenticated, logoutEmployee);


export default router;