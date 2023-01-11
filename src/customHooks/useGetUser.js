// import { } from "react";
// import { json } from "react-router-dom";
import api2 from "../apis/api2";

export const useGetUser = (id, set) =>{
    const get_user = async() =>{
    
        try {
            let user = JSON.parse(sessionStorage.getItem(`${id}`));
            if(user === null) throw Error()
        } catch (error) {
            await api2.get('/getuser', {headers: {userid: id}})
            .then(res=>{
                console.log(res.data)
            }, err=>{
                console.log(err)
            })
            .catch(err=>{
                console.log(err.message)
            })
        }
    }

    // const [user, setUser] = useState()

    return [get_user]
}

