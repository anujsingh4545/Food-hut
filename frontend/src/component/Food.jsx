import React, {useEffect, useState} from "react";
import {FaHeart} from "react-icons/fa";
import {FaStar} from "react-icons/fa";
import FoodDetail from "../pages/FoodDetail";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {lookInSession} from "../common/session";
import {Toaster, toast} from "react-hot-toast";
import {doneFetchingFav} from "../store/slice/menu/favouriteslice";

const Food = ({id, name, img, rating, price, review, category}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [submit_f, setSubmit_f] = useState(false);

  const [favfood, setFavFood] = useState(false);

  const {currentUser, loading} = useSelector((state) => state.user);
  const {favourite, loading1} = useSelector((state) => state.fav);

  const callFoodInfo = () => {
    navigate(`/menu/${id}`);
  };

  const addFav = async () => {
    let userSession = lookInSession("token");
    const favdata = {
      user_id: currentUser.user._id,
      food_id: id,
      name: name,
      img: img,
      price: price,
      category: category,
    };

    try {
      setSubmit_f(true);
      fetch("http://localhost:8000/api/favourite/food", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: userSession,
        },
        body: JSON.stringify(favdata),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            dispatch(doneFetchingFav(data.fav));
            toast.success(data.message);

            setSubmit_f(false);
          } else {
            toast.error(data.message);
            setSubmit_f(false);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const removeFav = async () => {
    let userSession = lookInSession("token");
    const favdata = {
      user_id: currentUser.user._id,
      food_id: id,
    };

    try {
      setSubmit_f(true);
      fetch("http://localhost:8000/api/favourite/food_remove", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: userSession,
        },
        body: JSON.stringify(favdata),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            dispatch(doneFetchingFav(data.fav));
            setFavFood(false);
            toast.success(data.message);

            setSubmit_f(false);
          } else {
            toast.error(data.message);
            setSubmit_f(false);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (favourite) {
      favourite.map((m) => {
        if (m.food_id == id) {
          setFavFood(true);
        }
      });
    }
  }, [favourite]);

  return (
    <>
      <div className=" rounded-2xl bg-red-500/15  flex items-center justify-center flex-col cursor-pointer m-3 md:m-5 z-20  ">
        <div className=" relative m-5 h-56 w-[100%] flex items-center justify-center ">
          <img src={img} alt="" className="  transition-transform  hover:scale-110 duration-100 max-w-[90%] max-h-[100%] " onClick={callFoodInfo} />

          {currentUser && ( // Check if currentUser exists
            <div
              className={`absolute top-2 left-5 bg-red-600 rounded-full p-2 hover:bg-red-700 ${favfood ? "text-black" : "text-white"} z-50 `}
              onClick={() => {
                if (favfood) removeFav();
                else addFav();
              }}
            >
              <FaHeart size={20} />
            </div>
          )}

          <div className=" absolute bottom-2 right-5 flex items-center justify-center  rounded-full w-14 h-14 bg-yellow-500 ">
            <p className=" text-[1.3rem] font-bold  text-white  my-auto text-center ">${price}</p>
          </div>
        </div>
        <div className=" flex items-center justify-center" onClick={callFoodInfo}>
          <p className=" text-[1.3rem] font-bold text-red-600 mr-5 ">{name}</p>
          <p className=" flex items-center justify-center text-yellow-500 text-[1rem]  gap-2">
            {rating}
            <span>
              <FaStar />
            </span>
            <span className=" text-black "> ({review})</span>
          </p>
        </div>

        <button className=" nav_btn mt-2  mb-4  ">add to cart </button>
      </div>
    </>
  );
};

export default Food;
