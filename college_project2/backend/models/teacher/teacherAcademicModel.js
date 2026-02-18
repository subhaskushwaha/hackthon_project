const pool = require("../../config/db");

class TeacherModel {

  // ================= CREATE =================

  static async createProfile(connection, teacherId, data) {
    return connection.query(
      `INSERT INTO teachers_profile
      (id, profile_photo_url, gender, date_of_birth, bio, address)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        teacherId,
        data.profile_photo_url || null,
        data.gender || null,
        data.date_of_birth || null,
        data.bio || null,
        data.address || null,
      ]
    );
  }

  static async createAcademic(connection, teacherId, professional) {
    return connection.query(
      `INSERT INTO teacher_academic
      (teacher_id, employee_number, designation, department,
       specialization, qualification, experience_years,
       joining_date, current_semesters_handling, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        teacherId,
        professional.employee_number,
        professional.designation,
        professional.department,
        professional.specialization,
        professional.qualification,
        professional.experience_years,
        professional.joining_date,
        professional.current_semesters_handling,
        professional.status || "ACTIVE",
      ]
    );
  }

  // ================= READ =================

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

  static async getAll() {
    const [rows] = await pool.query(
      `SELECT tp.*, ta.*
       FROM teachers_profile tp
       LEFT JOIN teacher_academic ta
       ON tp.id = ta.teacher_id`
    );
    return rows;
  }

  // ================= UPDATE =================

  static async updateProfile(connection, teacherId, data) {
    return connection.query(
      `UPDATE teachers_profile SET
        profile_photo_url = ?,
        gender = ?,
        date_of_birth = ?,
        bio = ?,
        address = ?
       WHERE id = ?`,
      [
        data.profile_photo_url || null,
        data.gender || null,
        data.date_of_birth || null,
        data.bio || null,
        data.address || null,
        teacherId,
      ]
    );
  }

  static async updateAcademic(connection, teacherId, professional) {
    return connection.query(
      `UPDATE teacher_academic SET
        employee_number = ?,
        designation = ?,
        department = ?,
        specialization = ?,
        qualification = ?,
        experience_years = ?,
        joining_date = ?,
        current_semesters_handling = ?,
        status = ?
       WHERE teacher_id = ?`,
      [
        professional.employee_number,
        professional.designation,
        professional.department,
        professional.specialization,
        professional.qualification,
        professional.experience_years,
        professional.joining_date,
        professional.current_semesters_handling,
        professional.status || "ACTIVE",
        teacherId,
      ]
    );
  }

  // ================= DELETE =================

  static async deleteAcademic(connection, teacherId) {
    return connection.query(
      `DELETE FROM teacher_academic WHERE teacher_id = ?`,
      [teacherId]
    );
  }

  static async deleteProfile(connection, teacherId) {
    return connection.query(
      `DELETE FROM teachers_profile WHERE id = ?`,
      [teacherId]
    );
  }
}

module.exports = TeacherModel;
