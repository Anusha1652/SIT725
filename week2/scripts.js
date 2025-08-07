const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve index.html on the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Handle /add route
app.get('/add', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.send('<h2>Error: Please provide valid numbers.</h2>');
  }

  const sum = num1 + num2;
  res.send(`<h2>Result: ${num1} + ${num2} = ${sum}</h2><br><a href="/">Go back</a>`);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
