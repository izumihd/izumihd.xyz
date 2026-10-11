const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const projects = require('./data/projects');
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.get('/:page', (req, res, next) => {
  const page = req.params.page;
  if (page.includes('.') || page.includes('api')) {
    return next();
  }
  const filePath = path.join(__dirname, 'public', `${page}.html`);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
    }
  });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Website running on http://localhost:${PORT}`);
});