const TeacherService = require("../../service/teacher/teacherService");

class TeacherController {

  // ================= CREATE =================
  static async create(req, res) {
    try {
      const teacherId = req.user.id; // 🔥 JWT se id

      const result = await TeacherService.createTeacher(
        teacherId,
        req.body
      );

      res.status(201).json({
        success: true,
        message: "Teacher created successfully",
        data: result,
      });

    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ================= UPDATE =================
  static async update(req, res) {
    try {
      const teacherId = req.user.id;

      const result = await TeacherService.updateTeacher(
        teacherId,
        req.body
      );

      res.json({
        success: true,
        message: "Teacher updated successfully",
        data: result,
      });

    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ================= GET MY PROFILE =================
  static async getMyProfile(req, res) {
    try {
      const teacherId = req.user.id;

      const teacher = await TeacherService.getMyProfile(teacherId);

      res.json({
        success: true,
        data: teacher,
      });

    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ================= GET BY ID =================
  static async getById(req, res) {
    try {
      const teacher = await TeacherService.getTeacher(req.params.id);

      res.status(200).json({
        success: true,
        data: teacher,
      });

    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ================= GET ALL =================
  static async getAll(req, res) {
    try {
      const teachers = await TeacherService.getAllTeachers();

      res.json({
        success: true,
        count: teachers.length,
        data: teachers,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = TeacherController;
