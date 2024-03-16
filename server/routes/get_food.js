import Express from "express";
import Food from "../model/Food.js";
import "dotenv/config";

const router = Express.Router();

router.get("/food_menu", async (req, res) => {
  try {
    const data = await Food.find({}).sort({updatedAt: -1}).exec();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
});

router.get("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const data = await Food.findById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
});

export default router;
