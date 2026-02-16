const TeacherService = require("../../service/teacher/teacherService");

class TeacherController {
  static async create(req, res) {
    try {
      const result = await TeacherService.createTeacher(req.body);

      res.status(201).json({
        success: true,
        message: "Teacher created successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getById(req, res) {
    try {
      const teacher = await TeacherService.getTeacher(req.params.id);

      res.status(200).json({
        success: true,
        data: teacher,
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
