require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const connectDb = require("./utils/db.js");

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../frontend/build"); // Adjust path for monorepos
  app.use(express.static(buildPath));

  app.get("*", (req, res) => {
    const indexPath = path.resolve(buildPath, "index.html");
    res.sendFile(indexPath, (err) => {
      if (err) {
        res
          .status(500)
          .send(
            "Error serving index.html. Please check if the build folder exists."
          );
      }
    });
  });
} else {
  // Serve a default response in development mode
  app.get("/", (req, res) => {
    res.send("API is running in development mode...");
  });
}

// API Routes
app.use("/api/", require("./Routes/CreateUser.js"));
app.use("/api/", require("./Routes/DisplayData.js"));
app.use("/api/", require("./Routes/OrderData.js"));

// Connect to the database and start the server
connectDb()
  .then(() => {
    const PORT = process.env.PORT || 5000; // Default port if not specified in .env
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit the process if DB connection fails
  });
