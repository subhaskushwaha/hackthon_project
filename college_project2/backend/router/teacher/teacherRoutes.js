const express = require("express");
const router = express.Router();
const TeacherController = require("../../controller/teacher/teacherController");

router.post("/", TeacherController.create);
router.get("/:id", TeacherController.getById);

module.exports = router;
