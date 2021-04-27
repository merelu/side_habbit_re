const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const config = require("./config/key");
const apiRouter = require("./routes/api");
const app = express();
const port = 5000;
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", apiRouter);
app.get("/", (req, res) => {
  res.send("Hello World!~~~~~");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
