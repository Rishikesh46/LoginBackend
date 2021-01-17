const express = require("express");
//custom inports
const { signupUser } = require("../controllers/signUpUser");
const { loginUser } = require("../controllers/loginUser");
//middlewares
const {
  checkRequestBody,
  isEmailValid,
  checkConfirmPassword,
  createPasswordHash,
  isUserRegistered,
} = require("../middleware/userMiddleware");
const router = express.Router();
router
  .route("/signup")
  .post(
    checkRequestBody,
    isEmailValid,
    checkConfirmPassword,
    createPasswordHash,
    signupUser
  );
router.route("/login").post(checkRequestBody, isUserRegistered, loginUser);

//export router
module.exports = router;
