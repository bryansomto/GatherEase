import React, { useState , useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGlobally } from "../../context/AppContext";
import { Main, Form } from "./styles"
import {FormError} from "../all/error/FormError"
import {verifyLogin} from "../utils/Auth"
const body = {
    email: "",
    password: "",
  };
const Login = () => {
  const {login_error,loginUser,setFormError,user} = useGlobally()
  const {type} = useParams()
  const navigate = useNavigate()
  let currentType = (type === "organizer") ? "organizer" : "user"
    const [data, setData] = useState(body);
    const handleChange = (e) => {
      const { name, value } = e.target; 
      setData({ ...data, [name]: value });
    };
    const handleSubmit = (e)=>{
      e.preventDefault()
      const {email,password} = data
      if(verifyLogin({email,password,changeErr})){
        loginUser(currentType,{email,password})
      }
    }
    const changeErr = (err)=>{
      setFormError("login", err)
    }
    useEffect(() => {
      if(user){
        changeErr({msg:"Loggin successful. Redirecting...",show:true,type:"success"})
        setTimeout(()=>navigate("/profile"), 3000)
      }
    }, [user])
    
    return (
      <Main>
          <Form onSubmit={(e)=>handleSubmit(e)}>
            <header>Login</header>
            <FormError {...login_error}/>
            <div className="input">
              <label htmlFor="name"> Email </label>
              <input
                type="email"
                name="email"
                placeholder="(e.g). abc@gmail.com"
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
            <div className="submit">
              <input type="submit" value="login"/>
            </div>
            <div className="links">
          <p>Don't have an account <Link to={`/${currentType }/signup`}>Sign Up</Link></p>
          </div>
          <div className="links">
            {
              currentType === "user" ? <p>Are you an <Link to={`/organizer/login`}>organizer</Link> ?</p>
              : <p>Are you a <Link to={`/user/login`}>user</Link> ?</p>
            }
          </div>
          </Form>
      </Main>
    );
  };

  export default Login