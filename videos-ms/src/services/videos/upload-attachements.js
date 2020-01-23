const multer = require('multer');
const path = require('path');
const { BadRequest } = require('@feathersjs/errors');

let uploadDir = path.resolve(__dirname + '../../../../public/uploads');

// store file on memory to use it later
const uploadDisk = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    let ext = path.extname(file.originalname);
    let name = `${new Date().getTime()}${ext}`;
    cb(null, name);
  }
});

const storage = multer({ storage: uploadDisk });
// set feilds to fetch from the request
const attachementsUploader = storage.fields([
  { name: 'poster_file', maxCount: 1 },
  { name: 'video_file', maxCount: 1 }
]);

// make poster info acceable to feathers
const attachementToBody = (req, res, next) => {
  if (req.method === 'POST') {
    if (req.files.poster_file != undefined) {
      req.feathers.poster_info = req.files['poster_file'][0];
    } else {
      throw new BadRequest('validation error', {
        poster_file: ['poster file is required']
      });
    }
    if (req.files.video_file != undefined) {
      req.feathers.video_info = req.files['video_file'][0];
    } else {
      throw new BadRequest('validation error', {
        video_file: ['video file is required']
      });
    }
  }
  next();
};

module.exports = {
  attachementsUploader,
  attachementToBody
};
