require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDb = require("./utils/db.js");

const PORT = 5000;

app.get("/", (req, res) => {
  res.status(200).send("welcome to home page");
});

app.use(cors());
app.use(express.json());
app.use("/api/", require("./Routes/CreateUser.js"));
app.use("/api/", require("./Routes/DisplayData.js"));
app.use("/api/", require("./Routes/OrderData.js"));

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port:${PORT}`);
  });
});
