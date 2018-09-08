const express = require("express");
const http = require("http");
const bottle = require("./bottle");

const fireRoutes = require("./routes/fire");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/fire", fireRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const port = "5000";
app.set("port", port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));

bottle.fireManager.initialize();
