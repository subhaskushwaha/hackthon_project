const Submission = require("../../models/assignment/submissionModel");

exports.submit = async (studentId, body) => {
  return await Submission.submitAssignment({
    assignment_id: body.assignment_id,
    student_id: studentId,
    answer_text: body.answer_text,
    status: body.status
  });
};

exports.getByAssignment = async (assignmentId) => {
  return await Submission.getSubmissionsByAssignment(assignmentId);
};

exports.getMy = async (studentId) => {
  return await Submission.getMySubmissions(studentId);
};
