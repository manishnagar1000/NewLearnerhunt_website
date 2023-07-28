import React , {useState,useEffect} from 'react'
import PortalLogin from '../../components/CRM/Portallogin';
import PortalLayout from '../../components/CRM/Portallayout';


export default function index() {
    const [auth, setAuth] = useState(false);

    useEffect (() => {
      const userid = localStorage.getItem('puserid');
    const username = localStorage.getItem('pusername');
  
      if (userid !== "-1" && userid !== null) {
        setAuth(true)
      }
    }, []);
  return (
    <div>
          {!auth ?
     <PortalLayout />
      :
      <PortalLogin
      onLogin={(userdata,username) => {
          console.log(userdata,username)
          localStorage.setItem('puserid', JSON.stringify(userdata));
          localStorage.setItem('pusername', JSON.stringify(username));
                setAuth(true)
        }}/>
      }
        
    </div>
  )
}
