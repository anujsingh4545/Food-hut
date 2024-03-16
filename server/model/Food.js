import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    foodImage: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: [
      {
        type: Map,
        of: String,
      },
    ],
    reviews: [
      {
        type: Map,
        of: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Food", FoodSchema);
