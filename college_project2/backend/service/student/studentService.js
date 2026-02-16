const StudentModel = require("../../models/student/studentModel");

exports.createProfile = async (userId, body) => {
  await StudentModel.createProfile([
    userId,
    body.profilePhoto,
    body.gender,
    body.dob,
    body.bio,
    body.address
  ]);
  return { success: true, message: "Student profile created" };
};

exports.getProfile = async (userId) => {
  const data = await StudentModel.getProfile(userId);
  if (!data) return { success: false, message: "Profile not found" };
  return { success: true, data };
};

exports.updateProfile = async (userId, body) => {
  await StudentModel.updateProfile([
    body.profilePhoto,
    body.gender,
    body.dob,
    body.bio,
    body.address,
    userId
  ]);
  return { success: true, message: "Profile updated" };
};

exports.createAcademic = async (userId, body) => {
  const student = await StudentModel.getProfile(userId);
  await StudentModel.createAcademic([
    student.id,
    body.enrolmentNumber,
    body.branch,
    body.department,
    body.currentYear,
    body.currentSemester,
    body.currentCgpa,
    body.academicYear
  ]);
  return { success: true, message: "Academic info added" };
};

exports.getAcademic = async (userId) => {
  const data = await StudentModel.getAcademic(userId);
  if (!data) return { success: false, message: "Academic info not found" };
  return { success: true, data };
};

exports.updateAcademic = async (userId, body) => {
  await StudentModel.updateAcademic([
    body.branch,
    body.department,
    body.currentYear,
    body.currentSemester,
    body.currentCgpa,
    body.academicYear,
    userId
  ]);
  return { success: true, message: "Academic updated" };
};
