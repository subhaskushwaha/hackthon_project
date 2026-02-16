const bcrypt = require("bcrypt");
const User = require("../../models/auth/userModel");

exports.register = async (data) => {
  const { name, email, password, role_id } = data;

  if (!name || !email || !password) {
    return { success: false, message: "All fields required" };
  }

  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return { success: false, message: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const finalRoleId = role_id || 3; // default user

  const userId = await User.createUser(
    name,
    email,
    hashedPassword,
    finalRoleId
  );

  return {
    success: true,
    message: "User registered successfully",
    data: {
      id: userId,
      name,
      email,
      role_id: finalRoleId,
    },
  };
};
