import React, {useState} from "react";
import {TiThMenu} from "react-icons/ti";
import {RxCross2} from "react-icons/rx";
import {Link} from "react-router-dom";

function Navbar() {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <nav className="bg-white/80 shadow-md fixed top-0 left-0  w-full z-40 ease-in duration-300 backdrop-blur-md">
      <div className=" px-10 md:px-10  py-2  w-full mx-auto ">
        <div className="  flex justify-between items-center ">
          <img className=" h-14  cursor-pointer" src="/public/logo.svg " alt="Food Hub" />

          <div className="hidden lg:flex  items-center gap-8 ">
            <h3 className=" navbar_section">Today Special</h3>
            <h3 className=" navbar_section">Why FoodHut</h3>
            <h3 className="navbar_section">Our Food</h3>
            <h3 className="navbar_section">Add Food</h3>
            <h3 className="navbar_section">Popular Food</h3>
            <Link to="/login">
              <button className="nav_btn ">login</button>
            </Link>
          </div>

          <div className=" block  lg:hidden  z-40 " onClick={handleNav}>
            {!nav ? <TiThMenu size={25} className=" cursor-pointer text-red-700 " /> : <RxCross2 size={25} className=" cursor-pointer " />}
          </div>

          <div className={`lg:hidden absolute  w-1/2 sm:w-2/5   h-screen px-4 py-2 text-xl font-medium ease-in shadow-sm  bg-white top-0 duration-500 ${nav ? "right-0" : "right-[-100%]"} pt-24 `}>
            <div className="flex flex-col items-center gap-8 ">
              <h3 className=" navbar_section">Today Special</h3>
              <h3 className=" navbar_section">Why FoodHut</h3>
              <h3 className="navbar_section">Our Food</h3>
              <h3 className="navbar_section">Add Food</h3>
              <h3 className="navbar_section">Popular Food</h3>
              <button className="nav_btn ">login</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
