import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Wrapper from "../../Components/Profile/Wrapper"

const Profile = () => {
  return (
    <Main>
      <Wrapper/>
    </Main>
  );
};
export default Profile;

export const Main = styled.section`
${tw`flex flex-col`}
`
