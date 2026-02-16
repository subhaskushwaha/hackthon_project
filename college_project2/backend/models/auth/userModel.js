const db = require("../../config/db");

exports.findByEmail = async (email) => {
  const [rows] = await db.query(
    `SELECT u.id, u.name, u.email, u.password, u.role_id, r.name AS role
     FROM users u
     JOIN roles r ON r.id = u.role_id
     WHERE u.email = ?`,
    [email]
  );
  return rows[0];
};

exports.createUser = async (name, email, password, roleId) => {
  const [result] = await db.query(
    `INSERT INTO users (name, email, password, role_id)
     VALUES (?, ?, ?, ?)`,
    [name, email, password, roleId]
  );
  return result.insertId;
};
