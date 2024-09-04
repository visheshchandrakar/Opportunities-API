require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Opportunity = require("./models/Opportunity.model"); // Assuming the schema is saved in models/Opportunity.model.js

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("Backend API for Opportunity Section 💻");
});

// Create new Opportunity
app.post("/opportunity", async (req, res) => {
  try {
    const { opportunityName } = req.body;

    console.log("Checking opportunity name:", opportunityName);

    // Check if opportunityName already exists
    const existingOpportunity = await Opportunity.findOne({ opportunityName });
    console.log("Existing opportunity:", existingOpportunity);

    if (existingOpportunity) {
      return res.status(400).json({ message: "Opportunity name already exists" });
    }

    const newOpportunity = new Opportunity(req.body);
    await newOpportunity.save();
    res.status(201).send(newOpportunity);
  } catch (error) {
    console.error("Error creating opportunity:", error); // Added error logging
    res.status(400).send({ message: "Failed to create opportunity", error });
  }
});

// Get all opportunities
app.get("/opportunities", async (req, res) => {
  try {
    const opportunities = await Opportunity.find();
    res.status(200).json(opportunities);
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    res.status(500).send({ message: "Failed to fetch opportunities", error });
  }
});

// Get a single opportunity by ID
app.get("/opportunity/:id", async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }
    res.status(200).json(opportunity);
  } catch (error) {
    console.error("Error fetching opportunity:", error);
    res.status(500).send({ message: "Failed to fetch opportunity", error });
  }
});

// Update an opportunity by ID
app.put("/opportunity/:id", async (req, res) => {
  try {
    const updatedOpportunity = await Opportunity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOpportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }
    res.status(200).json(updatedOpportunity);
  } catch (error) {
    console.error("Error updating opportunity:", error);
    res.status(500).send({ message: "Failed to update opportunity", error });
  }
});

// Delete an opportunity by ID
app.delete("/opportunity/:id", async (req, res) => {
  try {
    const deletedOpportunity = await Opportunity.findByIdAndDelete(req.params.id);
    if (!deletedOpportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }
    res.status(200).json({ message: "Opportunity deleted successfully" });
  } catch (error) {
    console.error("Error deleting opportunity:", error);
    res.status(500).send({ message: "Failed to delete opportunity", error });
  }
});

mongoose
  .connect(process.env.MONGODB_URI)
    
  .then(() => {
    console.log("Connected to database");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
