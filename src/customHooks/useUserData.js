import { useState } from 'react'

const useUserData = () => {
    
    const getUserId = () => localStorage.getItem('userId');
    const getuseToken = () => localStorage.getItem('accessTkn');
    const getUserEmail = () => localStorage.getItem('userEmail');
    const getUserName = () => localStorage.getItem('userName');
    const getUserPhone = () => localStorage.getItem('userPhone');

    const [userDetails, setUserDetails] = useState({
        name: getUserId(),
        phone: getUserPhone(),
        email: getUserEmail(),
        userId: getUserId(),
        token: getuseToken()
    })

    const setUserData = (key, value) => {
        switch (key) {
            case 'i':
                localStorage.setItem('userId', value);
                setUserDetails(p=>({...p, userId: getUserId()}));
                break;
            case 't': 
                localStorage.setItem('accessTkn', value);
                setUserDetails(p=>({...p, accessTkn: getuseToken()}));
                break;
            case 'e': 
                localStorage.setItem('userEmail', value);
                setUserDetails(p=>({...p, email: getUserEmail()}));
                break;
            case 'n': 
                localStorage.setItem('userName', value);
                setUserDetails(p=>({...p, name: getUserName()}));
                break;
            case 'p':
                localStorage.setItem('userPhone', value);
                setUserDetails(p=>({...p, phone: getUserPhone()}));
                break;
            default:
                break;
        }
        
    }

    return [userDetails, setUserData];

}

export default useUserData