const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.user) {
    res.redirect("/home");
  } else {
    res.redirect("/log-in");
  }
});

module.exports = router;
