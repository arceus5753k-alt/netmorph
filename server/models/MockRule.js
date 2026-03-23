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
    response : {
      type : mongoose.Schema.Types.Mixed,
      required : true,
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
    statusCode : {
      type : Number,
      default : 200,
    },
    query : {
      type : Object,
      default : {},
    }
  },
  { timestamps: true },
);

module.exports = mongoose.model("MockRule", mockRuleSchema);
