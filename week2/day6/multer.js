const express = require('express');
const multer  = require('multer');
const PORT = 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const ext = file.mimetype.split('/')[1];
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext)
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG and PNG files are allowed!'), false);
    }
};
  
const upload = multer({ storage, fileFilter });

const app = express();

app.post('/upload', upload.single('avatar'), (req, res, next) => {
    res.json(req.file);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


