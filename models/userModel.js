const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  membership: { type: Boolean, required: true },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

//Virtual property to populate user's messages
UserSchema.virtual("messages", {
  ref: "Message",
  localField: "_id",
  foreignField: "user",
});

//Virtual for user's URL
UserSchema.virtual("url").get(function () {
  return `/user/${this._id}`;
});

const User = mongoose.model("User", UserSchema);

//Export model
module.exports = User;
