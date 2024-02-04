import React from "react";
import {FaSearch, FaPlay} from "react-icons/fa";

const Header = () => {
  return (
    <div className="  py-3 px-10 sm:px-4 md:px-6 lg:px-10  w-[100%] ">
      <div className=" flex flex-col lg:flex-row pt-[15vh]  pb-[5vh] lg:pb-[15vh] justify-between ">
        {/* first section */}
        <div className=" w-[100%] lg:w-[40%] border-0 border-black flex flex-col items-center justify-center space-y-6 ">
          <p className=" text-[2.5rem] lg:text-[4rem] font-bold leading-[1] tracking-wide ">
            We are <span className=" text-red-600 ">Solemn </span> For <span className=" text-red-600">Food</span> & <span className=" text-yellow-500 ">Delievery .</span>
          </p>

          <p className=" text-[1rem] lg:text-[1.5rem] leading-[1.3]">Nestled in the heart of the city, our dining restaurant beckons with a blend of culinary mastery and warm hospitality. Setting the stage for an unforgettable dining experience. </p>

          <div className=" flex items-center justify-between bg-white rounded-full w-full px-4 py-2  shadow-md">
            <FaSearch size={20} className="cursor-pointer " />
            <input type="text" placeholder="Search food here ..." className=" outline-none flex-1 px-3 text-lg " />

            <div className=" rounded-full flex items-center justify-center bg-yellow-500 p-3 cursor-pointer ">
              <FaSearch size={18} className="cursor-pointer text-white " />
            </div>
          </div>

          {/*  */}

          <section className=" flex items-center justify-between w-full  gap-14">
            <button className="nav_btn ">explore now</button>

            <div className="  hidden lg:flex items-center justify-between flex-1  cursor-pointer ">
              <div className=" bg-white rounded-full p-4  shadow-md">
                <FaPlay size={20} className=" text-red-600" />
              </div>

              <p className=" hidden lg:flex text-xl tracking-wide px-5 font-medium flex-1 cursor-pointer  ">Watch now</p>
            </div>
          </section>
        </div>

        {/* Second section */}
        <div className=" w-[100%] mt-10 lg:mt-0 lg:w-[45%] flex items-center justify-center border-0 border-black ">
          <img src="/banner.png" alt="" className="  w-full lg:px-10 " />
        </div>
      </div>
    </div>
  );
};

export default Header;
