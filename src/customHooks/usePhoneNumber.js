import { useState } from "react"
import api from "../apis/api"
import api2 from "../apis/api2"


const usePhoneNumber = () =>{
    const getPhoneNumber = async(userId) =>{
        await api2.get('/getseller', {headers: {userId: userId} })
        .then(res=>{

        })
    }
}
