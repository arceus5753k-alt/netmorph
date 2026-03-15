const mongoose = require("mongoose");
const mockRuleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    endpoint: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      enum: ["GET", "POST", "PUT", "DELETE"],
      required: true,
    },
    delay: {
      type: Number,
      default: 0,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  { timestamp: true },
);

module.exports = mongoose.model("MockRule", mockRuleSchema);
