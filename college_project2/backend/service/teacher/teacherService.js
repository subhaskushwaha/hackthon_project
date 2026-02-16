const pool = require("../../config/db");
const TeacherModel = require("../../models/teacher/teacherAcademicModel");

class TeacherService {
  static async createTeacher(data) {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      await TeacherModel.createProfile(connection, data);
      await TeacherModel.createAcademic(
        connection,
        data.id,
        data.academic
      );

      await connection.commit();

      return { id: data.id };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async getTeacher(id) {
    return TeacherModel.getById(id);
  }
}

module.exports = TeacherService;
