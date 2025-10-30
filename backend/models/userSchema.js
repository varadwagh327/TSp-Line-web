import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  // Name fields
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    minLength: [3, "First Name must have at least 3 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    minLength: [3, "Last Name must have at least 3 characters"],
  },

  // Email and phone
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Provide a valid email"],
  },
  phone: {
    type: String,
    minLength: [10, "Phone number must have 10 digits"],
    maxLength: [10, "Phone number must have 10 digits"],
  },

  // Password for normal login
  password: {
    type: String,
    select: false, // never return password by default
    minLength: [8, "Password must have at least 8 characters"],
  },

  // Role: Admin / Employee / User
  role: {
    type: String,
    enum: ["Admin", "Employee", "User"],
    required: true,
    default: "User",
  },

  // Provider info
  provider: {
    type: String,
    enum: ["normal", "google"],
    default: "normal",
  },
  providerId: {
    type: String, // Google sub ID
  },

  // Optional fields
  avatar: {
    type: String,
    default: "",
  },
  birthday: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
}, { timestamps: true });

// Hash password before saving (normal login only)
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Compare password for login
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT token
userSchema.methods.generateJsonWebToken = function() {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRES || "15m" }
  );
};

export const User = mongoose.models.User || mongoose.model("User", userSchema);
