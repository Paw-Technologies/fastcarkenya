import { useState } from "react"
import {delProduct} from '../Functions/funcs'

export const useLongHold = () => {
    const [time, setTime ] = useState({
        start: null,
        stop: Date.now(),
    })

    const handleKeyPress = (e, id) => {
        if(e.type==='mousedown'){
            if(time.start !== null) return
            return setTime(p=>({...p, start: Date.now()})) 
        }
        if(e.type==='mouseup'){

            setTime(p=>({...p, stop: Date.now()}))
            if ((time.stop - time.start)/1000 >= 5){
                return delProduct(id)
            }
    
            return alert(`To delete, hold button down for 5 seconds: , ${(time.stop - time.start)/1000}`)
        }
    }

    return {
        holdToDelete: handleKeyPress
    }

}


