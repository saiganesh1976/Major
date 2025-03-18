import React from "react";
import { useState } from "react";
import Header from "../../components/Header/Header";
import AppDownload from "../../components/AppDownload/AppDownload";
import Aboutus from "../../components/AboutUs/Aboutus";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import Announcements from "../../components/Announcements/Announcements";

const Home = () => {
  return (
    <div>
      <Announcements/>
      <Header />
      <Aboutus />
      <NewsLetter />
      <AppDownload />
    </div>
  );
};

export default Home;
