const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/auth/userModel");

exports.login = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    return { success: false, message: "Email & password required" };
  }

  const user = await User.findByEmail(email);
  if (!user) {
    return { success: false, message: "Invalid email or password" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { success: false, message: "Invalid email or password" };
  }

  const token = jwt.sign(
    { id: user.id, role_id: user.role_id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    success: true,
    message: "Login successful",
    data: {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role_id: user.role_id,
        role: user.role,
      },
    },
  };
};
