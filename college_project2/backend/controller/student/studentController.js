const StudentService = require("../../service/student/studentService");

class StudentController {

  // CREATE PROFILE + ACADEMIC
  static async create(req, res) {
    try {
      const studentId = req.user.id; // ✅ JWT se

      const data = await StudentService.createStudent(
        studentId,
        req.body
      );

      res.status(201).json({
        success: true,
        message: "Student profile created",
        data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // UPDATE
  static async update(req, res) {
    try {
      const studentId = req.user.id;

      const data = await StudentService.updateStudent(
        studentId,
        req.body
      );

      res.json({
        success: true,
        message: "Student profile updated",
        data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // GET OWN PROFILE
  static async getProfile(req, res) {
    try {
      const studentId = req.user.id;

      const data = await StudentService.getStudent(studentId);

      res.json({
        success: true,
        data
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = StudentController;
