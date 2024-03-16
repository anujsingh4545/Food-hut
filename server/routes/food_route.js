import Express from "express";

import Food from "../model/Food.js";
import "dotenv/config";

const router = Express.Router();

router.post("/upload", async (req, res) => {
  let {name, price, foodImage, category, weight, location, description} = req.body;

  if (!name) {
    return res.status(403).json({message: "Enter food name"});
  }
  if (!price) {
    return res.status(403).json({message: "Enter price please"});
  }
  if (!foodImage) {
    return res.status(403).json({message: "Enter Food image please"});
  }

  if (!category || !weight || !location || !description) {
    return res.status(403).send({
      message: "Fileds can't be empty",
    });
  }

  const newFood = new Food({
    name,
    price,
    foodImage,
    category,
    weight,
    location,
    description,
  });
  try {
    await newFood.save();

    return res.status(200).send({
      message: "Food added sucessfully!",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error occured please try again. ",
      success: false,
      error,
    });
  }
});

export default router;
