import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const { Schema, model, models } = mongoose;

const GoogleLoginSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: "" },
    role: { type: String, enum: ["User", "Employee", "Admin"], default: "User" },
    provider: { type: String, default: "google" },
    providerId: { type: String },
    birthday: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
  },
  { timestamps: true }
);

// Optional: Add JWT method (to reuse generateToken logic)
GoogleLoginSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const GoogleLogin = models.GoogleLogin || model("GoogleLogin", GoogleLoginSchema);
export default GoogleLogin;
