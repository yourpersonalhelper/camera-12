// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Настройка хранилища для multer
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.png';
    cb(null, `${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });

app.use(express.static('public'));

// Роут для приёма фото
app.post('/upload', upload.single('photo'), (req, res) => {
  if (!req.file) return res.status(400).send('No file');
  console.log('Received file:', req.file.filename);
  res.json({ ok: true, filename: req.file.filename });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

