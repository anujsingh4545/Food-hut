import mongoose from "mongoose";

const FavouriteSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
    unique: true,
  },
  Favourites: [
    {
      type: Map,
      of: String,
    },
  ],
});

export default mongoose.model("Favourite", FavouriteSchema);
