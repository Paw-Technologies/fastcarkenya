import api2 from "../apis/api2";

export const delProduct = async(id) => {
    let token = localStorage.getItem('accessTkn')
    
    if(!token) return alert("You need to log in to complete the operation")
    await api2.delete('/deleteproduct', {headers: {prodId: id}})
    .then(res=>{
        alert("Action Completed")
        return true
    }, (error)=>{
        alert(error.message)
        return false
    })
    .catch(({response})=>{
        alert(response.alert.message)
        return false
    })
}

export const holdToDelete = (e, id) =>{
    let start, stop ;
    if(e.type==='mousedown'){
        start = new Date.now()
        return
    }
    if(e.type==='mouseup'){
        stop = Date.now()
        if ((stop - start)/1000 >= 5){
            return delProduct(id)
        }

        return alert(`To delete, hold button down for 5 seconds: , ${(stop - start)/1000}`)
    }
}

export const getUser = async(id) =>{
    return new Promise((resolve, reject)=>{
        let user = api2.get('/getuser', {headers: {userid: id}})
        if(user)return resolve(user)
        reject({name: "Error"})
    })
}

export const timeParser = (newDate) =>{
    let isPm = () => newDate.getHours > 12 ? "pm" : "am"
    let hours = () =>{
        if (newDate.getHours() > 12) return newDate.getHours() - 12
        if (newDate.getHours() === 0) return 12
        return newDate.getHours()
    }
    let minutes = () => newDate.getMinutes() < 10 ? "0"+newDate.getMinutes() : newDate.getMinutes()

    return hours() + " : " + minutes() + isPm()
}

export let messagesHardCode = []
