import styled from "styled-components";
import tw from "twin.macro";

export const ProfileList = ({phone,firstName,lastName,email,role,profile}) => {
  return (
    <Main>
      <div>
        <div>
          <p>First Name</p>
        </div>
        <div>
          <p>{firstName}</p>
        </div>
      </div>
      <div>
        <div>
          <p>Surname</p>
        </div>
        <div>
          <p>{lastName}</p>
        </div>
      </div>
      <div>
        <div>
          <p>Email</p>
        </div>
        <div>
          <p>{email}</p>
        </div>
      </div>
      <div>
        <div>
            <p>Phone</p>
        </div>
        <div>
            <p>{phone}</p>
        </div>
      </div>
      <div>
        <div>
            <p>Role</p>
        </div>
        <div>
            <p>{role === "ORGANIZER"?"Organizer":"User"}</p>
        </div>
      </div>
      <div>
        <div>
            <p>City</p>
        </div>
        <div>
            <p>{profile.city || "N/A"}</p>
        </div>
      </div>
      <div>
        <div>
            <p>Street</p>
        </div>
        <div>
            <p>{profile.street || "N/A"}</p>
        </div>
      </div>
      <div>
        <div>
            <p>Company Name</p>
        </div>
        <div>
            <p>{profile.companyName || "N/A"}</p>
        </div>
      </div>
      <div>
        <div>
            <p>Job Title</p>
        </div>
        <div>
            <p>{profile.jobTitle || "N/A"}</p>
        </div>
      </div>
    </Main>
  );
};

const Main = styled.div`
${tw`w-full flex flex-col space-y-2.5`}
>div{
    ${tw`flex items-center space-x-2`}
  >div {
    font-family: DmSansRegular;
    p {
      ${tw`text-sm`}
    }
  }
  div:first-child {
    font-family: PoppinsSemiBold;
    ${tw`w-[150px]`}
    p {
      ${tw`text-[rgba(0,0,0,.7)]`}
    }
  }
}
  
`;
