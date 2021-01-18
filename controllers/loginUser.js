const bcrypt = require("bcryptjs");
const { generateToken } = require("../helpers/jwtAuth");
const User = require("../models/signupSchema");


const AppError = require("../helpers/appError");
const sendErrorMessage = require("../helpers/sendError");
const sendResponse = require("../helpers/sendResponse");


const loginUser = async (req, res, next) => {
  console.log("Current User", req.currentUser);
  console.log(req.body.password);
  console.log(req.currentUser.password);
 
    let result = await bcrypt.compare(
      req.body.password,
      req.currentUser.password
    );
  
  console.log(result);
  

    if (!result) {
      return sendErrorMessage(
        new AppError(401, "Unsuccessful", "Password is incorrect"),
        req,
        res
      );
    } else {
      sendResponse(200, "Succesfull", req.currentUser, req, res);
    }
  
  
    let jwtToken = await generateToken(
      { email: req.currentUser.email },
      process.env.JWT_SECRET
    );
    res.cookie("jwt", jwtToken);
    res.status(200).json({
      status: "Successful login",
      data: [
        {
          jwt: jwtToken,
        },
      ],
    });
};

module.exports.loginUser = loginUser;
