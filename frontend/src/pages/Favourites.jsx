import React, {useEffect} from "react";
import Footer from "../component/Footer";
import FavouriteFood from "../component/FavouriteFood";
import {useDispatch, useSelector} from "react-redux";
import {lookInSession} from "../common/session";
import {Toaster, toast} from "react-hot-toast";
import {doneFetchingFav, errorFetchingFav, startFetchingFav} from "../store/slice/menu/favouriteslice";

const Favourites = () => {
  const {currentUser, loading} = useSelector((state) => state.user);
  const {favourite, loading1} = useSelector((state) => state.fav);

  const dispatch = useDispatch();

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
    if (currentUser) {
      getfav();
    }
  }, [currentUser]);

  return (
    <>
      <Toaster />
      <div className="w-full pt-[15vh] min-h-[80vh] px-8 md:px-10 ">
        <main className=" grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {favourite.map((fav) => {
            return <FavouriteFood id={fav.food_id} category={fav.category} food_id={fav.food_id} img={fav.img} name={fav.name} price={fav.price} />;
          })}
        </main>
      </div>
      ;
      <Footer />
    </>
  );
};

export default Favourites;
