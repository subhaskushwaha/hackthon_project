const db = require("../../config/db");

exports.createProfile = (params) =>
  db.execute(
    `INSERT INTO students_profile 
     (user_id, profile_photo_url, gender, date_of_birth, bio, address)
     VALUES (?, ?, ?, ?, ?, ?)`,
    params
  );

exports.getProfile = async (userId) => {
  const [rows] = await db.execute(
    `SELECT * FROM students_profile WHERE user_id = ?`,
    [userId]
  );
  return rows[0];
};

exports.updateProfile = (params) =>
  db.execute(
    `UPDATE students_profile 
     SET profile_photo_url=?, gender=?, date_of_birth=?, bio=?, address=?
     WHERE user_id=?`,
    params
  );

exports.createAcademic = (params) =>
  db.execute(
    `INSERT INTO student_academic
     (student_id, enrolment_number, branch, department, current_year, current_semester, current_cgpa, academic_year)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    params
  );

exports.getAcademic = async (userId) => {
  const [rows] = await db.execute(
    `SELECT sa.* FROM student_academic sa
     JOIN students_profile sp ON sp.id = sa.student_id
     WHERE sp.user_id = ?`,
    [userId]
  );
  return rows[0];
};

exports.updateAcademic = (params) =>
  db.execute(
    `UPDATE student_academic sa
     JOIN students_profile sp ON sp.id = sa.student_id
     SET branch=?, department=?, current_year=?, current_semester=?, current_cgpa=?, academic_year=?
     WHERE sp.user_id=?`,
    params
  );
