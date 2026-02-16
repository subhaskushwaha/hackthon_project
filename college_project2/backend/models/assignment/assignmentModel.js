const db = require("../../config/db");

exports.createAssignment = async (data) => {
  const [result] = await db.query(
    `INSERT INTO assignments
     (title, subtitle, branch, department, year, note, last_date, teacher_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.title,
      data.subtitle,
      data.branch,
      data.department,
      data.year,
      data.note,
      data.last_date,
      data.teacher_id
    ]
  );
  return result.insertId;
};

exports.getAllAssignments = async () => {
  const [rows] = await db.query(
    `SELECT a.*, u.name AS teacher_name
     FROM assignments a
     JOIN users u ON u.id = a.teacher_id
     ORDER BY a.created_at DESC`
  );
  return rows;
};

exports.getAssignmentById = async (id) => {
  const [rows] = await db.query(
    `SELECT a.*, u.name AS teacher_name
     FROM assignments a
     JOIN users u ON u.id = a.teacher_id
     WHERE a.id = ?`,
    [id]
  );
  return rows[0];
};
