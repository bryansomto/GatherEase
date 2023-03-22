import React, { useState } from "react";
import { Main, Form } from "../styles";
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
      <section className="flex flex-col w-full items-center p-12 md:p-24 py-12 space-y-8">
        <Form>
          <section></section>
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
          <button className="authButton" type="button" value="send">
            Send
          </button>
        </Form>
      </section>
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
        <header>Register</header>
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
        <button className="submit" type="button" value="send" />
      </Form>
    </Main>
  );
};
