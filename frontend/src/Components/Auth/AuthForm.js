import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
const body = {
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmpassword: "",
};
export const LoginForm = () => {
  const [data, setData] = useState(body);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  return (
    <Main>
        <Form>
          <header>Login</header>
          <div className="input">
            <label htmlFor="name"> Username </label>
            <input
              type="text"
              name="name"
              placeholder="(e.g). JohnDoe"
              value={data.username}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="input">
            <label htmlFor="password"> password </label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="submit">
            <input type="submit" value="login"/>
          </div>
          <div className="links">
        <p>Don't have an account <Link to="/signup">Sign Up</Link></p>
        </div>
        </Form>
    </Main>
  );
};

export const SignUpForm = () => {
  const [data, setData] = useState(body);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  return (
    <Main>
      <Form>
        <header>Sign Up</header>
        <div className="input">
          <label htmlFor="name"> First Name </label>
          <input
            type="text"
            name="firstname"
            placeholder="(e.g). John"
            value={data.firstname}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input">
          <label htmlFor="name"> Last Name </label>
          <input
            type="text"
            name="lastname"
            placeholder="(e.g). Doe"
            value={data.lastname}
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
          <label htmlFor="password1"> password </label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input">
          <label htmlFor="password2"> confirm password </label>
          <input
            type="password"
            name="confirmpassword"
            value={data.confirmpassword}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="submit">
        <input type="submit" value="sign up" />
        </div>
        <div className="links">
        <p>Already have an an account ? <Link to="/login">Login</Link></p>
        </div>
      </Form>
    </Main>
  );
};
const Main = styled.section`
${tw`bg-white w-full max-w-[400px] border-t-[5px] border-solid border-newBlue rounded-lg p-12 pt-8`}
box-shadow:0px 4px 8px 0px rgba(140, 104, 204, .25);
`

const Form = styled.form`
  ${tw`flex flex-col space-y-5`}
  
  header {
    font-family: PoppinsBold;
    ${tw`capitalize w-full text-center text-newBlue`}
  }
  .submit,
  .input {
    ${tw`w-full flex items-start flex-col space-y-2`}
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
    ${tw`items-end`}
    input {
      ${tw`cursor-pointer py-2.5 px-5 bg-newBlue text-white rounded-none`}
    }
  }
  .links{
    ${tw`flex items-center justify-center text-sm`}
    a{
      font-family:PoppinsSemiBold;
      ${tw`text-newBlue hover:underline`}
    }
  }
`;

