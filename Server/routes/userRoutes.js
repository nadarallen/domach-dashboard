// /server/routes/userRoutes.js
const express = require("express");
const router = express.Router();

// Sample GET route — you can customize this as needed
router.get("/", (req, res) => {
  res.json({ message: "User route is working!" });
});

// Sample POST route (e.g., create user)
router.post("/create", (req, res) => {
  const { name, email } = req.body;
  // Normally you'd save this to the DB
  res.status(201).json({ message: `User ${name} created.`, email });
});

module.exports = router;
