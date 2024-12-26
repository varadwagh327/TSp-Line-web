import express from "express";
import { getUserDetails, login, logoutUser, userRegister, logoutAdmin } from "../controller/userController.js";
import { isUserAuthenticated, isAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/user/register", userRegister);
router.post("/login", login);
router.get("/user/me", isUserAuthenticated, getUserDetails);
router.get("/user/logout", isUserAuthenticated, logoutUser);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);

 export default router;