const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const helmet = require("helmet");
const hpp = require("hpp");
const path = require("path");

dotenv.config();

const userRouter = require("./routes/user");
const habbitRouter = require("./routes/habbit");
const commitRouter = require("./routes/commit");

const passportConfig = require("./passport");
const connect = require("./models");
const { isLoggedIn } = require("./routes/middlewares");

const app = express();

const port = process.env.PORT || 5000;
app.set("PORT", port);
//mongoose
connect();

passportConfig();

const prod = process.env.NODE_ENV === "production";

if (prod) {
  app.enable("trust proxy");
  app.use(morgan("combined"));
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  app.use(hpp());
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
}
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    // sameSite: "none",
    // secure: true,
    // proxy: true,
  },
};
// if (prod) {
//   sessionOption.cookie.secure = true;
//   sessionOption.cookie.proxy = true;
// }
app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());

//router
app.use("/api/users", userRouter);
app.use("/api/habbits", habbitRouter);
app.use("/api/commits", commitRouter);

app.get("/session", isLoggedIn, function (req, res) {
  let userInfo = req.user;
  console.log(userInfo);
  res.json({
    type: "info",
    message: "session OK!",
  });
});

app.listen(app.get("PORT"), () => {
  console.log(`listening on port ${app.get("PORT")}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
