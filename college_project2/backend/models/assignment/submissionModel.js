const db = require("../../config/db");

exports.submitAssignment = async (data) => {
  const [result] = await db.query(
    `INSERT INTO submissions
     (assignment_id, student_id, answer_text, status)
     VALUES (?, ?, ?, ?)`,
    [
      data.assignment_id,
      data.student_id,
      data.answer_text,
      data.status || "submitted"
    ]
  );
  return result.insertId;
};

exports.getSubmissionsByAssignment = async (assignmentId) => {
  const [rows] = await db.query(
    `SELECT s.*, u.name AS student_name
     FROM submissions s
     JOIN users u ON u.id = s.student_id
     WHERE s.assignment_id = ?`,
    [assignmentId]
  );
  return rows;
};

exports.getMySubmissions = async (studentId) => {
  const [rows] = await db.query(
    `SELECT s.*, a.title
     FROM submissions s
     JOIN assignments a ON a.id = s.assignment_id
     WHERE s.student_id = ?`,
    [studentId]
  );
  return rows;
};
