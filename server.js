import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from App01
//app.use('/App01', express.static(path.join(__dirname, 'App01')));
app.use('/ProjectTSApp', express.static(path.join(__dirname, 'ProjectTSApp')));

// API endpoint to return JSON
app.get('/api/users', (req, res) => {
  res.json({
    users: [
      { id: 1, name: 'Mock User 1' },
      { id: 2, name: 'Mock User 2' }
    ]
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
