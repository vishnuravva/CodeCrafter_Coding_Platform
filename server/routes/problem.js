// Import required modules
const express = require("express");
const Problem = require("../models/Problem");

// Create an Express router
const router = express.Router();

// Define the POST route
router.post("/addproblems", async (req, res) => {
  try {
    const {
      title,
      difficulty,
      challengeStatement,
      examples,
      constraints,
      testcases,
    } = req.body;

    // Add new problem to the database
    console.log("Adding problem...");
    // Assuming you have a Mongoose model named Problem
    const newProblem = await Problem.create({
      title,
      difficulty,
      challengeStatement,
      examples,
      constraints,
      testcases,
    });

    console.log("Problem added successfully");
    // Return a success response with the newly created problem
    return res
      .status(201)
      .json({ message: "Problem added successfully", problem: newProblem });
  } catch (error) {
    // Handle errors
    console.error("Error adding problem:", error);
    return res.status(500).json({ message: "Error adding problem", error });
  }
});

router.get("/getproblems", async (req, res) => {
  try {
    // Retrieve all problems from the database
    const problems = await Problem.find({});
    // Return the list of problems as JSON response
    return res.status(200).json(problems);
  } catch (error) {
    // Handle errors
    console.error("Error fetching problems:", error);
    return res.status(500).json({ message: "Error fetching problems", error });
  }
});
router.delete("/deletechallenge/:challengeid", async (req, res) => {
  try {
    // Retrieve all problems from the database

    const { challengeid } = req.params;

    await Problem.findByIdAndDelete(challengeid);
    // Return the list of problems as JSON response
    return res.status(200).json({ message: "Problem deleted successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error fetching problems:", error);
    return res.status(500).json({ message: "Error fetching problems", error });
  }
});

router.put("/updatechallenge/:challengeid", async (req, res) => {
  try {
    const { challengeid } = req.params;
    const { title, description, difficulty } = req.body;

    // Find the challenge by its ID and update it
    await Problem.findByIdAndUpdate(challengeid, {
      title: title,
      description: description,
      difficulty: difficulty,
    });

    // Return a success response
    return res.status(200).json({ message: "Challenge updated successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error updating challenge:", error);
    return res.status(500).json({ message: "Error updating challenge", error });
  }
});

router.get("/getproblems/:id", async (req, res) => {
  try {
    // Retrieve all problems from the database
    const id = req.params.id;

    const problem = await Problem.findById(id);
    // Check if the problem exists
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Return the problem as JSON response
    return res.status(200).json(problem);
  } catch (error) {
    // Handle errors
    // console.error("Error fetching problems:", error);
    return res.status(500).json({ message: "Error fetching problems", error });
  }
});

// Export the router
module.exports = router;
