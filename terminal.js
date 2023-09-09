const http = require('http');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', (data) => {
      body += data;
    });

    req.on('end', () => {
      const command = body.trim();

      if (!command) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad Request');
        return;
      }

      exec(command, (error, stdout, stderr) => {
        if (error) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end(`Error: ${error.message}`);
          return;
        }

        if (stderr) {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(`Error: ${stderr}`);
          return;
        }

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(stdout);
      });
    });
  } else {
    // Serve the HTML file
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, 'utf-8', (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
