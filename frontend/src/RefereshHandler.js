import  { useEffect } from 'react'
import { useLocation , useNavigate } from 'react-router-dom';
function RefereshHandler({setIsAutheticated}) {

  const location = useLocation();
  const navigate = useNavigate();

   useEffect(()=>{
    if(localStorage.getItem('token')){
      setIsAutheticated(true);
    
     if(location.pathname === '/login' || location.pathname === '/' || location.pathname === '/signup' ){
      navigate('/home' , {replace : false});
     } 
    }
   },[location , navigate , setIsAutheticated]);
  return (
    null 
  )
}

export default RefereshHandler