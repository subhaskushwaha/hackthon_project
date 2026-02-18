const router = require("express").Router();
const StudentController = require("../../controller/student/studentController");
const auth = require("../../middleware/authMiddleware");

router.post("/", auth(["student"]), StudentController.create);
router.put("/", auth(["student"]), StudentController.update);
router.get("/me", auth(["student"]), StudentController.getProfile);

module.exports = router;