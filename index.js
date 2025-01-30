const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const port = 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Middleware
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max file size
}));

// Serve static files from the converted directory
app.use('/converted', express.static('converted'));

// Ensure converted directory exists
const convertedDir = path.join(__dirname, 'converted');
fs.mkdir(convertedDir, { recursive: true }).catch(console.error);

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/save-image', async (req, res) => {
  try {
    if (!req.files || !req.files.image || !req.body.pdfName || !req.body.pageNum) {
      return res.status(400).json({ error: 'Missing required data' });
    }

    const { image } = req.files;
    const { pdfName, pageNum } = req.body;
    
    // Create PDF-specific directory
    const pdfDir = path.join(convertedDir, pdfName.replace(/\.pdf$/, ''));
    await fs.mkdir(pdfDir, { recursive: true });

    // Save the image
    const imagePath = path.join(pdfDir, `page-${pageNum}.png`);
    await image.mv(imagePath);

    res.json({ success: true, path: imagePath });
  } catch (error) {
    console.error('Error saving image:', error);
    res.status(500).json({ error: 'Failed to save image' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});