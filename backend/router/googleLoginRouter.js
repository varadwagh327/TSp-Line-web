import express from "express";
import { googleAuth, getGoogleUserDetails } from "../controller/googleLoginController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Login via Google
router.post("/google", googleAuth);

// Get logged-in Google user info
router.get("/google/me", isAuthenticated, getGoogleUserDetails);

export default router;
