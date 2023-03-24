export const verifyLogin = ({email, password, changeErr})=>{
    if(!email || !password){
        changeErr({
            msg:"All Fields are required",
            show:true,
            type:"warning"
        })
        return false
    }
    if(password.length < 8){
        changeErr({
            msg:"Password must be atleast 8 characters",
            show:true,
            type:"warning"
        })
        return false
    }
    return true
}
export const verifyRegister = ({firstName,lastName,phone,email,password,confirmPassword, changeErr})=>{
    if(!email || !password || !phone || !firstName || !lastName || !confirmPassword){
        changeErr({
            msg:"All Fields are required",
            show:true,
            type:"warning"
        })
        return false
    }
    if(password.length < 8){
        changeErr({
            msg:"Password must be atleast 8 characters",
            show:true,
            type:"warning"
        })
        return false
    }
    if(phone.length < 13){
        changeErr({
            msg:"Phone must be atleast 13 characters starting with +254 or +234",
            show:true,
            type:"warning"
        })
        return false
    }
    if(!phone.startsWith("+254") && !phone.startsWith("+234")){
        changeErr({
            msg:"Phone must start with +254",
            show:true,
            type:"warning"
        })
        return false
    }
    if(password !== confirmPassword){
        changeErr({
            msg:"Passwords do not match",
            show:true,
            type:"warning"
        })
        return false
    }
    return true
}

export const verifyCode = ({phone,code,changeErr})=>{
    if( !phone || !code){
        changeErr({
            msg:"All Fields are required",
            show:true,
            type:"warning"
        })
        return false
    }
    if(phone.length < 13){
        changeErr({
            msg:"Phone must be 13 characters starting with +254 or +234",
            show:true,
            type:"warning"
        })
        return false
    }
    if(!phone.startsWith("+254") && !phone.startsWith("+234")){
        changeErr({
            msg:"Phone must start with +254 or +234",
            show:true,
            type:"warning"
        })
        return false
    }

    return true
}