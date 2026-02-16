const jwt = require("jsonwebtoken");
const db = require("../config/db");

module.exports = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      // 1️⃣ Token check
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: Token missing",
        });
      }

      const token = authHeader.split(" ")[1];

      // 2️⃣ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3️⃣ Get user from DB
      const [rows] = await db.query(
        `SELECT u.id, u.name, u.email, u.role_id, r.name AS role
         FROM users u
         JOIN roles r ON r.id = u.role_id
         WHERE u.id = ? AND u.status = 'active'`,
        [decoded.id]
      );

      if (rows.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: User not found",
        });
      }

      const user = rows[0];

      // 4️⃣ Role check (if required)
      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: Access denied",
        });
      }

      // 5️⃣ Attach user to request
      req.user = user;

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
};
