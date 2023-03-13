import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { UpdateUser, Profile, Register } from "./Pages/users/index";
import {
  AllEvents,
  SingleEvent,
  GuestList,
  UpdateEvent,
  CreateEvent,
} from "./Pages/events/index";
import { Home, ContactUs, About, Error } from "./Pages/index";
const App = () => {
  return (
    <Main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<ContactUs />} />
        <Route path="/events" element={<AllEvents />} />
        <Route path="/events/:id" element={<SingleEvent />} />
        <Route path="/events/add" element={<CreateEvent />} />
        <Route path="/events/update/:id" element={<UpdateEvent />} />
        <Route path="/events/guests/:id" element={<GuestList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Profile/update" element={<UpdateUser />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Main>
  );
};

export default App;

const Main = styled.main`
  ${tw``}
`;
