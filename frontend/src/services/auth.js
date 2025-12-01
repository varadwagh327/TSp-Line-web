const API = process.env.REACT_APP_API_BASE || "https://tsp-line-web.onrender.com";

// Google login (sign-in)
export async function googleSignInSend(token) {
  try {
    const res = await fetch(`${API}/api/user/googleLogin/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // ✅ important to store refresh token cookie
      body: JSON.stringify({ token }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Google login failed");
    }

    const data = await res.json();

    // ✅ store access token in localStorage (used later for /google/me)
    if (data.accessToken) {
      localStorage.setItem("googleAccessToken", data.accessToken);
    }

    return data;
  } catch (err) {
    console.error("Google Sign-In Error:", err.message);
    return { success: false, message: err.message };
  }
}
