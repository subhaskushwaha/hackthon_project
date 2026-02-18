const pool = require("../../config/db");

class StudentModel {

  // CREATE PROFILE
  static async createProfile(conn, id, data) {
    const {
      profile_photo_url,
      gender,
      date_of_birth,
      bio,
      address
    } = data;

    return conn.query(
      `INSERT INTO students_profile
      (id, profile_photo_url, gender, date_of_birth, bio, address)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [id, profile_photo_url, gender, date_of_birth, bio, address]
    );
  }

  // CREATE ACADEMIC
  static async createAcademic(conn, studentId, academic) {
    return conn.query(
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
        academic.academic_year
      ]
    );
  }

  // UPDATE PROFILE
  static async updateProfile(conn, id, data) {
    const {
      profile_photo_url,
      gender,
      date_of_birth,
      bio,
      address
    } = data;

    return conn.query(
      `UPDATE students_profile
       SET profile_photo_url = ?,
           gender = ?,
           date_of_birth = ?,
           bio = ?,
           address = ?,
           updated_at = NOW()
       WHERE id = ?`,
      [
        profile_photo_url,
        gender,
        date_of_birth,
        bio,
        address,
        id
      ]
    );
  }

  // UPDATE ACADEMIC
  static async updateAcademic(conn, studentId, academic) {
    return conn.query(
      `UPDATE student_academic
       SET enrolment_number = ?,
           branch = ?,
           department = ?,
           current_year = ?,
           current_semester = ?,
           current_cgpa = ?,
           academic_year = ?
       WHERE student_id = ?`,
      [
        academic.enrolment_number,
        academic.branch,
        academic.department,
        academic.current_year,
        academic.current_semester,
        academic.current_cgpa,
        academic.academic_year,
        studentId
      ]
    );
  }

  // GET PROFILE
  static async getById(id) {
    const [rows] = await pool.query(
      `SELECT sp.*, sa.*
       FROM students_profile sp
       LEFT JOIN student_academic sa
       ON sp.id = sa.student_id
       WHERE sp.id = ?`,
      [id]
    );

    if (!rows.length) throw new Error("Student not found");
    return rows[0];
  }
}

module.exports = StudentModel;
