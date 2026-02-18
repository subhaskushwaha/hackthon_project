const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./router/auth/authRoutes");
const assignmentRoutes = require("./router/assignment/assignmentRoutes");
const studentRoutes = require("./router/student/studentRoutes");
const teacherRoutes = require("./router/teacher/teacherRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);
app.use("/api/assignment", assignmentRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teachers", teacherRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});