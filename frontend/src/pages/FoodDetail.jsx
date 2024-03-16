import React, {useEffect, useState} from "react";
import Footer from "../component/Footer";
import {useParams} from "react-router-dom";
import {Toaster, toast} from "react-hot-toast";
import Loader from "../common/Loader";
import Comment from "../component/Comment";

const FoodDetail = () => {
  const [foodData, setFoodData] = useState([]);

  const [count, setCount] = useState(0);

  const params = useParams();

  const getFoodDetails = async () => {
    try {
      fetch(`http://localhost:8000/api/getfood/${params.id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setFoodData(data);
          } else {
            toast.error("Something went wrong!");
          }
        });
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getFoodDetails();
  }, []);

  if (!foodData) return <Loader />;

  return (
    <>
      <div className=" w-[100%] pt-[15vh]">
        <main className=" w-[100% px-10 ">
          <p className=" text-[2rem] md:text-[2.5rem] font-medium  tracking-wide  ">
            Home / <span className=" text-yellow-500 ">{foodData.name}</span>
          </p>

          <div className=" w-[100%] grid sm:grid-cols-1 md:grid-cols-2 items-center h-fit justify-center gap-8 mt-5  mb-12 border-0 border-black ">
            <section className=" bg-red-600/10 w-[100%] h-full flex items-center justify-center  ">
              <img src={foodData.foodImage} alt="" className="  max-w-[80%] max-h-96 " />
            </section>
            <section className=" flex flex-col bg-red-600/10 p-4 md:p-8  text-2xl md:text-3xl tracking-wide ">
              <p className=" font-bold text-red-600 ">{foodData.name}</p>
              <p className=" font-bold text-yellow-500 mt-2 ">
                Price : <span>{`$${foodData.price}`}</span>
              </p>

              <p className="text-justify text-lg md:text-xl mt-3 ">{foodData.description}</p>

              <div className=" flex justify-between flex-row mt-5 ">
                <p className=" font-bold text-red-600 text-2xl md:text-3xl ">Quantity</p>
                <section className=" flex flex-row justify-between gap-4 ">
                  <button
                    className="  rounded-full  bg-red-600 text-white flex items-center justify-center w-8 h-8 text-4xl md:text-5xl"
                    onClick={() => {
                      count == 0 ? setCount(count) : setCount(count - 1);
                    }}
                  >
                    -
                  </button>
                  <div className=" text-xl flex items-center justify-center bg-white px-8 text-red-600 ">{count}</div>
                  <button className="rounded-full  bg-red-600 text-white flex items-center justify-center w-8 h-8 text-4xlx md:text-5xl" onClick={() => setCount(count + 1)}>
                    +
                  </button>
                </section>
              </div>

              <div className=" flex items-center justify-between  md:justify-center flex-row gap-2 md:gap-8 mt-8 ">
                <button className=" nav_btn bg-white text-red-600 text-lg  px-8 ">Favourite</button>
                <button className=" nav_btn text-lg  px-8">Add to cart</button>
              </div>
            </section>
          </div>

          <section className=" w-[100%]  grid  grid-cols-1 md:grid-cols-3  gap-3 md:gap-10 mb-12 ">
            <p className=" text-xl p-5 bg-red-600 text-white text-center tracking-wide  shadow-md shadow-black/50">
              Category : <span>{foodData.category}</span>
            </p>
            <p className=" text-xl p-5 bg-red-600 text-white text-center tracking-wide shadow-md shadow-black/50 ">
              Weight / count : <span>{foodData.weight}</span>
            </p>
            <p className=" text-xl p-5 bg-red-600 text-white text-center tracking-wide shadow-md shadow-black/50 ">
              Location : <span>{foodData.location}</span>
            </p>
          </section>
        </main>
      </div>

      <Comment id={foodData._id} />

      <Footer />
    </>
  );
};

export default FoodDetail;
