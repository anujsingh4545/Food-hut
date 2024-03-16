import express from "express";
import User from "../model/User.js";
import "dotenv/config";

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({_id: req.body.userId});
    if (!user) {
      return res.status(403).send({
        message: "user not found",
        success: false,
      });
    } else {
      return res.status(200).send({
        user: user,
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Auth error",
      success: false,
    });
  }
};

export default getUser;
