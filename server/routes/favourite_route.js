import Express, {Router} from "express";
import Favourite from "../model/Favourite.js";

const router = Router();

const pushFavFood = async (user_fav, fav_food, user_id) => {
  try {
    user_fav.Favourites.push(fav_food);
    await user_fav.save();

    const user_fav3 = await Favourite.findOne({userid: user_id});

    return user_fav3.Favourites;
  } catch (e) {
    return null;
  }
};

router.post("/food", async (req, res) => {
  const {user_id, food_id, name, img, price, category} = req.body;

  if (!user_id || !food_id || !name || !img || !price || !category) {
    return res.status(404).send({message: "Some data missing", success: false});
  }

  try {
    const user_fav = await Favourite.findOne({userid: user_id});

    const fav_food = {
      food_id,
      name,
      img,
      price,
      category,
    };

    let fav;

    if (user_fav) {
      fav = await pushFavFood(user_fav, fav_food, user_id, res);
    } else {
      const newFav = new Favourite({
        userid: user_id,
      });
      await newFav.save();

      const user_fav1 = await Favourite.findOne({userid: user_id});
      fav = await pushFavFood(user_fav1, fav_food, user_id, res);
    }

    return res.status(200).send({fav, message: "Added to favourites !", success: true});
  } catch (error) {
    return res.status(403).send({
      message: error,
      success: false,
    });
  }
});

router.post("/food_remove", async (req, res) => {
  const {user_id, food_id} = req.body;
  const fid = food_id;

  try {
    const user = await Favourite.findOne({userid: user_id}).lean().exec();

    const updatedArray = user.Favourites.filter((item) => item.food_id !== fid);

    await Favourite.updateOne({userid: user_id}, {$set: {Favourites: updatedArray}});

    const user1 = await Favourite.findOne({userid: user_id}).lean().exec();

    if (!user1) {
      return res.status(403).send({message: "couldn't remove from favourites!", success: false});
    } else {
      return res.status(200).send({message: "Removed from favourites!", fav: user1.Favourites, success: true});
    }
  } catch (error) {
    return res.status(400).send({message: error, success: false});
  }
});

router.get("/:id", async (req, res) => {
  const user_id = req.params.id;

  try {
    const userfav = await Favourite.findOne({userid: user_id});

    return res.status(200).send(userfav.Favourites);
  } catch (error) {
    return res.status(403).send({
      message: error,
      success: false,
    });
  }
});

export default router;
