const pool = require("../../config/db");
const StudentModel = require("../../models/student/studentModel");

class StudentService {

  static async createStudent(studentId, data) {
    const conn = await pool.getConnection();

    try {
      await conn.beginTransaction();

      await StudentModel.createProfile(conn, studentId, data);
      await StudentModel.createAcademic(conn, studentId, data.academic);

      await conn.commit();
      return { student_id: studentId };

    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  static async updateStudent(studentId, data) {
    const conn = await pool.getConnection();

    try {
      await conn.beginTransaction();

      await StudentModel.updateProfile(conn, studentId, data);
      await StudentModel.updateAcademic(conn, studentId, data.academic);

      await conn.commit();
      return { student_id: studentId };

    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  static async getStudent(studentId) {
    return StudentModel.getById(studentId);
  }
}

module.exports = StudentService;
