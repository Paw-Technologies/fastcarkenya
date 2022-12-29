import { useState } from "react";

export const useUserId = () =>{
    const get_id = () => localStorage.getItem('userId');

    const [userId, setUserId] = useState(get_id());

    const save_id = id =>{
        localStorage.setItem('userId', id);
        setUserId(id)
    }

    return {
        userId,
        rtUserId: get_id,
        setUserId: save_id
    }
}