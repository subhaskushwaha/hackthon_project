const service = require("../../service/assignment/submissionService");

exports.submitAssignment = async (req, res) => {
  try {
    const id = await service.submit(req.user.id, req.body);
    res.json({
      success: true,
      submission_id: id
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message
    });
  }
};

exports.getSubmissionsByAssignment = async (req, res) => {
  const data = await service.getByAssignment(req.params.assignmentId);
  res.json({ success: true, data });
};

exports.getMySubmissions = async (req, res) => {
  const data = await service.getMy(req.user.id);
  res.json({ success: true, data });
};
