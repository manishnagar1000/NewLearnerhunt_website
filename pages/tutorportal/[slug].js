import React, { useEffect } from "react";
import PortalLayout from "/components/tutorDashboardCrm/Portallayout";
import { useRouter} from "next/router";
import Swal from "sweetalert2";
import MyProfile from "@/components/tutorDashboardCrm/Myprofile";

const componentList = [
  {
    comp: <MyProfile />,
    slug: "my-profile",
  }
];
export default function AdminPortalSlug() {
  const router = useRouter();
  // console.log(router)
  const { slug} = router.query;
  // console.log(slug);
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
        Authorization: `Bearer ${localStorage.getItem("tp")}`,
      },
    }).then(async (response) => {
      var res = await response.json();
      // console.log(res);
      if (!res.status) {
        window.location.href = "/tutorportal/my-profile";
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
      if (result.isConfirmed) {
      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/logout", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("tp")}`
        }
      }).then(async(response) => {
          var res =await response.json()
      //  console.log(res)
    if (!res.data.status) {
      localStorage.removeItem("tp");
        window.location.href = "/";
      }
          })
        }
    });
  };
  return (
    <PortalLayout onLogout={handleLogout}>
      {!data ? "not found" : data.comp}
    </PortalLayout>
  );
}
