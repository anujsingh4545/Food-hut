import React, {useContext, useEffect, useState} from "react";
import {TiThMenu} from "react-icons/ti";
import {RxCross2} from "react-icons/rx";
import {Link, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {signInSuccess} from "../store/slice/user/userscilce";
import {removeFromSession} from "../common/session";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [list, setList] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {currentUser, loading} = useSelector((state) => state.user);
  // console.log(currentUser);

  // ******************************************************************************

  // if (isLoading || !user) {
  //   return <></>;
  // }

  // ******************************************************************************

  const logoutUser = () => {
    dispatch(signInSuccess());

    removeFromSession("token");
    toast.success("User log-out sucessfully!");
    navigate("/");
  };

  const handleBlur = () => {
    setTimeout(() => {
      setList(false);
    }, 300);
  };
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <nav className="bg-white/80 shadow-md fixed top-0 left-0  w-full z-40 ease-in duration-300 backdrop-blur-md">
      <div className=" px-10 md:px-10  py-2  w-full mx-auto ">
        <div className="  flex justify-between items-center ">
          <Link to="/">
            <img className=" h-14  cursor-pointer" src="/Logo.svg " alt="Food Hub" />
          </Link>

          <div className="hidden lg:flex  items-center gap-8 ">
            <h3 className=" navbar_section" onClick={() => navigate("/")}>
              Today Special
            </h3>

            <Link to="/favourites">
              <h3 className=" navbar_section">Favourites</h3>
            </Link>
            <Link to="/menu">
              <h3 className="navbar_section" onClick={handleNav}>
                Our Menu
              </h3>
            </Link>
            {currentUser ? (
              <Link to="/addfood">
                <h3 className="navbar_section">Add Food</h3>
              </Link>
            ) : (
              ""
            )}
            <h3 className="navbar_section" onClick={() => navigate("/")}>
              Popular Food
            </h3>

            {currentUser ? (
              <div className=" relative">
                <button onClick={() => setList(!list)} onBlur={handleBlur}>
                  <img src={currentUser?.user.profileImage} alt="" className=" p-[2px] rounded-full h-12 cursor-pointer border-[1.5px] border-slate-950/30" />
                </button>

                {list ? (
                  <div className="absolute bottom-[1] right-0  bg-white flex flex-col gap-2 py-2 rounded-lg ">
                    <Link to="/profile">
                      <p className="hover:bg-red-600 hover:text-white px-10 cursor-pointer text-lg">Profile</p>
                    </Link>
                    <p className="hover:bg-red-600 hover:text-white px-10 cursor-pointer text-lg"> Settings</p>
                    <p className="hover:bg-red-600 hover:text-white px-10 cursor-pointer text-lg" onClick={logoutUser}>
                      Logout
                    </p>
                  </div>
                ) : (
                  " "
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="nav_btn ">login</button>
              </Link>
            )}
          </div>

          <div className=" block  lg:hidden  z-40 " onClick={handleNav}>
            {!nav ? <TiThMenu size={25} className=" cursor-pointer text-red-700 " /> : <RxCross2 size={25} className=" cursor-pointer " />}
          </div>

          <div className={`lg:hidden absolute  w-1/2 sm:w-2/5   h-screen px-4 py-2 text-xl font-medium ease-in shadow-sm  bg-white top-0 duration-500 ${nav ? "right-0" : "right-[-100%]"} pt-24 `}>
            <div className="flex flex-col items-center gap-8 ">
              <h3
                className=" navbar_section"
                onClick={() => {
                  handleNav();
                  ScrollCalled("todaySpecialRef");
                }}
              >
                Today Special
              </h3>
              <h3 className=" navbar_section" onClick={handleNav}>
                Favourites
              </h3>

              <Link to="/menu">
                <h3 className="navbar_section" onClick={handleNav}>
                  Our Menu
                </h3>
              </Link>
              {currentUser ? <h3 className="navbar_section">Add Food</h3> : ""}
              <h3
                className="navbar_section"
                onClick={() => {
                  handleNav();
                  ScrollCalled("PopularFoodref");
                }}
              >
                Popular Food
              </h3>
              {currentUser ? (
                <div className=" w-full flex flex-col items-center justify-center ">
                  <button onClick={() => setList(!list)} onBlur={handleBlur}>
                    <img src={currentUser?.user.profileImage} alt="" className=" p-[2px] rounded-full h-12 cursor-pointer border-[1.5px] border-slate-950/30" />
                  </button>

                  <div className=" flex flex-col gap-4 w-full border-0 items-center border-black mt-5">
                    <Link to="/profile" className=" w-full">
                      <p className="navbar_section w-full bg-red-600 text-center text-white py-1 rounded-md " onClick={handleNav}>
                        Profile
                      </p>
                    </Link>
                    <p className=" navbar_section w-full bg-red-600 text-center text-white py-1 rounded-md  "> Settings</p>
                    <p className=" navbar_section w-full bg-red-600 text-center text-white py-1 rounded-md  " onClick={logoutUser}>
                      Logout
                    </p>
                  </div>
                </div>
              ) : (
                <Link to="/login">
                  <button className="nav_btn" onClick={handleNav}>
                    login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
