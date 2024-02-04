import React from "react";
import Header from "../component/Header";
import RecommendedFood from "../component/RecommendedFood";
import NewFood from "../component/NewFood";
import SpecialFood from "../component/SpecialFood";
import MultipleService from "../component/MultipleService";
import Footer from "../component/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <RecommendedFood />
      <MultipleService />
      <NewFood />
      <Footer />
      <SpecialFood />
    </>
  );
};

export default Home;
