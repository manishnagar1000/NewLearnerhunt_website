import React from "react";
import CreateExam from "./addexamfields/CreateExam";
import { useRouter } from "next/router";

const Addexam = (props) => {
  const router = useRouter();
  const { e } = router.query;
  var disabledTabs = [];
  if (e && e != undefined) {
  } else {
    disabledTabs = [];
  }
 
  return (
    <>
      <CreateExam edit_id={e||""}/>
    </>
  );
};
export default Addexam;
