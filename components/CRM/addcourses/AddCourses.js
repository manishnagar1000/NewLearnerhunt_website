import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Classes from "/styles/addCollege.module.css";
import CreateCourse from "./addcoursefields/CreateCourse";
import { useRouter } from "next/router";

const Addcourse = (props) => {
  const router = useRouter();
  const { e } = router.query;
  var disabledTabs = [];
  if (e && e != undefined) {
  } else {
    disabledTabs = [];
  }
  // const [selectedTab, setSelectedTab] = useState("0");
  // const handleSelectTab = (k) => {
  //   setSelectedTab(k);
  //   sessionStorage.setItem("st", k);
  // };

  // const defaultOpentab = () => {
  //   const sTab = sessionStorage.getItem("st");
  //   if (sTab && sTab != "0") {
  //     handleSelectTab(sTab);
  //   }
  // };

  // useEffect(() => {
  //   const sTab = sessionStorage.getItem("st");
  //   if (!disabledTabs.includes(sTab)) {
  //     // console.log("colling")
  //     defaultOpentab();
  //   }
  // }, []);

  // const onSuccess = () => {
  //   defaultOpentab();
  // };
  return (
    <>
      {/* <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className={`${Classes["custom-tabs mb-3"]}`}
        onSelect={(k) => handleSelectTab(k)}
        activeKey={selectedTab}
        style={{
          background: "white",
          position: "sticky",
          top: "0",
          zIndex: "9",
        }}
      >
        <Tab
          eventKey="0"
          title="General Info"
          disabled={disabledTabs.includes("0")}
        >
          {selectedTab == "0" && <Gernal edit_id={e||""}/>}
        </Tab>
      </Tabs> */}
      <CreateCourse edit_id={e||""}/>
    </>
  );
};
export default Addcourse;
