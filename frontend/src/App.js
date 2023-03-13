import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { UpdateUser, Profile, Register } from "./Pages/users/index";
import {
  AllEvents,
  SingleEvent,
  GuestList,
  UpdateEvent,
  CreateEvent,
} from "./Pages/events/index";
import { Home, ContactUs, About, Error, Wrapper} from "./Pages/index";
export const router = createBrowserRouter(createRoutesFromElements(

  <Route errorElement={<Error />}>
  <Route path="/" element={<Wrapper/>}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contacts" element={<ContactUs />} />
        <Route path="events" element={<AllEvents />} />
        <Route path="events/:id" element={<SingleEvent />} />
        <Route path="events/add" element={<CreateEvent />} />
        <Route path="events/update/:id" element={<UpdateEvent />} />
        <Route path="events/guests/:id" element={<GuestList />} />
        <Route path="register" element={<Register />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="Profile/update" element={<UpdateUser />} />
        </Route>
  </Route>
))
