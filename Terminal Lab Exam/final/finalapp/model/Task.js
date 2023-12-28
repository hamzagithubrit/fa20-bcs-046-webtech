// routes/task.js

const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Task = require("../models/task");
router.post(
  "/tasks",
  [
    // Validation middleware using express-validator
    body("title").notEmpty().trim().escape(),
    body("description").notEmpty().trim().escape(),
  ],
  async (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, return a 400 response with the errors
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Destructure title and description from the request body
      const { title, description } = req.body;

      const task = new Task({ title, description, completed: false });

      await task.save();

      res.redirect("/");
    } catch (error) {
      next(error);
    }
  }
);

// Other routes for reading, updating, and deleting tasks can be defined here

module.exports = router;
