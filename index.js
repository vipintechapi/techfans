const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require("cors")
const cookieParser = require("cookie-parser")

app.use(cookieParser())

app.use(cors({ origin: "*" || ["*"] || [""] }))

app.use(express.json())

// Load environment variables from a .env file
dotenv.config();

// database
const database = require("./database")
database()

// Create an instance of the Express server

// Define a route for the root of the server
app.get('/', (req, res) => {
  res.send('Hello Ths is Tech Fans Site!');
});

// uses routes
const category = require("./routes/category")
const posts = require("./routes/posts")
const users = require("./routes/users")
app.use("/api/category", category)
app.use("/api/posts", posts)
app.use("/api/users", users)


// Start the server and listen on a port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
