import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  UpdateUser,
  Profile,
  Login,
  SignUp,
  Verify,
} from "./Pages/users/index";
import {
  AllEvents,
  SingleEvent,
  GuestList,
  UpdateEvent,
  CreateEvent,
} from "./Pages/events/index";
import { AllVenues } from "./Pages/venues/index";
import {
  Home,
  ContactUs,
  About,
  Error,
  Wrapper,
  ProtectedRoutes,
} from "./Pages/index";
export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contacts" element={<ContactUs />} />
        </Route>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="events" element={<AllEvents />} />
          <Route path="events/:eventId" element={<SingleEvent />} />
          <Route path="events/add" element={<CreateEvent />} />
          <Route path="events/update/:eventId" element={<UpdateEvent />} />
          <Route path="events/guests/:eventId" element={<GuestList />} />
          <Route path="profile" element={<Profile />} />
          <Route path="Profile/update" element={<UpdateUser />} />
          <Route path="venues" element={<AllVenues />} />
        </Route>
        <Route path=":type/login" element={<Login />} />
        <Route path=":type/signup" element={<SignUp />} />
        <Route path=":type/verify" element={<Verify />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};
