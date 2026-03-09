const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const logger = require("../utils/logger");
    logger.info('MongoDB connected');
  } catch (err) {
    const logger = require("../utils/logger");
    logger.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
