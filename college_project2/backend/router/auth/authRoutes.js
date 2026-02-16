const express = require("express");
const router = express.Router();

const registerController = require("../../controller/auth/registerController");
const loginController = require("../../controller/auth/loginController");

router.post("/register", registerController.register);
router.post("/login", loginController.login);

module.exports = router;
