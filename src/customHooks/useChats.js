import { useState } from "react";
import api2 from "../apis/api2";
import useUserData from "./useUserData";

const useChats = () =>{
    const [userDetails] = useUserData()
    const fetch = () =>{
        let x = api2.get('/getchats', {headers: {userId: userDetails.userId}})
        return x.data.chats
    } 

    const getChats = () => {
        try {
            return JSON.parse(sessionStorage.getItem('chats'))
        } catch (error) {
            //fetch data
        }
    }

    const setChats = () =>{
        sessionStorage.setItem('chats', fetch())
    }

    return {getChats}
}

export default useChats
