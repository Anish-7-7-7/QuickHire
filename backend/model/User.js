const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  title: { type: String, default: "Backend Developer" },
  location: { type: String, default: "India" },
  bio: {
    type: String,
    default: "Passionate developer with experience in building scalable APIs."
  },
  skills: {
    type: [String],
    default: ["Node.js", "Express", "MongoDB", "JWT"]
  }
});

module.exports = mongoose.model("User", userSchema);
