# pdf_to_image_convert
This Node.js project allows users to upload PDF files, which are then converted into images (one per page). The app uses express for the server, express-fileupload for file uploads, and ejs for the upload interface.

**Features**

Upload PDF files through a web interface.
Convert PDF pages to images (PNG format).
Images are organized by PDF name and page number.

**npm install**

**npm start**

**Folder Structure**
/pdf-to-image-conversion
  ├── converted/      # Folder for saved images
  ├── views/          # EJS view for the upload form
  ├── server.js       # Server code
  └── package.json     # Project dependencies


