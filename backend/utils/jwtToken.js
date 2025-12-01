import jwt from "jsonwebtoken";

// Access token (short-lived)
export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
};

// Refresh token (long-lived)
export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
};

// ✅ Unified token generator
export const generateToken = (user, message, statusCode, res) => {
  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id, role: user.role });

  const cookieName =
    user.role === "Admin"
      ? "adminToken"
      : user.role === "Employee"
      ? "employeeToken"
      : "userToken";

  console.log(`🍪 Setting ${cookieName} cookie for user: ${user._id}`);
  console.log(`   - Expires in ${process.env.COOKIE_EXPIRE} days`);
  console.log(`   - SameSite: none, Secure: true, HttpOnly: true`);

  // ✅ Always use secure and sameSite: none for cross-origin on HTTPS
  res
    .status(statusCode)
    .cookie(cookieName, accessToken, {
      expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true, // ✅ Always true on HTTPS (Render uses HTTPS)
      sameSite: "none", // ✅ Required for cross-origin cookie sharing
      path: "/", // ✅ Ensure cookie is available to all paths
    })
    .json({
      success: true,
      message,
      user,
      accessToken, 
      refreshToken, 
    });
};
