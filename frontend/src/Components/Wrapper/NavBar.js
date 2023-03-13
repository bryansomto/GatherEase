import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { NavLink } from "react-router-dom";
import { NavbarLinks } from "../../utils/Wrapper";
import { FaBars } from "react-icons/fa";
const NavBar = () => {
  return (
    <Main>
      <p>GatherEase</p>
      <div className="dropdown">
        <FaBars className="icon" />
      </div>
      <div className="navbar-links">
        {NavbarLinks.map((i) => (
          <NavLink
            key={i.text}
            className={({ isActive }) => (isActive ? "active" : "")}
            to={i.link}
          >
            {i.text}
          </NavLink>
        ))}
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="/login"
        >
          login
        </NavLink>
      </div>
    </Main>
  );
};

export default NavBar;

const Main = styled.nav`
  ${tw`flex justify-between px-10 py-5 items-center`}
  font-family:PoppinsBold;
  p {
    ${tw`capitalize text-3xl text-newBlue`}
  }
  .navbar-links {
    ${tw`hidden md:flex items-center space-x-5 lg:space-x-10`}
    a {
      ${tw`hover:text-newBlue capitalize`}
    }
    .active {
      ${tw`text-newBlue`}
    }
  }
  .dropdown {
    ${tw`flex md:hidden`}
    .icon {
      ${tw`text-2xl`}
    }
  }
`;
