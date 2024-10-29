import Loading from "@/pages/Loading";
import axios from "axios";
import {  useLayoutEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  
  const [cookie, setCookie, removeCookie] = useCookies(['token']);
  const token = cookie.token;
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    const verifyToken = async() => {
      if(token){
        const response = await axios.get('http://localhost:5000/auth/isAuth', {
          headers: {Authorization: `Bearer ${token}`}
        });
        console.log(response.data.auth);
        setIsAuth(response.data.auth)
      
      }else{
        setIsAuth(false);
        throw new Error("No token");
        
      }
    }

    verifyToken();
  },[]) 

  if(isAuth === null){
    return <div><Loading /></div>
  }
  
  if(isAuth){
    return <Outlet />
  }else{
    return <Navigate to={'/login'} />
  }
};

export default Protected;