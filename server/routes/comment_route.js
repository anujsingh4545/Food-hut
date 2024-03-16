import Express from "express";
import Food from "../model/Food.js";

const router = Express.Router();

router.patch("/uploadcomment", async (req, res) => {
  const {currentText, food_id, user_id, user_profile} = req.body;


  if (!food_id || !user_id || !user_profile) {
    return res.status(403).send({
      message: "Food id and user id not there.",
      success: false,
    });
  }

  const review = {
    userid: user_id,
    userProfile: user_profile,
    comment: currentText,
    time: new Date(),
  };

  try {
    const food = await Food.findById(food_id);

    if (!food) {
      return res.status(404).json({message: "Food item not found", success: false});
    }

    food.reviews.push(review);

    await food.save();

    return res.status(200).json({message: "Review added successfully", success: true});
  } catch (error) {
    return res.status(404).send({
      message: error,
      success: false,
    });
  }
});

router.get("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const data = await Food.findById(id)
      .select("reviews")
      .lean() // Convert Mongoose document to plain JavaScript object
      .exec();

    // Sort reviews based on the time field
    const sortedReviews = data.reviews.sort((a, b) => new Date(b.time) - new Date(a.time));
    return res.status(200).json(sortedReviews);
  } catch (e) {
    res.status(500).json({message: "Internal server error"});
  }
});

export default router;
