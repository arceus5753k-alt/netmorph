const express = require("express");
const router = express.Router();
const MockRule = require("../models/MockRule");

// CREATE RULE
router.post("/rules", async (req, res) => {
  try {
    const { name, endpoint, method, response, delay, enabled ,statusCode, query} = req.body;

    const rule = new MockRule({
      name,
      endpoint,
      method,
      response,
      delay,
      enabled,
      statusCode,
      query
    });

    await rule.save();

    res.status(201).json({
      message: "Rule created successfully",
      rule
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating rule",
      error: error.message
    });
  }
});


// FETCH RULES

router.get("/rules", async (req, res) => {
  try {
    const rules = await MockRule.find();
    res.status(200).json({
      message: "Rules fetched successfully",
      rules
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching rules",
      error: error.message
    });
  }
});


//DELETE

router.delete("/rules/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const rule = await MockRule.findByIdAndDelete(id);
    if (!rule) {
      return res.status(404).json({
        message: "Rule not found"
      });
    }
    res.status(200).json({
      message: "Rule deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting rule",
      error: error.message
    });
  }
});


// ENABLE/DISABLE A RULE

router.patch("/rules/:id/toggle", async (req, res) => {
  try {
    const { id } = req.params;
    const rule = await MockRule.findById(id);
    if (!rule) {
      return res.status(404).json({
        message: "Rule not found"
      });
    }
    rule.enabled = !rule.enabled;
    await rule.save();
    res.status(200).json({
      message: "Rule updated successfully",
      rule
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating rule",
      error: error.message
    });
  }
});


module.exports = router;