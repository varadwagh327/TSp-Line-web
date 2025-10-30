import { User } from "../models/userSchema.js"; 
import { OAuth2Client } from "google-auth-library";
import { generateToken } from "../utils/jwtToken.js";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google Login
export const googleAuth = async (req, res, next) => {
  try {
    const { token, role } = req.body; // role comes from frontend (User / Employee / Admin)
    if (!token) return res.status(400).json({ error: "Missing token" });

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload?.email || !payload.name)
      return res.status(400).json({ error: "Invalid token payload" });

    // Split first and last name
    const [firstName, ...rest] = payload.name.split(" ");
    const lastName = rest.join(" ") || "";

    // Check if user exists
    let user = await User.findOne({ email: payload.email });

    if (!user) {
      // Create new user
      user = await User.create({
        firstName,
        lastName,
        email: payload.email,
        role: role || "User", // default User if role not provided
        provider: "google",
        providerId: payload.sub,
        avatar: payload.picture || "",
      });
    } else {
      // Update Google provider info if needed
      user.provider = "google";
      user.providerId = payload.sub;
      if (payload.picture) user.avatar = payload.picture;
      
      // Update role if frontend sent a different role
      if (role && role !== user.role) user.role = role;
      
      await user.save();
    }

    // ✅ Generate JWT token with role
    generateToken(user, "Google login successful!", 200, res);

  } catch (err) {
    console.error("Google login error:", err);
    res.status(500).json({ success: false, message: "Google login failed" });
  }
};

// Get Google Logged-in User Details
export const getGoogleUserDetails = async (req, res) => {
  try {
    const token =
      req.headers.authorization?.split(" ")[1] ||
      req.cookies.userToken ||
      req.cookies.employeeToken ||
      req.cookies.adminToken;

    if (!token)
      return res.status(401).json({ success: false, message: "Not Authenticated!" });

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(payload.id);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, user });

  } catch (err) {
    console.error("Get Google User Error:", err.message);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
