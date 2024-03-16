import React, {forwardRef, useEffect, useRef, useState} from "react";
import Header from "../component/Header";
import TodaySpecial from "../component/TodaySpecial";
import PopularFood from "../component/PopularFood";
import SpecialFood from "../component/SpecialFood";
import MultipleService from "../component/MultipleService";
import Footer from "../component/Footer";
import Food from "../component/Food";

const Home = forwardRef((props, ref) => {
  // ******************************************************************************
  // useEffect(() => {
  //   const loaderTimeout = setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  //   return () => {
  //     clearTimeout(loaderTimeout);
  //   };
  // }, []);

  // if (isLoading || !user) {
  //   return <Loader />;
  // }

  // ******************************************************************************

  return (
    <>
      <Header />
      <TodaySpecial />
      <MultipleService />
      <PopularFood />
      <Footer />
    </>
  );
});

export default Home;
