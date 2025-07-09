const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "pyq"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueName = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// File filter for PDF only
const checkFileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDFs are allowed!"), false);
  }
};

// Multer instance
const uploadPyqMiddleware = multer({
  storage: storage,
  fileFilter: checkFileFilter,
  limits: {
    fileSize: 1 * 1024 * 1024, // 1MB max
  },
});

// Export
module.exports = { uploadPyqMiddleware };
