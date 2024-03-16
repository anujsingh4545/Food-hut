import React from "react";

const Otp = () => {
  return (
    <div className=" h-screen w-full pt-[15vh] flex justify-center ">
      <section className=" w-[100%] md:w-[50%] lg:w-[40%] border-0 rounded-lg shadow-md px-3 py-10 md:p-10 border-black  flex items-center justify-center flex-col bg-white h-fit  mx-8 md:mx-0  ">
        <p className=" font-semibold tracking-wide text-[2rem]  md:text-[2.5rem] ">Email Verification</p>
        <p className="  font-semibold tracking-wide text-gray-600/70 text-[0.8rem] md:text-[1.1rem] mb-10 text-center ">We have send a code to your email anujsinghsisodiya5341@gmail.com </p>

        <input type="text" className=" w-full text-center outline-none border-[0.05rem] border-slate-200 rounded-lg p-2 " placeholder="Enter your otp" maxLength={6} />

        <button className=" nav_btn w-full mt-10 ">verify account</button>
      </section>
    </div>
  );
};

export default Otp;
