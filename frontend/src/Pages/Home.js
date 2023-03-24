import React, { useEffect } from "react";
import { Main } from "./styles";
import { Hero, Developers, Services, Faq } from "../Components/Home/index";
const Home = () => {

  return (
    <Main>
      <Hero />
      <Services />
      <Faq />
      <Developers />
    </Main>
  );
};

export default Home;
