import React, {useContext, useState} from "react";
import {Link, NavLink, Navigate, useNavigate} from "react-router-dom";
import avatar from "/profile.png";
import axios from "axios";
import {Toaster, toast} from "react-hot-toast";
import {storeInSession} from "../common/session";
import Otp from "../component/Otp";
import {useDispatch, useSelector} from "react-redux";
import {signInSuccess} from "../store/slice/user/userscilce";

const Register = () => {
  const [image, setImage] = useState({
    url: "https://res.cloudinary.com/dbhujpgdt/image/upload/v1708153757/gamp89izvpuv8x59qj9i.png",
    public_id: null,
  });
  const [uploading, setUploading] = useState(false);
  const [submit_f, setSubmit_f] = useState(false);
  const navigate = useNavigate();
  const {currentUser} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleImage = async (e) => {
    const file = e.target.files[0];

    let formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const {data} = await axios.post("http://localhost:8000/api/image", formData);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const passwordConfirm = form.confirmPassword.value;
    const profileImage = image?.url;
    const userData = {name, email, password, passwordConfirm, profileImage};

    setSubmit_f(true);

    try {
      fetch("http://localhost:8000/api/user/register", {
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
      <Toaster position="top-right" reverseOrder={false} />
      <div className="  h-full  mb-[10vh] pt-[15vh]  border-0 border-black m-auto flex  justify-center ">
        <form className=" border-0 rounded-lg border-black  bg-white p-5 mx-8 ld:mx-0 w-[100%] md:w-[50%]  lg:w-[35%] h-fit shadow-sm flex flex-col items-center justify-center " onSubmit={handleOnSubmit}>
          <label htmlFor="file-upload" className="w-full flex flex-col items-center justify-center">
            <img src={image?.url || avatar} alt="" className=" cursor-pointer w-32 h-32 rounded-full " />
          </label>
          <p className=" tracking-wide text-[1.1rem] pt-1 "> {uploading ? "Loading ..." : "Profile Picture"} </p>
          <input type="file" label="Image" name="myfile" id="file-upload" accept=".jpeg,.png,.jpg" className="hidden" onChange={handleImage} />

          <div className=" w-full mt-2 ">
            <p className=" text-[1rem] font-normal  tracking-wide mb-1 ">Name</p>
            <input type="name" autoComplete="name" name="name" className=" outline-none shadow-md border-[0.1px] border-slate-200 rounded-sm w-[100%] p-2 tracking-wide  " placeholder="Enter your name" />
          </div>

          <div className=" w-full mt-3 ">
            <p className=" text-[1rem] font-normal  tracking-wide mb-1 ">Email</p>
            <input type="email" autoComplete="email" name="email" className=" outline-none shadow-md border-[0.1px] border-slate-200 rounded-sm w-[100%] p-2 tracking-wide  " placeholder="Enter your email" />
          </div>

          <div className=" w-full flex flex-row gap-4 ">
            <section className=" w-full mt-3">
              <p className=" text-[1rem] font-normal  tracking-wide mb-1 ">Password</p>
              <input type="password" autoComplete="password" name="password" className=" outline-none shadow-md border-[0.1px] border-slate-200 rounded-sm w-[100%] p-2 tracking-wide  " placeholder="************" />
            </section>
            <section className=" w-full mt-3">
              <p className=" text-[1rem] font-normal  tracking-wide mb-1 ">Confirm Password</p>
              <input type="password" autoComplete="password" name="confirmPassword" className=" outline-none shadow-md border-[0.1px] border-slate-200 rounded-sm w-[100%] p-2 tracking-wide  " placeholder="************" />
            </section>
          </div>

          <button className={`nav_btn w-full mt-8 bg-red-600  ${submit_f ? "cursor-not-allowed" : ""} `} type="submit">
            {submit_f ? "loading ..." : "Register"}
          </button>

          <Link to="/login">
            <p className=" text-yellow-500 text-[1.2rem] mt-2 "> Already Account </p>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Register;
