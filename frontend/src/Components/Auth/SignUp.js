import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGlobally } from "../../context/AppContext";
import { Main, Form } from "./styles";
import { verifyRegister } from "../utils/Auth";
import { FormError } from "../all/error/FormError";
const body = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export const SignUp = () => {
  const { setFormError, register_error, createUser,setError } = useGlobally();
  const [data, setData] = useState(body);
  const navigate = useNavigate()
  const form = useRef()
  const { type } = useParams();
  let currentType = type === "organizer" ? "organizer" : "user";
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, phone, email, password, confirmPassword } =
      data;
    const values = {
      firstName,
      lastName,
      phone,
      email,
      password,
      confirmPassword,
      changeErr,
    };
    form.current.scrollIntoView()  
    if (verifyRegister(values)) {
      createUser(currentType, { firstName, lastName, phone, email, password }).then(()=>{
            changeErr({
              msg: "Redirecting to confirm registration...",
              show: true,
              type: "success",
            });
            setTimeout(()=>navigate(`/${type}/verify`), 3000)
      }).catch(
        (error)=>{
            setError(error, "register", { msg: "", show: true, type: "warning" });
        }
      )
    }
  };
  const changeErr = (err) => {
    setFormError("register", err);
  };
  return (
    <Main ref={form}>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <header>Sign Up</header>
        <FormError {...register_error} />
        <div className="input">
          <label htmlFor="firstName"> First Name </label>
          <input
            type="text"
            name="firstName"
            placeholder="(e.g). John"
            value={data.firstName}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input">
          <label htmlFor="lastName"> Last Name </label>
          <input
            type="text"
            name="lastName"
            placeholder="(e.g). Doe"
            value={data.lastName}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input">
          <label htmlFor="phone"> phone number </label>
          <input
            type="text"
            name="phone"
            placeholder="(e.g) +245712121212"
            value={data.phone}
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
          <label htmlFor="password"> password </label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input">
          <label htmlFor="confirmPassword"> confirm password </label>
          <input
            type="password"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="submit">
          <input type="submit" value="sign up" />
        </div>
        <div className="links">
          <p>
            Already have an an account ?{" "}
            <Link to={`/${currentType}/login`}>Login</Link>
          </p>
        </div>
        <div className="links">
          {currentType === "user" ? (
            <p>
              Are you an <Link to={`/organizer/signup`}>organizer</Link> ?
            </p>
          ) : (
            <p>
              Are you a <Link to={`/user/signup`}>user</Link> ?
            </p>
          )}
        </div>
      </Form>
    </Main>
  );
};
export default SignUp;
