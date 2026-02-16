const pool = require("../../config/db");

class TeacherModel {
  static async createProfile(connection, data) {
    return connection.query(
      `INSERT INTO teachers_profile
      (id, profile_photo_url, gender, date_of_birth, bio, address)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.id,
        data.profile_photo_url,
        data.gender,
        data.date_of_birth,
        data.bio,
        data.address,
      ]
    );
  }

  static async createAcademic(connection, teacherId, academic) {
    return connection.query(
      `INSERT INTO teacher_academic
      (teacher_id, employee_number, designation,
       department, specialization, qualification,
       experience_years, joining_date,
       current_semesters_handling, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        teacherId,
        academic.employee_number,
        academic.designation,
        academic.department,
        academic.specialization,
        academic.qualification,
        academic.experience_years,
        academic.joining_date,
        academic.current_semesters_handling,
        academic.status,
      ]
    );
  }

  static async getById(id) {
    const [rows] = await pool.query(
      `SELECT tp.*, ta.*
       FROM teachers_profile tp
       LEFT JOIN teacher_academic ta
       ON tp.id = ta.teacher_id
       WHERE tp.id = ?`,
      [id]
    );
    return rows[0];
  }
}

module.exports = TeacherModel;
