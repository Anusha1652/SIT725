const express = require("express");
const app = express();

// Serve static files from the "public" directory
app.use(express.static(__dirname + '/public'));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log("App listening on port: " + port);
});
