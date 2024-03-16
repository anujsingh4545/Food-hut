import axios from "axios";
import React, {useContext, useState} from "react";
import {Link, NavLink, useNavigate, Navigate} from "react-router-dom";
import {Toaster, toast} from "react-hot-toast";
import {storeInSession} from "../common/session";
import {useSelector, useDispatch} from "react-redux";
import {signInSuccess} from "../store/slice/user/userscilce";

const Login = () => {
  const [submit_f, setSubmit_f] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {currentUser} = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    let userData = {
      email: form.email.value,
      password: form.password.value,
    };

    setSubmit_f(true);

    try {
      fetch("http://localhost:8000/api/user/signin", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            storeInSession("token", data.token);
            dispatch(signInSuccess(data));
            setSubmit_f(false);
            form.reset();
            navigate("/");
          } else {
            toast.error(data.message);
            setSubmit_f(false);
          }
        });
    } catch (error) {
      toast.error("Some error occured, try again!");
      setSubmit_f(false);
    }
  };

  return currentUser ? (
    <Navigate to="/" />
  ) : (
    <>
      <Toaster />
      <div className="  h-screen  pt-[15vh]  border-2 border-black m-auto flex  justify-center ">
        <form className=" border-0 rounded-lg border-black  bg-white p-10 mx-8 w-[100%] md:w-[50%]  lg:w-[30%] h-fit shadow-sm flex flex-col items-center justify-center" onSubmit={handleSubmit}>
          <NavLink to="/">
            <img src="/Logo.svg" alt="" />
          </NavLink>

          <div className=" w-full mt-5 ">
            <p className=" text-[1rem] font-normal  tracking-wide mb-1 ">Email</p>
            <input type="email" autoComplete="email" name="email" className=" outline-none shadow-md border-[0.1px] border-slate-200 rounded-sm w-[100%] p-2 tracking-wide  " placeholder="Enter your email" />
          </div>

          <div className=" w-full mt-5 ">
            <p className=" text-[1rem] font-normal  tracking-wide mb-1 ">Password</p>
            <input type="password" name="password" autoComplete="password" className=" outline-none shadow-md border-[0.1px] border-slate-200 rounded-sm w-[100%] p-2 tracking-wide  " placeholder="************" />
          </div>

          <button className={`nav_btn w-full mt-5 bg-red-600 ${submit_f ? "cursor-not-allowed" : ""}`} type="submit">
            {submit_f ? "loading ..." : "Sign In"}
          </button>

          <Link to="/register">
            <p className=" text-yellow-500 text-[1.2rem] mt-2 "> Create an Account </p>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
