const bcrypt = require("bcryptjs");
const User = require("../models/signupSchema");
const sendErrorMessage = require("../helpers/sendError");
const AppError = require("../helpers/appError");

//middleware
const checkRequestBody = (req, res, next) => {
  let validationArray = [];
  switch (req.url) {
    case "/signup":
      validationArray = ["name", "email", "password", "confirmPassword"];
      break;
    case "/login":
      validationArray = ["email", "password"];
      break;
  }
  next();
};

const isEmailValid = (req, res, next) => {
  next();
};

const checkConfirmPassword = (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return sendErrorMessage(
      new AppError(
        400,
        "Unsuccessful",
        "Confirm password & password did not match."
      ),
      req,
      res
    );
  }
  next();
};
//create password hash
const createPasswordHash = async (req, res, next) => {
  try {
    let salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    next();
  } catch (err) {
    return sendErrorMessage(
      new AppError(500, "Unsuccessful", "Internal Server Error"),
      req,
      res
    );
  }
};
//to check if user is registered
const isUserRegistered = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      req.currentUser = user;
      if (!user) {
        return sendErrorMessage(
          new AppError(402, "Unsuccessful", "User not Registered"),
          req,
          res
        );
      }
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

//exporting middlewares
module.exports.checkRequestBody = checkRequestBody;
module.exports.isEmailValid = isEmailValid;
module.exports.checkConfirmPassword = checkConfirmPassword;
module.exports.createPasswordHash = createPasswordHash;
module.exports.isUserRegistered = isUserRegistered;
