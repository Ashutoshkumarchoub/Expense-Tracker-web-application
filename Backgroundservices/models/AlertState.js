
const mongoose = require("mongoose");

const alertStateSchema = new mongoose.Schema(
  {
    alertType: {
      type: String,
      required: true,
      unique: true,
      default: "expense_threshold",
    },
    isAboveThreshold: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AlertState", alertStateSchema);
