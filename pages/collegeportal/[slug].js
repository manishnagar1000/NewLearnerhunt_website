import React, { useEffect } from "react";
import PortalLayout from "/components/collegeDashboardCrm/Portallayout";
import { useRouter, notFound } from "next/router";
import Addcollege from "/components/collegeDashboardCrm/addcollege/Addcollege";
import Swal from "sweetalert2";
import MyKyc from "/components/collegeDashboardCrm/MyKyc";
import InterestedLeads from "/components/collegeDashboardCrm/InterestedLeads";
import CampaignLeads from "/components/collegeDashboardCrm/CampaignLeads";
import AssociatedCounsellor from "@/components/collegeDashboardCrm/AssociatedCounsellor";
import Support from "@/components/collegeDashboardCrm/Support";

const componentList = [
  {
    comp: <MyKyc />,
    slug: "my-kyc",
  },
  {
    comp: <Addcollege />,
    slug: "my-college",
  },
  {
    comp: <InterestedLeads />,
    slug: "interested-leads",
  },
  {
    comp: <AssociatedCounsellor />,
    slug: "associated-counsellor",
  },
  {
    comp: <Support/>,
    slug: "support",
  },
  {
    comp: <CampaignLeads />,
    slug: "campaign-leads",
  },
  // {
  //   comp: <Allcollege />,
  //   slug: "allcollege",
  // },

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
        Authorization: `Bearer ${localStorage.getItem("ct")}`,
      },
    }).then(async (response) => {
      var res = await response.json();
      // console.log(res);
      if (!res.status) {
        window.location.href = "/collegeportal/my-kyc";
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
          'Authorization': `Bearer ${localStorage.getItem("ct")}`
        }
      }).then(async(response) => {
          var res =await response.json()
      //  console.log(res)
    if (!res.data.status) {
      localStorage.removeItem("ct");
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
