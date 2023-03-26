import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useGlobally } from '../context/AppContext'
import { NavBar, Footer } from "../Components/Wrapper/index";
import styled from "styled-components";
import tw from "twin.macro";
import { EventContext } from '../Components/events/context/EventContext';
import { Alert } from '../Components/all/error/Alert';

const ProtectedRoutes = () => {

  const {id,role} = useGlobally()
    if(!id || !role ){
        return <Navigate to="/"/>
    }

  return (
    <EventContext>
    <Main>
      <NavBar />
      <div className="all">
        <Alert/>
        <Outlet />
      </div>
      <Footer />
    </Main>
    </EventContext>
  );
};

export default ProtectedRoutes;

const Main = styled.main`
  ${tw`min-h-full`}
  .all {
    ${tw`flex flex-col`}
  }
`;
