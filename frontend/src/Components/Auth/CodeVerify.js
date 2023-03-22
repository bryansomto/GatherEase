import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useGlobally } from '../../context/AppContext'
import { FormError } from '../all/error/FormError'
import { Form, Main } from './styles'
import { verifyCode } from '../utils/Auth'
export const CodeVerify = () => {
    const [data,setData] = useState({phone:"",code:""})
    const {type} = useParams()
    let currentType = (type === "organizer") ? "organizer" : "user"
    const {code_error,setFormError,confirmUser} = useGlobally()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
      };
      const handleSubmit = (e)=>{
        e.preventDefault()
        const {phone,code} = data
        if(verifyCode({phone,code,changeErr})){
            confirmUser(currentType,{phone,code})
        }
      }
      const changeErr = (err)=>{
        setFormError("code", err)
      }
  return (
    <Main>
          <Form onSubmit={(e)=>handleSubmit(e)}>
            <header>Code Verification</header>
            <FormError {...code_error}/>
            <div className="input">
              <label htmlFor="name"> Email </label>
              <input
                type="text"
                name="phone"
                placeholder="(e.g). +254723232323"
                value={data.phone}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="input">
              <label htmlFor="code"> code </label>
              <input
                type="text"
                name="code"
                placeholder='(e.g) 234566'
                value={data.code}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="submit">
              <input type="submit" value="Confirm"/>
            </div>
          </Form>
      </Main>
  )
}
