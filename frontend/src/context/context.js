import { createContext, useState } from "react";
export const userContext=createContext();
export const UserProvider=({children})=>{
    
    
    const [user,setUser]=useState({});
    const [filter,setFilter]=useState(0)
    const value={user,setUser,filter,setFilter};
    return(
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    )
}
