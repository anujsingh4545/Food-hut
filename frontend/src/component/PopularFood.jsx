import React, {forwardRef} from "react";
import Food from "./Food";

const PopularFood = forwardRef((props, ref) => {
  return (
    <div className=" border-0 border-black w-full  px-6 " ref={ref}>
      {/* Section1 */}
      <section className="flex">
        <p className=" inline text-[1.8rem] md:text-[2.3rem] font-bold mx-auto tracking-wide ">
          Popular <span className=" text-red-600 ">Foods</span>
        </p>
      </section>

      {/* Section 2 */}
      <section className=" grid py-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  grid-cols-1 ">
        <Food name="Chihuahuan" rating="4.1" img="food5.png" price="$12" review="51" />
        <Food name="Pepsi" rating="4.1" img="food6.png" price="$5" review="13" />
        <Food name="Red Bull" rating="4.7" img="food7.png" price="$10" review="54" />
        <Food name="Blackberries" rating="4.3" img="food8.png" price="$12" review="123" />
        <Food name="Pineapple" rating="4.2" img="food9.png" price="$15" review="12" />
        <Food name="Strawberry" rating="4.4" img="food10.png" price="$20" review="45" />
        <Food name="Donne Biryani" rating="4.8" img="food11.png" price="$120" review="124" />
        <Food name="Ambur biryani   " rating="4.3" img="food12.png" price="$130" review="3" />
        <Food name="Calicut biryani" rating="4.1" img="food2.png" price="$60" review="125" />
        <Food name="Chicken 65 biryani" rating="4.4" img="food3.png" price="$125" review="2" />
        <Food name="Bhatkali Biryani" rating="4.8" img="food4.png" price="$120" review="20" />
      </section>
    </div>
  );
});

export default PopularFood;
