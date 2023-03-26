import React from "react";
import styled from "styled-components";
import { useTextMore } from "../../hooks/useText";
import { Link } from "react-router-dom";
import tw from "twin.macro";
export const Venue = ({ image, location, description, index }) => {
  return (
    <Main>
      <Link to={`/venues/${index}`}>
        <img className="venue-image" src={image} alt={location} />
      </Link>
      <header className="font">{location}</header>
      <p>{useTextMore(description)}</p>
    </Main>
  );
};
const Main = styled.div`
  ${tw`w-full flex flex-col space-y-2`}
  .venue-image {
    ${tw`rounded-lg w-full h-full`}
  }
  .font {
    font-family: poppinsBold;
  }
`;
