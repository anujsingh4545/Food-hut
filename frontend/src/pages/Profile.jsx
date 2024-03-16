import React, {useEffect, useState} from "react";
import Footer from "../component/Footer";
import {useDispatch, useSelector} from "react-redux";
import {Toaster, toast} from "react-hot-toast";
import axios from "axios";
import {lookInSession} from "../common/session";
import {signInSuccess} from "../store/slice/user/userscilce";

const Profile = () => {
  const {currentUser, loading} = useSelector((state) => state.user);
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [submit_f, setSubmit_f] = useState(false);
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
    const user_id = currentUser.user._id;
    let ProfileImage;
    if (image) {
      ProfileImage = image.url;
    } else {
      ProfileImage = currentUser.user.profileImage;
    }

    const userData = {name, user_id, ProfileImage};
    setSubmit_f(true);

    try {
      let userSession = lookInSession("token");
      console.log(userSession);
      fetch("http://localhost:8000/api/user/update/profile", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: userSession,
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            dispatch(signInSuccess(data));
            toast.success(data.message);
            setSubmit_f(false);
            form.reset();
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
  return (
    <>
      <Toaster />
      <div className="  w-full pt-[15vh] px-8 md:px-10 flex items-center justify-center mb-16 ">
        <form className=" flex flex-col items-center px-4  p-8 rounded-md shadow-md  bg-white w-full md:w-[70%] lg:[60%] xl:w-[45%]" onSubmit={handleOnSubmit}>
          <label htmlFor="file_upload">
            <img src={image.url || currentUser?.user.profileImage} alt="" className=" w-36 h-36 cursor-pointer rounded-full " />
          </label>
          <p className=" mt-1 text-lg tracking-wide "> {uploading ? "Loading..." : "Profile Picture"} </p>
          <input type="file" name="" id="file_upload" className="hidden" accept=".jpeg,.png,.jpg" onChange={handleImage} />

          <section className=" grid  grid-cols-1 md:grid-cols-2 gap-5 mt-8 w-full ">
            <input type="text" name="name" autoComplete="name" placeholder={currentUser?.user.name} className=" text-lg tracking-wide w-full outline-none border-[0.1px] border-gray-900/10 px-3 py-2 shadow-sm rounded-sm " />
            <p className=" text-lg tracking-wide text-slate-900/80 w-full outline-none border-[0.1px] border-gray-900/10 px-3 py-2 shadow-sm rounded-sm "> {currentUser?.user.email} </p>
          </section>

          <button className=" nav_btn mt-10 w-full bg-red-600 " type="submit">
            {submit_f ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
