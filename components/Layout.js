import React from "react";
import Topbar from "./Topbar";
import Footer from "./Footer";
import { useRouter } from "next/router";
import WhatsAppButton from "@/components/Whatsup";
import PopForm from "./Comps/PopForm";


const Layout = ({ children }) => {

  const router = useRouter();
  const { pathname } = router;

  return (
    <>
      {!pathname.startsWith("/adminportal") &&
        !pathname.startsWith("/leads") &&
        !pathname.startsWith("/ads/thankupageisbr") &&
        !pathname.startsWith("/ads/isbr") &&
        !pathname.startsWith("/edufest/2023") &&
        !pathname.startsWith("/counsellorportal") &&
        !pathname.startsWith("/collegeportal") && 
        !pathname.startsWith("/ads/mbaleads") && 
        !pathname.startsWith("/tutorportal") && 
        !pathname.startsWith("/ads/btech-bca-bba-college-admission") && 
        !pathname.startsWith("/ads/llb-college-admission") && 
        !pathname.startsWith("/ads/psychology-college-admission") && 



     <Topbar />}
     {!pathname.startsWith("/adminportal") &&
     !pathname.startsWith("/collegeportal") &&
     !pathname.startsWith("/counsellorportal") &&
     !pathname.startsWith("/ads/mbaleads") && 
     !pathname.startsWith("/tutorportal") && 
     !pathname.startsWith("/ads/btech-bca-bba-college-admission") && 
        !pathname.startsWith("/ads/llb-college-admission") && 
        !pathname.startsWith("/ads/psychology-college-admission") && 

     <PopForm/>}
 {!pathname.startsWith("/adminportal") &&
     !pathname.startsWith("/collegeportal") &&
     !pathname.startsWith("/counsellorportal") &&
     !pathname.startsWith("/ads/mbaleads") && 
     !pathname.startsWith("/tutorportal") && 
     !pathname.startsWith("/ads/btech-bca-bba-college-admission") && 
        !pathname.startsWith("/ads/llb-college-admission") && 
        !pathname.startsWith("/ads/psychology-college-admission") && 

     <WhatsAppButton/>}

      {children}
      {!pathname.startsWith("/dashboard") &&
        !pathname.startsWith("/adminportal") &&
        !pathname.startsWith("/leads") &&
        !pathname.startsWith("/ads/thankupageisbr") &&
        !pathname.startsWith("/ads/isbr") &&
        !pathname.startsWith("/collegeportal") &&
        !pathname.startsWith("/counsellorportal") &&
        !pathname.startsWith("/ads/mbaleads") && 
        !pathname.startsWith("/ads/btech-bca-bba-college-admission") && 
        !pathname.startsWith("/ads/llb-college-admission") && 
        !pathname.startsWith("/ads/psychology-college-admission") && 
        !pathname.startsWith("/tutorportal") && 

        <Footer data={children.props.testeligibility}/>}
    </>
  );
};

export default Layout;
