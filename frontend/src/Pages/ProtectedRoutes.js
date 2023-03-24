import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useGlobally } from '../context/AppContext'
import { NavBar, Footer } from "../Components/Wrapper/index";
import styled from "styled-components";
import tw from "twin.macro";
const ProtectedRoutes = () => {
  const {id,role} = useGlobally()
    if(!id || !role ){
        return <Navigate to="/"/>
    }

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

export default ProtectedRoutes;

const Main = styled.main`
  ${tw`min-h-full`}
  .all {
    ${tw`flex flex-col`}
  }
`;
