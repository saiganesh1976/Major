import React from "react";
import { useState } from "react";
import Header from "../../components/Header/Header";
import Items from "../../components/items/items";
import AppDownload from "../../components/AppDownload/AppDownload";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import Aboutus from "../../components/AboutUs/Aboutus";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import Features from "../../components/Features/Features";
import Announcements from "../../components/Announcements/Announcements";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Announcements/>
      <Header />
      <Aboutus />
      <Features />
      {/* <Items category={category} setCategory={setCategory} />
      <FoodDisplay category={category} /> */}
      <NewsLetter />
      <AppDownload />
    </div>
  );
};

export default Home;
