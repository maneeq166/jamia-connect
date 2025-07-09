const mongoose = require("mongoose");

const pyq = new mongoose.Schema(
  {
    department: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    url: {
      url: { type: String },
      public_id: String,
    },
    content: String,
  },
  { timestamps: true }
);

const Pyq = mongoose.model("pyq", pyq);

module.exports = {
  Pyq,
};
