const express = require("express");
const { register, login } = require("../controllers/authController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Protected Routes
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to your profile", user: req.user });
});

// Role-based access example (Admin only)
router.get("/admin", authMiddleware, roleMiddleware(["isAdmin"]), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

module.exports = router;

