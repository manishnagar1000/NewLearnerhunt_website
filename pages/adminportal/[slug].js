import React, { useEffect } from "react";
import PortalLayout from "/components/CRM/Portallayout";
import { useRouter, notFound } from "next/router";
import Dashboard from "/components/CRM/Dashboard";
import Addcollege from "/components/CRM/addcollege/Addcollege";
import Allcollege from "/components/CRM/addcollege/Allcollege";
import ApiIntegration from "/components/CRM/ApiIntegration";
import TrashColleges from "/components/CRM/TrashCollege";
import Imarticus from "/components/CRM/Imarticus";
import VuPune from "/components/CRM/VuPune";
import Swal from "sweetalert2";
import Testeligibility from "@/components/CRM/Leads/Testeligibility";
import AppliedCollege from "@/components/CRM/Leads/AppliedCollege";
import StudentRegistered from "@/components/CRM/Leads/StudentRegistered";
import PopupLeads from "@/components/CRM/Leads/PopupLeads";
import LoanLeads from "@/components/CRM/Leads/LoanLeads";
import DialerLeads from "@/components/CRM/Leads/DialerLeads";
import UgLeads from "@/components/CRM/Leads/UgLeads";
import LlbLeads from "@/components/CRM/Leads/LlbLeads";
import PsychologyLeads from "@/components/CRM/Leads/PsychologyLeads";




import AddLeads from "@/components/CRM/AddLeads";
import CollegeAdmins from "@/components/CRM/CollegeAdmins";
import ImportExport from "/components/CRM/ImportExport";
import ClgadminRegister from "@/components/CRM/ClgadminRegister";
import ActiveDeactiveclg from "@/components/CRM/ActiveDeactiveclg";
import ManageUser from "@/components/CRM/ManageUser";
import AssociatedCounsellorCrm from "@/components/CRM/AssociatedCounselorCrm";
import LandingPageLeads from "@/components/CRM/LandingPageLeads";
import TopCollegeSection from "@/components/CRM/TopCollegeSection";
import SEOManage from "@/components/CRM/SeoManage";
import CrmBlog from "@/components/CRM/CrmBlog";
import CrmNews from "@/components/CRM/CrmNews";
import CrmBlogCategory from "@/components/CRM/CrmBlogCategory";
import BlogManager from "@/components/CRM/BlogManager";
import AddCourses from "@/components/CRM/addcourses/AddCourses";
import AllCourses from "@/components/CRM/addcourses/AllCourses";

import AddExams from "@/components/CRM/addexams/AddExams";
import AllExams from "@/components/CRM/addexams/AllExams";




const componentList = [
  {
    comp: <Dashboard />,
    slug: "dashboard",
    role:[0,4,5]
  },
  {
    comp: <Addcollege />,
    slug: "addcollege",
    role:[4,5]
  },
  {
    comp: <Allcollege />,
    slug: "allcollege",
    role:[0,4,5]
  },
  {
    comp: <AddCourses />,
    slug: "addcourse",
    role:[4,5]
  },
  {
    comp: <AllCourses />,
    slug: "allcourses",
    role:[0,4,5]
  },
  {
    comp: <AddExams />,
    slug: "addexam",
    role:[4,5]
  },
  {
    comp: <AllExams />,
    slug: "allexams",
    role:[0,4,5]
  },
  {
    comp:<ApiIntegration/>,
    slug:"api",
    role:[4]
  },
  {
    comp:<Imarticus/>,
    slug:"imarticus",
    role:[4]
  },
  {
    comp:<VuPune/>,
    slug:"vu-pune",
    role:[4]
  },
  {
    comp:<Testeligibility/>,
    slug:"testeligibility",
    role:[0,4]
  },
  {
    comp:<AppliedCollege/>,
    slug:"appliedcollege",
    role:[0,4]
  },
  {
    comp:<StudentRegistered/>,
    slug:"studentregister",
    role:[0,4]
  },
  {
    comp:<AddLeads/>,
    slug:"adleads",
    role:[0,4]
  },
  {
    comp:<CollegeAdmins/>,
    slug:"collegeadmins",
    role:[0]
  },
  {
    comp:<TrashColleges/>,
    slug:"trash",
    role:[0,4,5]
  },
  {
    comp:<PopupLeads/>,
    slug:"popupregister",
    role:[0,4]
  },
  {
    comp:<ClgadminRegister/>,
    slug:"create-clg-admin",
    role:[0,4]
  },
  {
    comp:<ActiveDeactiveclg/>,
    slug:"activedeactive-clg",
    role:[0,4]
  },
  {
    comp:<ManageUser/>,
    slug:"manage-users",
    role:[0]
  },
  {
    comp:<AssociatedCounsellorCrm/>,
    slug:"associated-counsellor",
    role:[0,4]
  },
  {
    comp:<LandingPageLeads/>,
    slug:"mbaleads",
    role:[0,4]
  },
  {
    comp:<UgLeads/>,
    slug:"ugleads",
    role:[0,4]
  },
  {
    comp:<LlbLeads/>,
    slug:"llbleads",
    role:[0,4]
  },
  {
    comp:<PsychologyLeads/>,
    slug:"psychologyleads",
    role:[0,4]
  },
  {
    comp:<LoanLeads/>,
    slug:"loanleads",
    role:[0,4]
  },
  {
    comp:<DialerLeads/>,
    slug:"dialerleads",
    role:[0,4]
  },
  {
    comp:<TopCollegeSection/>,
    slug:"web-top-colleges",
    role:[4]
  },
  {
    comp:<SEOManage/>,
    slug:"seo-manager",
    role:[0,5]
  },
  {
    comp:<BlogManager/>,
    slug:"blog-manager",
    role:[0,5]
  },
  {
    comp:<CrmBlog/>,
    slug:"blogs",
    role:[0,5]
  },
  {
    comp:<CrmBlogCategory/>,
    slug:"blog-category",
    role:[0,5]
  },
  {
    comp:<CrmNews/>,
    slug:"news-manager",
    role:[0,5]
  },
  // {
  //   comp:<ImportExport/>,
  //   slug:"importexport",
  //   role:[0]
  // }
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
      if (result.isConfirmed) {
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
        }
    });
  };
  return (
    <PortalLayout onLogout={handleLogout}>
      {data && data.role.includes(Number(localStorage.getItem('crmrole'))) ?  data.comp:
       <div
       className="d-flex justify-content-center align-items-center w-100 h-100"
     ><span style={{fontWeight:"500"}}>Not Found 😞</span></div> }
    </PortalLayout>
  );
}
