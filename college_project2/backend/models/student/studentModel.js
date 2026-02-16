const pool = require("../../config/db");

class StudentModel {
  static async createProfile(connection, data) {
    const {
      id,
      profile_photo_url,
      gender,
      date_of_birth,
      bio,
      address,
    } = data;

    return connection.query(
      `INSERT INTO students_profile
      (id, profile_photo_url, gender, date_of_birth, bio, address)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [id, profile_photo_url, gender, date_of_birth, bio, address]
    );
  }

  static async createAcademic(connection, studentId, academic) {
    return connection.query(
      `INSERT INTO student_academic
      (student_id, enrolment_number, branch, department,
       current_year, current_semester, current_cgpa, academic_year)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        studentId,
        academic.enrolment_number,
        academic.branch,
        academic.department,
        academic.current_year,
        academic.current_semester,
        academic.current_cgpa,
        academic.academic_year,
      ]
    );
  }

  static async getById(id) {
    const [rows] = await pool.query(
      `SELECT sp.*, sa.*
       FROM students_profile sp
       LEFT JOIN student_academic sa
       ON sp.id = sa.student_id
       WHERE sp.id = ?`,
      [id]
    );
    return rows[0];
  }
}

module.exports = StudentModel;