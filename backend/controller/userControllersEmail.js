import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/userModelsEmail.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export async function EmailUserController(request, response, next) {
  try {
    const { name, email, title, description } = request.body;

    // ✅ Only name, title, and description are required
    if (!name || !title || !description) {
      return next(new ErrorHandler("Please fill the full form!", 400));
    }

    // ✅ Default HR email (mandatory destination)
    const hrEmail = "varadwagh327@gmail.com";

    // ✅ Save the message record (employee email optional)
    const newUser = new UserModel({
      name,
      email: email || "N/A", // store 'N/A' if no employee email
      title,
      description,
      createdAt: new Date(),
    });

    const savedUser = await newUser.save();

    // ✅ Fast response to frontend
    response.json({
      message: "Message received successfully. HR will be notified shortly.",
      error: false,
      success: true,
      data: savedUser,
    });

    // ✅ Background HR email sending
    process.nextTick(async () => {
      try {
        await sendEmail({
          sendTo: hrEmail,
          subject: title,
          html: verifyEmailTemplate({
            name,
            email: email || "No email provided",
            title,
            description,
          }),
        });
        console.log(`✅ Message sent successfully to HR (${hrEmail})`);
      } catch (emailError) {
        console.error(`❌ Failed to send message to HR:`, emailError.message);
      }
    });

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
