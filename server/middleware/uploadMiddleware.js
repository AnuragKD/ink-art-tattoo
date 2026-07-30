import multer from 'multer';
import path from 'path';

// Use Memory Storage so files are not saved to local disk, but uploaded directly to Cloudinary
const storage = multer.memoryStorage();

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp|avif|gif|svg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname || mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only (jpg, jpeg, png, webp, avif, gif, svg)!'));
  }
}

export const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});
