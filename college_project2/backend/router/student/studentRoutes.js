const express = require("express");
const router = express.Router();
const StudentController = require("../../controller/student/studentController");

router.post("/", StudentController.create);
router.get("/:id", StudentController.getById);

module.exports = router;
