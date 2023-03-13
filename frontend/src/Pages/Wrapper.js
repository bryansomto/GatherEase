import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar, Footer } from "../Components/Wrapper/index";
import styled from "styled-components";
import tw from "twin.macro";
const Wrapper = () => {
  return (
    <Main>
      <NavBar />
      <div className="all">
        <Outlet />
      </div>
      <Footer />
    </Main>
  );
};

export default Wrapper;

const Main = styled.main`
  ${tw`min-h-full`}
  .all {
    ${tw`flex flex-col`}
  }
`;
