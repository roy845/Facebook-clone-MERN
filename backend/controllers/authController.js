const {
  hashPassword,
  comparePassword,
  generateResetPasswordToken,
} = require("../helpers/authHelper");

const { sendEmail, sendEmailResetPassword } = require("../helpers/sendEmail");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { username, email } = req.body;

    const existingUser = await User.findOne({ username });
    const existingUserByEmail = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "User already exists please login",
      });
    }

    if (existingUserByEmail) {
      return res.status(409).send({
        success: false,
        message:
          "Email is already in use. Please use a different email address.",
      });
    }

    const hashedPassword = await hashPassword(req.body.password);

    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
    }).save();

    const token = jwt.sign(
      {
        UserInfo: {
          _id: newUser.id,
          username: newUser.username,
          isAdmin: newUser.isAdmin,
        },
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    const { password, ...userInfo } = newUser._doc;
    await sendEmail(
      email,
      "Welcome to Facebook site",
      `
      <p>You recently registered to our site</p>
      <p>Save your details in order to connect</p>
      <p>Have a great day!</p>
    `
    );
    res.status(201).send({
      success: true,
      message: `User ${newUser.username} Register Successfully`,
      userInfo,
      token,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Registration", error });
  }
};

const loginController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !req.body.password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Username is not registered",
      });
    }

    const match = await comparePassword(req.body.password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = jwt.sign(
      {
        UserInfo: {
          _id: user.id,
          username: user.username,
          isAdmin: user.isAdmin,
        },
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    const { password, ...userInfo } = user._doc;

    res.status(200).send({
      success: true,
      message: "login successfully",
      userInfo,
      token,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "User not found" });
  } else {
    const token = generateResetPasswordToken();

    const passwordResetTokenDetails = {
      email,
      token,
      expiresAt: new Date(Date.now() + 900000),
    };

    user.resetTokenDetails = passwordResetTokenDetails;

    await user.save();

    try {
      await sendEmailResetPassword(email, token);
      res.json({ message: "Email sent" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error sending email" });
    }
  }
};

const resetPasswordController = async (req, res) => {
  const { token, password } = req.body;
  console.log(token, password);

  const user = await User.findOne({
    "resetTokenDetails.token": token,
    "resetTokenDetails.expiresAt": { $gt: new Date() },
  });

  if (!user) {
    res.status(400).json({ message: "Invalid or expired token" });
  } else {
    const hashedPassword = await hashPassword(password);

    const updatedUser = await User.updateOne(
      { _id: user._id },
      { password: hashedPassword }
    );

    user.resetTokenDetails = {};
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  }
};

module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
};
