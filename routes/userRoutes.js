const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");
const authController = require("../controllers/authController");

// GET signup form
router.get("/sign-up", userController.getSignupForm);

// POST signup form
router.post("/sign-up", userController.postSignupForm);

// GET login form
router.get("/log-in", userController.getLoginForm);

// POST login form
router.post("/log-in", userController.postLoginForm);

// GET logout request
router.get("/log-out", userController.getLogoutRequest);

// GET request for user detail
router.get("/user/:id", userController.getUserDetail);

// GET membership form page
router.get("/user/:id/membership", userController.getMembership);

// PATCH: change membership status to true
router.post("/user/:id/membership/update", userController.patchMembership);

// GET User Edit Form
router.get("/user/:id/edit", userController.getUserEdit);

// PATCH: change User Details
router.post("/user/:id/edit", userController.patchUser);

module.exports = router;
