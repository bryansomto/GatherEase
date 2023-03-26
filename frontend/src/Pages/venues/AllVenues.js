import React from "react";
import { Venues, Hero } from "../../Components/venues/AllVenues";
import { Main } from "../styles";
const AllVenues = () => {
  return (
    <Main>
      <Hero />
      <Venues />
    </Main>
  );
};

export default AllVenues;
