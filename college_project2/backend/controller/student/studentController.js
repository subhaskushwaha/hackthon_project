const StudentService = require("../../service/student/studentService");

exports.createProfile = async (req, res) => {
  const result = await StudentService.createProfile(req.user.id, req.body);
  res.status(result.success ? 201 : 400).json(result);
};

exports.getProfile = async (req, res) => {
  const result = await StudentService.getProfile(req.user.id);
  res.status(result.success ? 200 : 404).json(result);
};

exports.updateProfile = async (req, res) => {
  const result = await StudentService.updateProfile(req.user.id, req.body);
  res.status(result.success ? 200 : 400).json(result);
};

exports.createAcademic = async (req, res) => {
  const result = await StudentService.createAcademic(req.user.id, req.body);
  res.status(result.success ? 201 : 400).json(result);
};

exports.getAcademic = async (req, res) => {
  const result = await StudentService.getAcademic(req.user.id);
  res.status(result.success ? 200 : 404).json(result);
};

exports.updateAcademic = async (req, res) => {
  const result = await StudentService.updateAcademic(req.user.id, req.body);
  res.status(result.success ? 200 : 400).json(result);
};
