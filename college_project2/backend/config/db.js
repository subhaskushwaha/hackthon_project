const dotenv = require("dotenv");
dotenv.config();

const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/* Test DB connection on startup */
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ MySQL Database connected successfully");
    connection.release();
  } catch (error) {
    console.error("❌ MySQL connection failed:", error.message);
    process.exit(1); // app band kar do agar DB na mile
  }
})();

module.exports = db;
