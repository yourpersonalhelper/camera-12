const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
// На Render нужно использовать process.env.PORT
const PORT = process.env.PORT || 3000;

// Папка для хранения фото
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Настройка multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '.png');
  }
});
const upload = multer({ storage });

app.use(express.static('public'));

// Роут для приёма фото
app.post('/upload', upload.single('photo'), (req, res) => {
  if (!req.file) return res.status(400).send('No file received');
  console.log('Получено фото:', req.file.filename);
  res.json({ ok: true, filename: req.file.filename });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
