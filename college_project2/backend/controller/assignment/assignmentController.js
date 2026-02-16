const service = require("../../service/assignment/assignmentService");

exports.createAssignment = async (req, res) => {
  try {
    const id = await service.create(req.user.id, req.body);
    res.json({ success: true, assignment_id: id });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

exports.getAssignments = async (req, res) => {
  const data = await service.getAll();
  res.json({ success: true, data });
};

exports.getAssignmentById = async (req, res) => {
  const data = await service.getById(req.params.id);
  if (!data) {
    return res.status(404).json({ success: false, message: "Assignment not found" });
  }
  res.json({ success: true, data });
};
