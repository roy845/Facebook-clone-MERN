const router = require("express").Router();

const {
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
} = require("../controllers/authController");

//Register || METHOD POST
router.post("/register", registerController);
//Login || METHOD POST
router.post("/login", loginController);
//FORGOT PASSWORD || METHOD POST
router.post("/forgotPassword", forgotPasswordController);
//FORGOT PASSWORD || METHOD POST
router.post("/resetPassword", resetPasswordController);

module.exports = router;
