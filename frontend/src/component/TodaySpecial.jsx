import React, {forwardRef, useEffect} from "react";

import Food from "./Food";

const TodaySpecial = ({id}) => {
  return (
    <div id={id} className=" border-0 border-black w-full  px-6 ">
      {/* Section1 */}
      <section className="flex">
        <p className=" inline text-[1.8rem] md:text-[2.3rem] font-bold mx-auto tracking-wide ">
          Today <span className=" text-red-600 ">Special</span>
        </p>
      </section>

      {/* Section 2 */}
      <section className=" grid py-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  grid-cols-1 ">
        <Food name="Chicken 65 biryani" rating="4.3" img="food1.png" price="$130" review="502" />
        <Food name="Ambur biryani" rating="4.1" img="food2.png" price="$150" review="10" />
        <Food name="Bhatkali Biryani" rating="4.7" img="food3.png" price="$100" review="54" />
        <Food name="Calicut biryani" rating="4.3" img="food4.png" price="$120" review="123" />
      </section>
    </div>
  );
};

export default TodaySpecial;
