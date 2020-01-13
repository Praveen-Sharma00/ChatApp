"use strict";

const Filter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|pdf|docx|doc)$/)) {
    req.fileValidationError = 'Only (jpg,gif,png,pdf,docx) files are allowed!';
    return cb(new Error('Only (jpg,gif,png,pdf,docx) files are allowed!'), false);
  }

  cb(null, true);
};

exports.Filter = Filter;