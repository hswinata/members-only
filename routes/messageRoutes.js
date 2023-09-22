const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

//GET New Message Form
router.get("/messages/:id/new", messageController.getMessageForm);

//GET all messages
router.get("/home", messageController.getAllMessages);

//GET one message
router.get("/message/:id", messageController.getOneMessage);

//POST New Message Form
router.post("/messages/:id/new", messageController.postMessageForm);

// DELETE message
router.post("/delete-message/:id", messageController.deleteMessage);

module.exports = router;
