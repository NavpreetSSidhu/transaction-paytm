const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const morgan = require("morgan");
const cors = require("cors");
const rootRouter = require("./routes");

dotenv.config();
connectDb();
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// routes
app.use("/api/v1", rootRouter);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to my paytm app</h1>");
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
