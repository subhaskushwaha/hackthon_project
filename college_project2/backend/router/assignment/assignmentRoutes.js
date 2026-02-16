const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authMiddleware");
const controller = require("../../controller/assignment/assignmentController");
const controllers = require("../../controller/assignment/submissionController");

router.post("/create", auth(["teacher"]), controller.createAssignment);
router.get("/list", auth(), controller.getAssignments);
router.get("/:id", auth(), controller.getAssignmentById);

// Student submits assignment
router.post(
  "/submit",
  auth(["student"]),
  controllers.submitAssignment
);

// Teacher views submissions of assignment
router.get(
  "/assignment/:assignmentId",
  auth(["teacher"]),
  controllers.getSubmissionsByAssignment
);

// Student views own submissions
router.get(
  "/my",
  auth(["student"]),
  controllers.getMySubmissions
);

module.exports = router;