import jwt from "jsonwebtoken";

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY);
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY);
};

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

  res
    .status(statusCode)
    .cookie(cookieName, accessToken, {
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000, // 10 years in milliseconds
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

  // Debug: log the Set-Cookie header that was written to the response (if any)
  try {
    const setCookieHeader = res.getHeader && res.getHeader('Set-Cookie');
    console.log('🍪 Server Set-Cookie header after generating token:', setCookieHeader);
  } catch (err) {
    console.error('Error reading Set-Cookie header for debug:', err.message);
  }
};
