import React, {useEffect, useRef, useState} from "react";
import {Toaster, toast} from "react-hot-toast";
import {FaSearch} from "react-icons/fa";
import Food from "../component/Food";
import Footer from "../component/Footer";
import {useDispatch, useSelector} from "react-redux";
import {startFetchingFood, doneFetchingFood, errorFetchingFood} from "../store/slice/menu/menuslice";
import {lookInSession} from "../common/session";
import {doneFetchingFav, errorFetchingFav, startFetchingFav} from "../store/slice/menu/favouriteslice";

const Menu = () => {
  const inputRef = useRef(null);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const {menu, loading, error} = useSelector((state) => state.food);

  const {currentUser, loading2} = useSelector((state) => state.user);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const getmenu = async () => {
    try {
      dispatch(startFetchingFood());
      fetch("http://localhost:8000/api/getfood/food_menu", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            dispatch(doneFetchingFood(data));
          } else {
            dispatch(errorFetchingFood());
          }
        });
    } catch (error) {
      console.log(error);
      dispatch(errorFetchingFood());
    }
  };

  const getfav = async () => {
    let userSession = lookInSession("token");
    try {
      const user_id = currentUser?.user._id;

      dispatch(startFetchingFav());
      fetch(`http://localhost:8000/api/favourite/${user_id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: userSession,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            dispatch(doneFetchingFav(data));
          } else {
            dispatch(errorFetchingFav());
          }
        });
    } catch (error) {
      console.log(error);
      dispatch(errorFetchingFav());
    }
  };

  useEffect(() => {
    getmenu();
  }, []);
  useEffect(() => {
    if (currentUser) {
      getfav();
    }
  }, [currentUser]);

  const searchFood = () => {
    let letter = inputRef.current.value;
    letter = letter.toLowerCase();
    setSearch(letter);
  };

  return (
    <>
      <div className=" h-fit W-[100%]  pt-[15vh] flex items-center justify-center flex-col px-6  ">
        <div className=" flex items-center justify-between bg-white rounded-full w-[100%] lg:w-[55%]  px-4 py-2 md:py-3 shadow-md">
          <FaSearch size={20} className="cursor-pointer " />
          <input
            type="text"
            placeholder="Search food here ..."
            className=" outline-none flex-1 px-3 text-lg md:text-xl "
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key == "Enter") searchFood();
            }}
          />

          <div className=" rounded-full flex items-center justify-center bg-yellow-500 p-3 cursor-pointer " onClick={searchFood}>
            <FaSearch size={18} className="cursor-pointer text-white " />
          </div>
        </div>

        <section className=" grid py-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  grid-cols-1 w-[100%] ">
          {menu.map((food) => {
            // Check if food.name and food.category are defined before using the includes method
            if (food.name && food.category && (food.name.toLowerCase().includes(search) || food.category.toLowerCase().includes(search))) {
              return <Food key={food._id} id={food._id} name={food.name} rating={food.rating} img={food.foodImage} price={food.price} review="51" category={food.category} />;
            } else {
              return null; // Return null for non-matching items
            }
          })}
        </section>
        <Toaster />
      </div>

      <Footer />
    </>
  );
};

export default Menu;
