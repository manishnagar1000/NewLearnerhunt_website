import React, { useEffect } from "react";
import PortalLayout from "/components/CRM/PortalLayout";
import { useRouter, notFound } from "next/router";
import Dashboard from "@/components/CRM/Dashboard";
import Addcollege from "@/components/CRM/addcollege/Addcollege";
import Allcollege from "@/components/CRM/addcollege/Allcollege";

import Swal from "sweetalert2";
const componentList = [
  {
    comp: <Dashboard />,
    slug: "dashboard",
  },
  {
    comp: <Addcollege />,
    slug: "addcollege",
  },
  {
    comp: <Allcollege />,
    slug: "allcollege",
  },
];
export default function AdminPortalSlug() {
  const router = useRouter();
  const { slug } = router.query;
  const data = componentList.find((s) => s.slug == slug);
  // console.log(componentList.find((s)=>s.slug==slug))
  // console.log(data);
  // if(!data){
  //   return notFound();
  // }
  useEffect(() => {
    // const pt = localStorage.getItem("pt");

    // if (pt !== null && pt != "") {
    //   router.push("/adminportal/dashboard");
    // }

    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/check-status", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
    }).then(async (response) => {
      var res = await response.json();
      // console.log(res);
      if (!res.status) {
        window.location.href = "/adminportal";
      }
    });
  }, []);

  const handleLogout = () => {
   
    Swal.fire({
      text: "Are you sure you want to Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/logout", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("pt")}`
        }
      }).then(async(response) => {
          var res =await response.json()
      //  console.log(res)
    if (!res.data.status) {
      localStorage.removeItem("pt");
        window.location.href = "/adminportal";
      }
          })
    
    });
  };
  return (
    <PortalLayout onLogout={handleLogout}>
      {!data ? "not found" : componentList.find((s) => s.slug == slug)?.comp}
    </PortalLayout>
  );
}