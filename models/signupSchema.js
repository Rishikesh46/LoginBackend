//mongoose schema
const mongoose = require("mongoose");
const uniquid = require("uniquid");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: uniquid(),
  },
  name: {
    type: String,
    required: [true, "Enter first name"],
    validate: [
      {
        validator: function () {
          return this.name.trim().length;
        },
        message: "First name cannot be empty",
      },
      {
        validator: function () {
          const re = /<("[^"]?"|'[^']?'|[^'">])*>/;
          if (re.test(this.name)) {
            return false;
          }
        },
        message: "Content cannot be HTML",
      },
    ],
  },
  email: {
    type: String,
    required: [true, "Enter your email. "],
    unique: [true, "Email Id already exist. "],
    validate: [
      {
        validator: function () {
          return this.email.trim().length;
        },
        message: " Email should not be empty",
      },
      {
        validator: function () {
          const re = /<("[^"]?"|'[^']?'|[^'">])*>/;
          if (re.test(this.email)) {
            return false;
          }
        },
        message: "Content cannot be HTML",
      },
      {
        validator: function () {
          const re = /<("[^"]?"|'[^']?'|[^'">])*>/;
          if (re.test(this.email)) {
            return false;
          }
        },
        message: "Email id  not valid",
      },
    ],
  },
  password: {
    type: String,
    required: [true, "Enter password"],
  },
});
let User = mongoose.model("User", userSchema);
module.exports = User;
