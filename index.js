const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Configurar multer para manejar archivos
// Usar memoria storage para no guardar archivos en disco
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ruta principal - servir el HTML
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Endpoint para analizar archivos
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  // Verificar si se subió un archivo
  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }

  // Devolver metadata del archivo
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});