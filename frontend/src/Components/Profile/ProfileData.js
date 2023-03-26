import React, { useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useGlobally } from "../../context/AppContext";
import { ProfileList } from "./ProfileList";
import noProfile from "../../Assets/svg/profile.svg";
import { NoData } from "../all/error/NoData";
import { FaCheckCircle } from "react-icons/fa";
import { Loader } from "../all/load/Loader";
const ProfileData = () => {
  const { getCurrentUser, user } = useGlobally();
  useEffect(() => {
    getCurrentUser();
  }, []);
  if (!user) {
    return (
      <Main>
        <header>Profile Details</header>
        <Loader />
      </Main>
    );
  }
  const verify = user.role !== "USER"
  return (
    <Main>
      {verify ? (
        <header>
          Profile Details{" "}
          {user.profile.isVerified && (
            <FaCheckCircle title="verified" className="icon" />
          )}
        </header>
      ) : (
        <header>
          Profile Details{" "}
          {user.isVerified && (
            <FaCheckCircle title="verified" className="icon" />
          )}
        </header>
      )}
      {user ? (
        <>
        {
          verify ?
          <ProfileList phone={user.phone} firstName={user.firstName} lastName={user.lastName} email={user.email} role={user.role} profile={user.profile}/>
          :
          <ProfileList phone={user.phone} firstName={user.firstName} lastName={user.lastName} email={user.email} role={user.role}  createdAt={user.createdAt} lastLogin={user.lastLogin}/>       
        }
        </>
      ) : (
        <NoData text="No user information" img={noProfile} />
      )}
    </Main>
  );
};

export default ProfileData;

const Main = styled.div`
  ${tw`w-full flex flex-col px-6 md:px-10 space-y-5`}
  >header {
    ${tw`relative w-[150px]`}
    font-family:PoppinsBold;
    ${tw`text-base`}
    .icon {
      ${tw`absolute text-sm top-1/2 -translate-y-1/2 left-[80%] text-newBlue`}
    }
  }
  .links {
    ${tw`w-full flex items-center justify-between py-2.5`}
    a, button {
      ${tw`rounded-lg p-2 px-2.5 bg-newPurple text-white`}
    }
    button {
      ${tw`bg-newOrange text-white`}
    }
  }
`;
