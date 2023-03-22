import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import {
  ProfileDetails,
  ProfileEvents,
} from "../../Components/Profile/ProfileData";

const Profile = () => {
  return (
    <Main>
      <ProfileDetails />
      <ProfileEvents />
    </Main>
  );
};
export default Profile;

const Main = styled.section`
  ${tw`w-full flex  flex-col md:flex-row items-start justify-between p-12 md:p-24 py-12 space-x-0 md:space-x-8`}
`;
