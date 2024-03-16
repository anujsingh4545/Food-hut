import React from "react";

const MultipleService = () => {
  return (
    <div className=" grid  grid-cols-1 lg:grid-cols-2  mx-10 lg:mx-6  lg:my-10">
      {/* Section1 */}
      <section className=" flex justify-center items-center ">
        <img src="/banner_2.png" alt="" className=" lg:w-[70%] " />
      </section>

      {/* Section 2 */}
      <section className=" mb-16 lg:mb-0 flex justify-center  flex-col  lg:px-10 ">
        <p className="w-full border-0 border-black text-[2rem] lg:text-[2.8rem] font-medium leading-[1] tracking-wide  ">
          We offer <span className=" text-red-600 ">more</span> than just <span className=" text-yellow-500 ">multiple</span> services.
        </p>

        <p className=" mt-5 text-[1rem] lg:text-[1.2rem] w-full tracking-wide ">Beyond simply providing multiple offerings, we embody a commitment to excellence in every aspect of our operations. Our dedication extends beyond the breadth of our services, embracing a philosophy rooted in quality, integrity, and customer satisfaction.</p>

        <button className="nav_btn w-fit mt-6 ">About Us </button>
      </section>
    </div>
  );
};

export default MultipleService;
