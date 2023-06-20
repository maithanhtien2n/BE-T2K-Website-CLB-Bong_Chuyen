const multer = require("multer");
const path = require("path");
const fs = require("fs");

const successResponse = (res) => {
  return {
    success: true,
    statusCode: 200,
    statusValue: "OK",
    data: res,
  };
};

const errorResponse = ({ statusCode, statusValue }) => {
  return {
    success: false,
    statusCode,
    statusValue,
    data: null,
  };
};

const throwError = (statusCode, statusValue) => {
  throw {
    statusCode,
    statusValue,
  };
};

const checkNull = (body, fields) => {
  const missingFields = [];
  fields.forEach((field) => {
    if (!body[field] || body[field].trim() === "") {
      missingFields.push(field);
    }
  });
  if (missingFields.length > 0) {
    throw {
      statusCode: 240,
      statusValue: "Lỗi code không kiểm tra null!",
    };
  }
};

// Upload file
const UPLOAD_DIR = path.resolve(__dirname, "../images");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}-${Date.now()}`);
    },
  }),
});

// Load file
const loadFileImage = (req, res) => {
  const fileName = req.params.name;
  const options = {
    root: path.resolve(__dirname, "../images"),
    headers: {
      "Content-Type": "image", // thay đổi định dạng file tương ứng với loại file bạn muốn trả về (vd: image/png, image/gif)
    },
  };
  res.sendFile(fileName, options, (err) => {
    if (err) {
      console.error(err);
      res.status(500).end();
    }
  });
};

const loadFileVideo = (req, res) => {
  const fileName = req.params.name;
  const options = {
    root: path.resolve(__dirname, "../videos"),
    headers: {
      "Content-Type": "video", // thay đổi định dạng file tương ứng với loại file bạn muốn trả về (vd: image/png, image/gif)
    },
  };
  res.sendFile(fileName, options, (err) => {
    if (err) {
      console.error(err);
      res.status(500).end();
    }
  });
};

// Delete file
const deleteFile = (fileName) => {
  fs.unlink(path.resolve(__dirname, `../images/${fileName}`), (err) => {
    if (err) {
      throw err;
    }
  });
};

module.exports = {
  successResponse,
  errorResponse,
  checkNull,
  throwError,
  upload,
  loadFileImage,
  loadFileVideo,
  deleteFile,
};
