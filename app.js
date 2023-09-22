const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
require("dotenv").config();

const indexRouter = require("./routes/index");
const userRouter = require("./routes/userRoutes");
const messageRouter = require("./routes/messageRoutes");
const db = require("./config/database");
const app = express();

//Initialize session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

//Use express-flash middleware
app.use(flash());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use(userRouter);
app.use(messageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
