import React, { useState } from "react";
import { Form } from "../styles";
const body = {
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  password1: "",
  password2: "",
};
export const LoginForm = () => {
  const [data, setData] = useState(body);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  return (
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
        <input type="submit" value="send" />
      </div>
    </Form>
  );
};

export const SignUpForm = () => {
  const [data, setData] = useState(body);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  return (
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
          name="password1"
          value={data.password1}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="input">
        <label htmlFor="password2"> confirm password </label>
        <input
          type="password"
          name="password2"
          value={data.password2}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="submit">
        <input type="submit" value="send" />
      </div>
    </Form>
  );
};
