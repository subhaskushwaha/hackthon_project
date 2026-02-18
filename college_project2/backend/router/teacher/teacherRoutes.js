const express = require("express");
const router = express.Router();
const TeacherController = require("../../controller/teacher/teacherController");
const auth = require("../../middleware/authMiddleware");

router.post("/",auth(["teacher"]), TeacherController.create);
router.get("/:id",auth(["teacher"]), TeacherController.getById);

module.exports = router;
