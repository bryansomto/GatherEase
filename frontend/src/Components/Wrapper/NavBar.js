import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { NavLink} from "react-router-dom";
import { NavbarLinks } from "../../utils/Wrapper";
import { FaBars, FaTimes } from "react-icons/fa";
import { useGlobally } from "../../context/AppContext";
const NavBar = () => {
  const {user} = useGlobally()
  const [open, setOpen] = useState(false)
  let data = user

  return (
    <Main open={open}>
      <p>GatherEase</p>
      <div className="dropdown" onClick={()=>setOpen(!open)}>
        {open ? <FaTimes className="icon" /> :  <FaBars className="icon" /> }
      </div>
      <div className="navbar-links">
        {NavbarLinks.map((i) => (
          <NavLink
            key={i.text}
            className={({ isActive }) => (isActive ? "active link" : "link")}
            to={i.link}
          >
            {i.text}
          </NavLink>
        ))}
        {
          data ? <NavLink
          className={({ isActive }) => (isActive ? "active link" : "link")}
          to="/profile"
        >
        profile
      </NavLink>: <NavLink
          className={({ isActive }) => (isActive ? "active link" : "link")}
          to="/user/login"
        >
        login
      </NavLink>
        }
       
      </div>
    </Main>
  );
};

export default NavBar;

const Main = styled.nav`
  ${tw`relative flex justify-between px-10 py-5 items-center`}
  font-family:PoppinsBold;
  p {
    ${tw`capitalize text-3xl text-newBlue`}
  }
  .navbar-links {
    ${tw`absolute w-full md:w-max pb-10 md:p-0 bg-white z-20 top-full flex-col -translate-x-1/2 left-1/2 md:relative 
    flex md:left-0 md:top-0 md:z-0 md:-translate-x-0 md:flex-row items-start md:items-center md:space-y-0 space-x-0 md:space-x-5 lg:space-x-10`}
    ${(props)=>props.open || tw`hidden md:flex`}
    a {
      ${tw`hover:text-newBlue capitalize`}
    }
    .link{
      ${tw`w-full md:w-auto p-5 md:p-0 capitalize`}
    }
    .active {
      ${tw`text-white bg-newBlue md:bg-white md:text-newBlue`}
    }
  }
  .dropdown {
    ${tw`flex md:hidden`}
    .icon {
      ${tw`text-2xl`}
    }
  }
`;
