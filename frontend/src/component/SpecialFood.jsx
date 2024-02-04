import React from "react";
import Food from "./Food";

const SpecialFood = () => {
  return (
    <div className=" border-0 border-black w-full  px-6 ">
      {/* Section1 */}
      <section className="flex">
        <p className=" inline text-[1.8rem] md:text-[2.3rem] font-bold mx-auto tracking-wide ">
          Special <span className=" text-red-600 ">Foods</span>
        </p>
      </section>

      {/* Section 2 */}
      <section className=" grid py-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  grid-cols-1 ">
        <Food name="Chihuahuan" rating="4.1" img="food5.png" price="$12" review="51" />
        <Food name="Red Bull" rating="4.7" img="food7.png" price="$10" review="54" />
        <Food name="Strawberry" rating="4.4" img="food10.png" price="$20" review="45" />
        <Food name="Bhatkali Biryani" rating="4.8" img="food4.png" price="$120" review="20" />
      </section>
    </div>
  );
};

export default SpecialFood;
