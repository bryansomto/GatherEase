import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
const body = {
  city: "", 
  street: "",
  username: "",
  email: "",
  firstName:"",
  lastName:"",
  jobTitle:"",
  companyName:""
};

export const UpdateUserForm = () => {
  const [data, setData] = useState(body);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  return (
    <Main>
      <Form>
        <header>Update user information</header>
        <div className="input">
          <label htmlFor="firstName"> first Name </label>
          <input
            type="text"
            name="firstName"
            placeholder="(e.g) John"
            value={data.firstName}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input">
          <label htmlFor="lastName"> last Name </label>
          <input
            type="text"
            name="lastName"
            placeholder="(e.g) Doe"
            value={data.lastName}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input">
          <label htmlFor="email"> email </label>
          <input
            type="email"
            name="email"
            placeholder="abc@gmail.com"
            value={data.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input">
          <label htmlFor="jobTilte"> job title </label>
          <input
            type="text"
            name="jobTitle"
            placeholder="(e.g) Developer"
            value={data.jobTitle}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input">
          <label htmlFor="companyName"> company name </label>
          <input
            type="text"
            name="companyName"
            placeholder="(e.g) Google"
            value={data.companyName}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input">
          <label htmlFor="name">city</label>
          <input
            type="text"
            name="city"
            placeholder="(e.g). Nairobi"
            value={data.city}
            onChange={(e) => handleChange(e)}
          />
          </div>
          <div className="input">
          <label htmlFor="name"> street</label>
          <input
            type="text"
            name="street"
            placeholder="(e.g). Tom Mboya"
            value={data.street}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="submit">
        <input type="submit" value="Update" style={{background:"8C68CC"}}/>
        <button>delete</button>
        </div>
      </Form>
    </Main>
  );
};

const Main = styled.section`
  ${tw`max-w-[880px] mx-auto flex flex-col items-center p-12 md:p-24 py-12 space-y-8`}
`;
const Form = styled.form`
  ${tw`w-full flex flex-col space-y-5`}
  header {
    font-family: PoppinsBold;
    ${tw`capitalize`}
  }
  .submit,
  .input {
    ${tw`w-full max-w-[400px] flex items-start flex-col space-y-2`}
    label {
      font-family: PoppinsSemiBold;
      ${tw`text-[rgba(0,0,0,.7)] capitalize text-sm`}
    }
    textarea,
    input {
      font-family: DMsansRegular;
      ${tw`w-full py-2 px-5 border border-[rgba(0,0,0,.5)] text-[rgba(0,0,0,.7)] rounded-lg`}
      :placeholder {
        ${tw`capitalize text-[rgba(0,0,0,.7)]`}
      }
    }
  }
  .submit {
    ${tw`max-w-none flex-row justify-between items-end`}
    button, input {
      ${tw`w-auto cursor-pointer border-none py-2.5 px-5 bg-newPurple text-white rounded-lg`}
    }
    button{
      ${tw`bg-newOrange`}
    }
  }
`;
