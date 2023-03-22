import React, { useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useGlobally } from "../../context/AppContext";
import { ProfileList } from "./Profile";
import { Link} from "react-router-dom";
import {FaCheckCircle} from "react-icons/fa"
import  {Loader} from "../all/load/Loader"
const ProfileData = () => {
  const {getCurrentUser,user} = useGlobally()
  useEffect(()=>{
    getCurrentUser()
  },[])
  if(!user){
    return <Main>
      <header>Profile Details</header>
      <Loader/>
    </Main>
  }
  return (
    <Main>
        <header>Profile Details {user.profile.isVerified && <FaCheckCircle title="verified" className="icon"/>}</header>
        { 
          user?<>
          <ProfileList {...user}/>
        <div className="links">
          <button>Delete</button>
          <Link to="/profile/update" >Edit</Link>
        </div>
          </>:<p>
            Unable to get user Details
          </p>
        }
    </Main>
  );
};

export default ProfileData


const Main = styled.div`
 ${tw`w-full flex flex-col px-6 md:px-10 space-y-5`}
 >header{
  ${tw`relative w-[150px]`}
  font-family:PoppinsBold;
  ${tw`text-base`}
  .icon{
    ${tw`absolute text-sm top-1/2 -translate-y-1/2 left-[80%] text-newBlue`}
  }
 }
 .links{
  ${tw`w-full flex items-center justify-between py-2.5`}
  a, button{
  ${tw`rounded-lg p-2 px-2.5 bg-newPurple text-white`}
 }
 button{
  ${tw`bg-newOrange text-white`}
 }
}
`;
