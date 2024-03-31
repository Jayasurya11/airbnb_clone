import React, { useContext } from 'react'
import { userContext } from '../context/context'

import { Navigate } from "react-router-dom";
const PrivateRoute = ({children}) => {
    const {user}=useContext(userContext);
    
    if(!user.name || user.name.length===0 || !user){
        return <Navigate to="/" replace={true}/>
    }
    else{
        return (
            <div>
                {children}
            </div>
          )
    }
  
}

export default PrivateRoute