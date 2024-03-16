import Express, {Router} from "express";
import User from "../model/User.js";

const router = Router();

router.post("/profile", async (req, res) => {
  const {name, email, user_id, ProfileImage} = req.body;

  try {
    const profile = await User.findById(user_id);

    if (name) {
      profile.name = name;
    }

    if (ProfileImage) {
      profile.profileImage = ProfileImage;
    }
    await profile.save();

    const newprofile = await User.findById(user_id);

    return res.status(200).send({
      user: newprofile,
      message: "Profile Sucessfully updated",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({message: "Server problem, try again!", error, success: false});
  }
});

export default router;
