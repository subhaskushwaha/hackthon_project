const Assignment = require("../../models/assignment/assignmentModel");

exports.create = async (userId, body) => {
  return await Assignment.createAssignment({
    ...body,
    teacher_id: userId
  });
};

exports.getAll = async () => {
  return await Assignment.getAllAssignments();
};

exports.getById = async (id) => {
  return await Assignment.getAssignmentById(id);
};
