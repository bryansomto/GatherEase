import React, { useState } from "react";
import { Form } from "../styles";
const body = {
  name: "",
  message: "",
  email: "",
  phone: "",
};
export const LoginForm = () => {
  const [data, setData] = useState(body);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  return (
    <Form>
      <header>Contact us</header>
      <div className="input">
        <label htmlFor="name"> name </label>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={data.name}
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
        <label htmlFor="phone"> phone </label>
        <input
          type="phone"
          name="phone"
          placeholder="+2547..."
          value={data.phone}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="input">
        <label htmlFor="message"> message </label>
        <textarea
          name="message"
          placeholder="Type your message"
          value={data.message}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="submit">
        <input type="submit" value="send" />
      </div>
    </Form>
  );
};
