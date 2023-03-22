import React, { useContext, useEffect, useReducer } from 'react'
import { actions, initialState } from './Actions'
import { reducer } from './Reducer'
import axios from 'axios'

const AppProvider = React.createContext()



const AppContext = ({children}) => {
    const [state, dispatch] = useReducer(reducer,initialState)
    const client = axios.create({
        baseURL:"http://gatherease.iankibandi.tech/api/v1",
        headers:{
            "x-auth-token":`${state.token}`
        }
    })
//----- utils -----------------------------------
    const setFormError = (type, error) =>{
        dispatch({
            type:actions.SET_FORM_ERROR,
            payload:{error,type}
        })
        setTimeout(
            ()=>dispatch({
                type:actions.SET_FORM_DEFAULT,
                payload:{type}
            }),3000
        )
    }
    const setError = (error, type, err)=>{
        if(error.response.data){
            setFormError(type, {...err,msg:error.response.data.message})
        }
    }

    const mapper = (role)=>{
        const mapper = {
            "ORGANIZER":process.env.REACT_APP_ORGANIZER,
            "USER":process.env.REACT_APP_USER
        }
        return mapper[role]
    }
    const mapperInvert = (role)=>{
        const mapper = {
            [process.env.REACT_APP_ORGANIZER]:"ORGANIZER",
            [process.env.REACT_APP_USER]:"USER"
        }
        return mapper[role]
    }
    const setLocal = (token, role,id)=>{
        sessionStorage.setItem("token",token)
        sessionStorage.setItem("role",mapper(role))
        sessionStorage.setItem("id",id)
    }
    const setRedirect = (type,status)=>{
        dispatch({
            type:actions.SET_REDIRECT,
            payload:{type,status}
        })
        setTimeout(()=>dispatch({
            type:actions.SET_REDIRECT,
            payload:{type,status:false}
        }), 2000)
    }
//----- users -----------------------------------
    const createUser = async(type,body)=>{
        const path = "register"
        const { firstName,lastName,phone,email,password} = body
        try {
            const {data} = await client.post(`${type}/register`,{firstName,lastName,phone,email,password})
            console.log(data)
            setFormError(path,{msg:"Redirecting to confirm registration...",show:true,type:"success"})
            setRedirect(path,true)
        } catch (error) {
            setError(error, path, {msg:"",show:true,type:"warning"})
            console.log(error)
        }
    }
    const loginUser = async(type,body)=>{
        const {email,password} = body
        const path = "login"
        try {
            const {data} = await client.post(`${type}/login`,{email,password})
            const {user,accessToken} = data
            dispatch({
                type:actions.SETUP_USER,
                payload:{user}
            })
            setLocal(accessToken,user.role,user.profile[`${type}Id`])
            setFormError(path,{msg:"Loggin successful. Redirecting...",show:true,type:"success"})
            setRedirect(path,true)
        } catch (error) {
            setError(error, path, {msg:"",show:true,type:"warning"})
            console.log(error)
        }
    }
    const confirmUser = async(type,body)=>{
        const {phone,code} = body
        const path = "code"
        try {
            const {data} = await client.post(`${type}/confirmation`,{phone,code})
            console.log(data)
            setFormError(path,{msg:"Confirmed registration. Redirecting...",show:true,type:"success"})
            setRedirect(path,true)
        } catch (error) {
            setError(error, path, {msg:"",show:true,type:"warning"})
            console.log(error)
        }
    }
    const getCurrentUser = async ()=>{
        const type = mapperInvert(state.role )
        try {
            const {data} = await client.get(`${type}/profile`)
            console.log(data)
            dispatch({
                type:actions.SETUP_USER,
                payload:{user:data.data}
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(
        ()=>{
            getCurrentUser()
        },[]
    )
  return (
    <AppProvider.Provider value={{...state,createUser,setFormError,loginUser,confirmUser,getCurrentUser}}>
        {children}
    </AppProvider.Provider>
  )
}

const useGlobally  = ()=>{
    return useContext(AppProvider)
}

export {useGlobally,AppContext }