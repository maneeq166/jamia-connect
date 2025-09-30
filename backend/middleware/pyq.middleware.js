const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure pyq folder exists
const uploadDir = path.join(__dirname, "../pyq");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
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
    fileSize: 2 * 1024 * 1024, // 2MB max
  },
});

// Export
module.exports = { uploadPyqMiddleware };
