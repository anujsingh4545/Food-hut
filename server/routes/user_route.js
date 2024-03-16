import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import User from "../model/User.js";
import "dotenv/config";
import validator from "validator";

const router = express.Router();

const formatdatatoSend = (newUser) => {
  // token to check user already logined before or not
  const token = jwt.sign({id: newUser._id}, process.env.JWTSECRET, {
    expiresIn: "1d",
  });
  return {
    message: "Registered Sucessfully!",
    user: newUser,
    token,
    success: true,
  };
};

// for register route

router.post("/register", async (req, res) => {
  let {name, email, password, passwordConfirm} = req.body;

  if (name & (name.length < 3)) {
    return res.status(403).json({message: "Fullname atleast should be 3 character long"});
  }

  if (!email.length) {
    return res.status(403).json({message: "email can't be empty"});
  }

  if (!validator.isEmail(email)) {
    return res.status(403).json({message: "email is inavalid"});
  }

  if (!password) {
    return res.status(403).json({message: "Password can't be empty"});
  }

  if (!(password === passwordConfirm)) {
    return res.status(403).json({message: "Password not matching"});
  }

  // Checking current user
  const existingUser = await User.findOne({email: email});

  if (existingUser) {
    return res.status(403).json({message: "User already exists"});
  } else {
    try {
      //If user not exists -- creating account

      // hash passwords using the bcrypt hashing algorithm
      //  salt, which is a random string of characters used as an additional input to the hashing function.
      // The higher the number of rounds, the more computationally intensive the hashing process becomes, which helps enhance the security of the hash.
      const salt = await bcrypt.genSalt(10);

      //checking if password and confirm password is same or not

      const hashPassword = await bcrypt.hash(req.body.password, salt);
      const confirmPassword = await bcrypt.hash(req.body.passwordConfirm, salt);

      password = hashPassword;
      passwordConfirm = confirmPassword;

      // generating otp
      const otp = otpGenerator.generate(6, {
        // generating otp for user
        digits: true,
        upperCase: false,
        specialChars: false,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
      });

      // creating mongoose User skelton
      const newUser = new User({
        name,
        email,
        profileImage: req.body.profileImage,
        password,
        passwordConfirm,
        otp: otp,
      });

      await newUser.save(); // saving User to mongodb

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.MAILNAME,
          pass: process.env.MAILPASS,
        },
      });

      const mailOptions = {
        from: "Food-Hut Web Tech",
        to: email,
        subject: "Otp for email verification.",
        text: `Your OTP for Food-Hut is ${otp}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({message: "Error sending mail ..."});
        } else {
          return res.status(201).json(formatdatatoSend(newUser));
        }
        //
      });
    } catch (error) {
      return res.status(500).json({message: "Server problem, try again!", error});
    }
  }

  //
});

// for singin route
router.post("/signin", async (req, res) => {
  let {email, password} = req.body;

  if (!email) {
    return res.status(403).json({message: "email can't be empty"});
  }
  if (!validator.isEmail(email)) {
    return res.status(403).json({message: "email is inavalid"});
  }
  if (!password) {
    return res.status(403).json({message: "password can't be empty"});
  }

  // checking if user exist with that email
  User.findOne({email: email}).then((user) => {
    if (!user) {
      return res.status(403).json({message: "email not found"});
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(503).json({message: "Error occurred while login please try again"});
      }
      if (!result) {
        return res.status(403).json({message: "Incorrect password"});
      } else {
        return res.status(200).json(formatdatatoSend(user));
      }
    });
  });
});

export default router;
