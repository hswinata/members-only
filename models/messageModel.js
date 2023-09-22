const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Message = mongoose.model(
  "Message",
  new Schema({
    title: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    text: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  })
);

module.exports = Message;
