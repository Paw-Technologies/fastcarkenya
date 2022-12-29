
import { useEffect, useState } from "react";

export const useToken = () =>{

    const get_token = () => localStorage.getItem('accessTkn');

    const [token, setToken] = useState(get_token());

    const save_token = (token) =>{
        localStorage.setItem('accessTkn', token)
        setToken(token)
    }

    useEffect(()=>{
        setToken(get_token())
    }, [token])

    return {
        token: token,
        rtToken: get_token,
        setToken: save_token
    }
}
