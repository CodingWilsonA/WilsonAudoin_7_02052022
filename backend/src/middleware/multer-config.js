const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

const maxSize = 500000;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

const imageUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (MIME_TYPES.hasOwnProperty(file.mimetype)) {
      cb(null, true);
    } else {
      const error = new Error("INVALID_FILE_TYPE");
      return cb(error, false);
    }
  },
  limits: {
    fileSize: maxSize,
  },
});

const imageValidationErrorHandler = (err, req, res, next) => {
  if (err.message === "INVALID_FILE_TYPE") {
    res.status(422).json({ message: "INVALID_FILE_TYPE" });
  }
};

module.exports = { imageUpload, imageValidationErrorHandler };
