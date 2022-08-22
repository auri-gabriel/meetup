const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
});

module.exports.upload = upload;

module.exports.handleAvatar = (avatars) => async (req, res, next) => {
  if (!req.file) return next();
  if (req.file.mimetype !== 'image/png' && 'image/jpeg') {
    return next(new Error('File format is not supported!'));
  }

  req.file.storeFilename = await avatars.store(req.file.buffer);

  return next();
};
