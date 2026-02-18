const pool = require("../../config/db");
const TeacherModel = require("../../models/teacher/teacherAcademicModel");

class TeacherService {

  // CREATE
  static async createTeacher(teacherId, data) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      await TeacherModel.createProfile(connection, teacherId, data);
      await TeacherModel.createAcademic(
        connection,
        teacherId,
        data.professional
      );

      await connection.commit();
      return { teacher_id: teacherId };

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // ✅ GET BY ID
  static async getTeacher(id) {
    const teacher = await TeacherModel.getById(id);
    if (!teacher) throw new Error("Teacher not found");
    return teacher;
  }

  // ✅ GET MY PROFILE (JWT)
  static async getMyProfile(teacherId) {
    const teacher = await TeacherModel.getById(teacherId);
    if (!teacher) throw new Error("Teacher not found");
    return teacher;
  }

  // ✅ GET ALL
  static async getAllTeachers() {
    return TeacherModel.getAll();
  }

  // UPDATE
  static async updateTeacher(teacherId, data) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      await TeacherModel.updateProfile(connection, teacherId, data);
      await TeacherModel.updateAcademic(
        connection,
        teacherId,
        data.professional
      );

      await connection.commit();
      return { teacher_id: teacherId };

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // DELETE
  static async deleteTeacher(teacherId) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      await TeacherModel.deleteAcademic(connection, teacherId);
      await TeacherModel.deleteProfile(connection, teacherId);

      await connection.commit();
      return true;

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = TeacherService;
