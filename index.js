const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.routes");
const clientRouter = require("./routes/client.routes");
const orderRouter = require("./routes/order.routes");
const corsMiddleware = require("./middleware/cors.middleware");

const app = express();
const PORT = process.env.PORT || config.get("serverPort");

app.use(corsMiddleware);
app.use(express.json());
app.use(express.static("static"));
app.use("/api/auth", authRouter);
app.use("/api/client", clientRouter);
app.use("/api/orders", orderRouter);

const start = async () => {
  try {
    await mongoose.connect(config.get("dbURL"));
    app.listen(PORT, () => {
      console.log("Server running on PORT: ", PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
