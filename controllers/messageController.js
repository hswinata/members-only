const Message = require("../models/messageModel");
const { format } = require("date-fns");
const { body, validationResult } = require("express-validator");

//Handle rendering new message form
exports.getMessageForm = (req, res, next) => {
  const user = req.user;
  res.render("message-form", {
    userId: req.params.id,
    user: user,
  });
};

//Handle POST new message request
exports.postMessageForm = async (req, res, next) => {
  //Define validation rules
  const validationRules = [
    body("title", "Title is required").notEmpty().trim().escape(),
    body("text", "Text is required")
      .notEmpty()
      .trim()
      .escape()
      .isLength({ max: 200 }),
  ];

  //Run validations and collect errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("message-form", { errors: errors.array() });
  }

  try {
    const timestamp = new Date().toISOString();
    const message = new Message({
      title: req.body.title,
      text: req.body.text,
      timestamp: timestamp,
      user: req.user._id,
    });
    const savedMessage = await message.save();
    console.log("Message saved", savedMessage);

    res.redirect("/home");
  } catch (err) {
    console.error("Error saving message:", err);
    res.send(err);
  }
};

//Handle GET all messages
exports.getAllMessages = async (req, res, next) => {
  try {
    const messages =
      req.session.messages ||
      (await Message.find({}, "title timestamp text user")
        .sort({ timestamp: 1 })
        .populate("user")
        .exec());
    res.render("home", { user: req.user, messages: messages, format: format });
  } catch (err) {
    next(err);
  }
};

//Handle GET one message
exports.getOneMessage = async (req, res, next) => {
  try {
    const messageId = req.params.id;
    const message = await Message.findOne(
      { _id: messageId },
      "title timestamp text user"
    )
      .populate("user")
      .exec();
    res.render("message-detail", { message: message, user: req.user });
  } catch (err) {
    next(err);
  }
};

//Handle DELETE message request
exports.deleteMessage = async (req, res, next) => {
  const messageId = req.params.id;
  try {
    const deletedMessage = await Message.findByIdAndDelete(messageId);
    if (!deletedMessage) {
      return res.status(404).send("Message not found");
    }
    console.log(`Message ${messageId} deleted`);
    res.redirect("/home");
  } catch (err) {
    next(err);
  }
};
