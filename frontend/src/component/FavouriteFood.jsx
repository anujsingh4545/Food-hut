import React from "react";
import {FaHeart} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {lookInSession} from "../common/session";
import {useDispatch, useSelector} from "react-redux";
import {doneFetchingFav} from "../store/slice/menu/favouriteslice";
import {Toaster, toast} from "react-hot-toast";

const FavouriteFood = ({id, category, food_id, img, name, price}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {currentUser, loading} = useSelector((state) => state.user);
  const {favourite, loading1} = useSelector((state) => state.fav);

  const callFoodInfo = () => {
    navigate(`/menu/${id}`);
  };

  const removeFav = async () => {
    let userSession = lookInSession("token");
    const favdata = {
      user_id: currentUser.user._id,
      food_id: id,
    };

    try {
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
            toast.success(data.message);
            dispatch(doneFetchingFav(data.fav));
          } else {
            toast.error(data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className=" relative bg-red-600/20 rounded-lg flex flex-row items-center gap-4  px-2 py-2 justify-center w-full ">
      <div className="w-[60%] flex items-center justify-center cursor-pointer " onClick={callFoodInfo}>
        <img src={img} alt="" className=" max-w-[100%] max-h-28  " />
      </div>

      <div className=" flex flex-col justify-center w-full h-full md:items-center ">
        <p className=" md:pl-0  text-[1.5rem] tracking-wide  font-bold cursor-pointer " onClick={callFoodInfo}>
          {name}
        </p>

        <section className=" flex flex-col md:flex-row  md:justify-between w-full  mt-3 md:pr-2 ">
          <p className="text-left text-[1rem] font-bold text-slate-950/70 tracking-wide flex-1 cursor-pointer " onClick={callFoodInfo}>
            Category : <span>{category}</span>
          </p>

          <p className=" text-left md:text-right text-[1rem] font-bold text-slate-950/70 tracking-wide cursor-pointer " onClick={callFoodInfo}>
            Price : <span>${price}</span>
          </p>
        </section>
      </div>

      <FaHeart size={20} className=" active:scale-90 absolute bottom-3 right-3  md:top-3 cursor-pointer text-red-700 hover:scale-100 hover:text-red-900 " onClick={removeFav} />
    </section>
  );
};

export default FavouriteFood;
