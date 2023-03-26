import React from "react";
import styled from "styled-components";
import { useTextMore } from "../../hooks/useText";
import { Link } from "react-router-dom";
import tw from "twin.macro";

export const Venue = ({ imageUrl, name,id ,city,country,street}) => {
  return (
    <Main>
      <Link to={`/venues/${id}`}>
        <img className="venue-image" src={imageUrl} alt={name} />
      </Link>
      <header className="font">{name}</header>
      <p>{`${city}, ${country} on street ${street}`}</p>
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
