const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

const Task = mongoose.model("Task", {
  title: String,
  description: String,
  completed: Boolean,
});

router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.render("index", { tasks });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    res.render("task", { task });
  } catch (error) {
    next(error);
  }
});

router.get("/new", (req, res) => {
  res.render("new");
});

router.post(
  "/",
  [
    body("title").notEmpty().trim().escape(),
    body("description").notEmpty().trim().escape(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description } = req.body;
      const task = new Task({ title, description, completed: false });
      await task.save();
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id/edit", async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    res.render("edit", { task });
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  [
    body("title").notEmpty().trim().escape(),
    body("description").notEmpty().trim().escape(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description } = req.body;
      await Task.findByIdAndUpdate(req.params.id, { title, description });
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
