import React, { useState } from "react";
import { Main, Form } from "../styles";
const body = {
  name: "",
  location: { city: "", country: "" },
  username: "",
  email: "",
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
          <label htmlFor="name"> Name </label>
          <input
            type="text"
            name="name"
            placeholder="(e.g). John"
            value={data.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input">
          <label htmlFor="name"> Location </label>
          <input
            type="text"
            name="city"
            placeholder="(e.g). Doe"
            value={data.location.city}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            name="country"
            placeholder="(e.g). Doe"
            value={data.location.country}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input">
          <label htmlFor="username"> Username </label>
          <input
            type="text"
            name="username"
            placeholder="abc@gmail.com"
            value={data.username}
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
        <button className="submit" type="button" value="send" />
      </Form>
    </Main>
  );
};
