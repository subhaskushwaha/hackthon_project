const express = require("express");
const router = express.Router();
const StudentController = require("../../controller/student/studentController");
const auth = require("../../middleware/authMiddleware");

router.post("/profile", auth, StudentController.createProfile);
router.get("/profile", auth, StudentController.getProfile);
router.put("/profile", auth, StudentController.updateProfile);

router.post("/academic", auth, StudentController.createAcademic);
router.get("/academic", auth, StudentController.getAcademic);
router.put("/academic", auth, StudentController.updateAcademic);

module.exports = router;
