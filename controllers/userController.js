const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const Message = require("../models/messageModel");
const session = require("express-session");
const { format } = require("date-fns");

//Handle GET signup form
exports.getSignupForm = (req, res) => {
  //Check if errors were passed as query parameters
  const errors = req.query.errors
    ? [{ msg: "User already exist, please use another email address." }]
    : [];

  const username = req.query.username;
  res.render("signup-form", { errors, username });
};

//Handle POST signup form
exports.postSignupForm = async (req, res, next) => {
  //Define validation rules
  const validationRules = [
    body("first_name", "First name is required").notEmpty().escape(),
    body("last_name", "Last name is required").notEmpty().escape(),
    body("username", "Email is required")
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .trim()
      .escape(),
    body("password", "Password is required").notEmpty().trim().escape(),
    body("isAdmin", "isAdmin field is required").notEmpty().escape(),
  ];

  //Run validations and collect errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("signup-form", { errors: errors.array() });
  }

  try {
    const isAdmin = req.body.isAdmin === "on";
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: hashedPassword,
      membership: req.body.membership,
      isAdmin: isAdmin,
    });
    const savedUser = await user.save();
    console.log("User saved", savedUser);
    const username = req.body.username;
    return res.redirect(`/log-in?success=true&username=${req.body.username}`);
  } catch (err) {
    console.error("Error saving user:", err);

    //Render the signup form with a generic error message
    return res.redirect(`/sign-up?errors=true&username=${req.body.username}`);
  }
};

// Handle logins POST request
exports.postLoginForm = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      const errorMessage = "Username or Password incorrect!";
      return res.render("login", { errorMessage });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.session.user = user;
      return res.redirect("/home");
    });
  })(req, res, next);
};

//Handle logins GET request
exports.getLoginForm = (req, res, next) => {
  let errorMessage = "";
  const username = req.query.username;
  res.render("login", { username, errorMessage });
};

// Handle logout form POST
exports.getLogoutRequest = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

// Handle GET user detail
exports.getUserDetail = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne(
      { _id: userId },
      "first_name last_name username membership isAdmin"
    ).exec();

    const messages = await Message.find({ user: userId });

    res.render("user-detail", {
      user: user,
      messages: messages,
      format: format,
    });
  } catch (err) {
    next(err);
  }
};

// GET Membership
exports.getMembership = (req, res, next) => {
  const userId = req.params.id;
  res.render("membership-form", {
    userId: userId,
    user: req.user,
  });
};

// Handle Membership form PATCH
exports.patchMembership = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        membership: true,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send("User not found!");
    }
    console.log(" Membership changed:", updatedUser);
    res.redirect(`/user/${userId}`);
  } catch (err) {
    next(err);
  }
};

// GET User Edit Form
exports.getUserEdit = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne(
      { _id: userId },
      "first_name last_name username membership"
    ).exec();
    res.render("userEdit-form", { user: user });
  } catch (err) {
    next(err);
  }
};

// Handle User Edit
exports.patchUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
    });
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    console.log("User details updated:", updatedUser);
    res.status(200).redirect(`/user/${userId}`);
  } catch (err) {
    next(err);
  }
};
