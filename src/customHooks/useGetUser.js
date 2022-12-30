import { useState } from "react";
import { json } from "react-router-dom";
import api2 from "../apis/api2";

export const useGetUser = () =>{
    
    const get_user = (id)=>{
        // localStorage.removeItem(`${id}`)
        try {
           return JSON.parse(sessionStorage.getItem(`${id}`)) 
        } catch (error) {
            fetch_user(id)
            return {name: "Waiting...."}
        }
        
    }

    const [user, setUser] = useState({name: "loading"})

    const fetch_user = async(id) =>{
        await api2.get('/getuser', {headers: {userid: id}})
        .then(res=>{
            setUser(res.data.user)
            sessionStorage.setItem(`${id}`, JSON.stringify(res.data.user))
        })
        .catch(err=>{
                
        })
    }

    const getuser = (id) =>{
        setUser(get_user(id))
        return user
    }

    return {
        user,
        get_user,
        fetch_user,
        getuser
    }
}

