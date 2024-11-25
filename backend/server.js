require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const connectDb = require("./utils/db.js");

if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "frontend", "build");
  app.use(express.static(buildPath));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(buildPath, "index.html"));
  });
} else {
  // In development mode, serve this message on the root route
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(cors());
app.use(express.json());
app.use("/api/", require("./Routes/CreateUser.js"));
app.use("/api/", require("./Routes/DisplayData.js"));
app.use("/api/", require("./Routes/OrderData.js"));

connectDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server is running at port:${process.env.PORT}`);
  });
});
