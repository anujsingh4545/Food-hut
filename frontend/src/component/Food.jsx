import React from "react";
import {FaHeart} from "react-icons/fa";
import {FaStar} from "react-icons/fa";

const Food = ({name, img, rating, price, review}) => {
  return (
    <div className="  rounded-2xl bg-red-500/15  flex items-center justify-center flex-col cursor-pointer m-3 md:m-5  ">
      <div className=" relative m-5 h-56 w-[100%] flex items-center justify-center ">
        <img src={`../../public/${img}`} alt="" className="  transition-transform  hover:scale-110 duration-100 max-w-[90%] max-h-[100%] " />

        <div className=" absolute top-2 left-5 bg-red-600 rounded-full p-2 hover:bg-red-700 text-white ">
          <FaHeart size={20} />
        </div>

        <div className=" absolute bottom-2 right-5 flex items-center justify-center  rounded-full w-14 h-14 bg-yellow-500 ">
          <p className=" text-[1.3rem] font-bold  text-white  my-auto text-center ">{price}</p>
        </div>
      </div>
      <div className=" flex items-center justify-center">
        <p className=" text-[1.3rem] font-bold text-red-600 mr-5 ">{name}</p>
        <p className=" flex items-center justify-center text-yellow-500 text-[1rem]  gap-2 ">
          {rating}
          <span>
            <FaStar />
          </span>
          <span className=" text-black "> ({review})</span>
        </p>
      </div>

      <button className=" nav_btn mt-2  mb-4  ">add to cart </button>
    </div>
  );
};

export default Food;
