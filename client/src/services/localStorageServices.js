const storeToken = (value)=>{
    localStorage.setItem('token',value)
}
const getToken = ()=>{
    let token = localStorage.getItem('token')
    return token
}
const removeToken = (value)=>{
    localStorage.removeItem(value) 
}

const storeIsAdmin = (value)=>{
    localStorage.setItem('isAdmin',value)
}
const getIsAdmin = ()=>{
    let user = localStorage.getItem('isAdmin')
    return user;
}

export {storeToken,getToken,removeToken,storeIsAdmin,getIsAdmin}