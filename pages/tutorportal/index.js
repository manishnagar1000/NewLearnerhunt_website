import React from "react";
import { useEffect } from "react";

function Index() {
  useEffect(() => {

      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/check-status", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("tp")}`
          }
      }).then(async(response) => {
        var res =await response.json()
        // console.log(res)
        if(res.status){
          if(sessionStorage.getItem("selectedPath")){
            
          window.location.href = `${sessionStorage.getItem("selectedPath")}`
        }else{
            window.location.href = "/tutorportal/my-profile"

          }
        }
      });

  }, [])
  
  return (
     
     <></>
  );
}
export default Index;