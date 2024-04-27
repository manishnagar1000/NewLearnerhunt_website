import React from "react";
import dynamic from "next/dynamic";

const Index = () => {
  const Summernote = dynamic(() => import("../Comps/CreateBlog"),{
    ssr: false,
  });
  return <Summernote/>;
};

export default Index;