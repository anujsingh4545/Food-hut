import React, {useState} from "react";
import Navbar from "../shared/Navbar";
import Footer from "../component/Footer";
import {Toaster, toast} from "react-hot-toast";
import {lookInSession} from "../common/session";
import axios from "axios";

const AddFood = () => {
  const [image, setImage] = useState({url: "https://res.cloudinary.com/dbhujpgdt/image/upload/v1707821774/grui8rrvcnsdbop5uaw0.svg"});
  const [uploading, setUploading] = useState(false);
  const [submit_f, setSubmit_f] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const price = form.price.value;
    const category = form.category.value;
    const weight = form.weight.value;
    const location = form.location.value;
    const description = form.description.value;

    if (category == "cat") {
      toast.error("Please choose category!");
    } else if (uploading) {
      toast.error("Image uploading in progress!");
    } else {
      setSubmit_f(true);
      try {
        let foodImage = image.url;
        const foodData = {name, price, foodImage, category, weight, location, description};
        let userSession = lookInSession("token");

        fetch("http://localhost:8000/api/food/upload", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: userSession,
          },
          body: JSON.stringify(foodData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setImage({
                url: "https://res.cloudinary.com/dbhujpgdt/image/upload/v1707821774/grui8rrvcnsdbop5uaw0.svg",
              });
              toast.success(data.message);
              form.reset();
              setSubmit_f(false);
            } else {
              toast.error(data.message);
              setSubmit_f(false);
            }
          });
      } catch (error) {
        setSubmit_f(false);
      }
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];

    let formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const {data} = await axios.post("http://localhost:8000/api/image", formData);

      setImage({
        url: data.url,
      });
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className=" h-fit w-full pt-[15vh]  flex flex-col items-center justify-center px-6  ">
        <div className="w-[100%] lg:w-[50%] h-fit px-3 py-10 md:p-10 bg-white/80 rounded-lg shadow-md mb-10  flex flex-col items-center justify-center">
          {uploading ? <p className="text-center text-lg "> Loading... </p> : <img src={image?.url} alt="" className=" text-center border-0 w-28  border-black " />}

          <form className=" " onSubmit={handleOnSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 w-[100%] mt-6 gap-3">
              <input type="text" name="name" className=" add_food_field " placeholder="Enter food name" />

              <input type="file" name="foodImage" className=" bg-red-600 w-full outline-none  text-[1rem]   text-white  file-input-md file-input " accept=".jpeg,.png,.jpg,.svg" onChange={handleImage} />

              <input type="number" name="price" className=" add_food_field " placeholder="Enter price" />

              <select name="category" className=" bg-red-600 text-white text-[1rem] rounded-md px-5 py-2 outline-none  cursor-pointer">
                <option value="cat" hidden>
                  Category
                </option>
                <option value="NonVeg">Non-Veg</option>
                <option value="Veg">Veg</option>
                <option value="Desert">Desert</option>
                <option value="Drinks">Drinks</option>
                <option value="Fruits">Fruits</option>
                <option value="Sweets">Sweets</option>
              </select>

              <input type="text" name="weight" className=" add_food_field " placeholder="Enter weight / count" />

              <input type="text" name="location" className=" add_food_field " placeholder="Enter location" />

              <textarea name="description" id="" rows="4" placeholder="Enter Description" className=" add_food_field "></textarea>
            </div>
            <button className="nav_btn bg-red-600 w-full mt-5 " type="submit">
              {submit_f ? "Loading..." : "Add Food"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AddFood;
