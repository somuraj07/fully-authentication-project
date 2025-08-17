import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from '../config/emailTemplates.js';

// Helper to set cookie
const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS in prod
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // cross-domain in prod
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// ================= Register =================
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.json({ success: false, message: 'Missing details' });

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.json({ success: false, message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    setTokenCookie(res, token);

    // Send welcome mail
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Welcome to Purple World!',
      text: `Hello ${name}, your account has been created successfully.`,
    });

    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// ================= Login =================
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ success: false, message: 'Email and password required' });

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: 'Invalid email' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    setTokenCookie(res, token);

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ================= Logout =================
export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    return res.json({ success: true, message: 'Logged out' });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ================= Check Auth =================
export const isAuthenticated = async (req, res) => {
  return res.json({ success: true, message: 'User is authenticated' });
};

// ================= Send Verification OTP =================
export const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.user.id; // requires requireAuth middleware
    const user = await userModel.findById(userId);

    if (!user) return res.json({ success: false, message: 'User not found' });
    if (user.isAccountVerifed) return res.json({ success: false, message: 'Account already verified' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.verifyOtp = otp;
    user.verifyOtpExprirdAt = Date.now() + 24 * 60 * 60 * 1000; // 24h
    await user.save();

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Verify Your Account',
      html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email),
    });

    return res.json({ success: true, message: 'OTP sent to your email' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ================= Verify OTP =================
export const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  const userId = req.user.id; // requires requireAuth middleware

  if (!userId || !otp) return res.json({ success: false, message: 'Missing details' });

  try {
    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: 'User not found' });
    if (!user.verifyOtp || user.verifyOtp !== otp) return res.json({ success: false, message: 'Invalid OTP' });
    if (user.verifyOtpExprirdAt < Date.now()) return res.json({ success: false, message: 'OTP expired' });

    user.isAccountVerifed = true;
    user.verifyOtp = '';
    user.verifyOtpExprirdAt = 0;
    await user.save();

    return res.json({ success: true, message: 'Account verified successfully' });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ================= Send Password Reset OTP =================
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.json({ success: false, message: 'Email is required' });

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.resetOtpExprirdAt = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Password Reset OTP',
      html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email),
    });

    return res.json({ success: true, message: 'OTP sent to your email' });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ================= Reset Password =================
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) return res.json({ success: false, message: 'Email, OTP and new password required' });

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: 'User not found' });
    if (!user.resetOtp || user.resetOtp !== otp) return res.json({ success: false, message: 'Invalid OTP' });
    if (user.resetOtpExprirdAt < Date.now()) return res.json({ success: false, message: 'OTP expired' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = '';
    user.resetOtpExprirdAt = 0;
    await user.save();

    return res.json({ success: true, message: 'Password has been reset successfully' });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
