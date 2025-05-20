// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Configurar Multer
const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Rutas estáticas
app.use(express.static('public'));
app.use('/uploads', express.static('public/uploads'));

// Subir imagen
app.post('/upload', upload.single('image'), (req, res) => {
  res.status(200).send('Imagen subida');
});

// Obtener lista de imágenes
app.get('/images', (req, res) => {
  fs.readdir('public/uploads', (err, files) => {
    if (err) return res.status(500).json({ error: err });
    res.json(files);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
