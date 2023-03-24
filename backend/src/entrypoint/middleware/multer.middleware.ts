import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('application/octet-stream')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

export const uploadEventImageMiddleware = upload.single('eventImage');
