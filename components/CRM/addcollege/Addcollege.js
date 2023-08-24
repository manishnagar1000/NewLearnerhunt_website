import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Classes from "/styles/addCollege.module.css";
import Gernal from "./addcollegefields/Gernal";
import Overview from "./addcollegefields/Overview";
import Courses from "./addcollegefields/Courses";
import Campus from "./addcollegefields/Campus";
import Admission from "./addcollegefields/Admission";
import Placement from "./addcollegefields/Placement";
import Scholorship from "./addcollegefields/Scholorship";
import Cutoff from "./addcollegefields/Cutoff";
import { Spinner } from "react-bootstrap";
import CollegeRanking from "./addcollegefields/CollegeRanking";

const Addcollege = () => {
  const [selectedTab, setSelectedTab] = useState("0");
  const [isApiHitComplete, setIsApiHitComplete] = useState(true)
  const [isDataFound, setIsDataFound] = useState(false)
  const [clgList, setClgList] = useState([])

  const tabs = {
    "0":"generalinfo",
    "1":"overview",
    "2":"course",
    "3":"campus",
    "4":"admission",
    "5":"scholorship",
    "6":"placement",
    "7":"cutoff",
    "8":"clgrank"

  }
  const handleSelectTab = (k) => {
    setSelectedTab(k)
    sessionStorage.setItem('st', k)
    setIsApiHitComplete(false)
    setIsDataFound(false)
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/GetCollegeList?tab=${tabs[k]}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("pt")}`
      }
    }).then(async res => {
      let response = await res.json()
      // console.log(response)
      if (response.data.length > 0) {
        const data =  response.data.map((s)=>{
          let obj =  {
            _id:s._id,
            college_name:s.college_name,
            disabled:false
          }
          
          if(response.disabled_colleges.includes(s._id)){
            obj.disabled=true
          };

          return obj
        })

        setIsDataFound(true)
        setClgList(data)
      }
      setIsApiHitComplete(true)
    })
  }

  const defaultOpentab = ()=>{
    const sTab = sessionStorage.getItem('st')
    if (sTab && sTab != "0") {
      handleSelectTab(sTab)
    }
  }

  useEffect(() => {
    defaultOpentab()
  }, [])

  const onSuccess = ()=>{
    defaultOpentab()
  }
  return (
    <>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className={`${Classes["custom-tabs mb-3"]}`}
        onSelect={(k) => handleSelectTab(k)}
        activeKey={selectedTab}
      >
        <Tab eventKey="0" title="General Info">
          {selectedTab == '0' && <Gernal />}
        </Tab>
        <Tab eventKey="1" title="Overview">
          {isApiHitComplete ?
            isDataFound ?
              selectedTab == '1' && <Overview onSuccess={onSuccess} collegeList={clgList} />
              :
              <div style={{ display: "flex", width: "100%", height: '80vh', justifyContent: "center", alignItems: 'center' }}>
                <div style={{ fontWeight: "500" }}>
                  <span>Please <span style={{ color: "#0d6efd", cursor: 'pointer' }} onClick={() => setSelectedTab(0)}>+Create</span> a College General Info first</span>
                </div>
              </div>
            :
            <div style={{ display: "flex", width: "100%", height: '80vh', justifyContent: "center", alignItems: 'center' }}>
              <Spinner animation="border" role="status" variant="info">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          }
        </Tab>
        <Tab eventKey="2" title="Courses">
          {isApiHitComplete ?
            isDataFound ?
              selectedTab == '2' && <Courses onSuccess={onSuccess} collegeList={clgList} />
              :
              <div style={{ display: "flex", width: "100%", height: '80vh', justifyContent: "center", alignItems: 'center' }}>
                <div style={{ fontWeight: "500" }}>
                  <span>Please <span style={{ color: "#0d6efd", cursor: 'pointer' }} onClick={() => setSelectedTab(0)}>+Create</span> a College General Info first</span>
                </div>
              </div>
            :
            <div style={{ display: "flex", width: "100%", height: '80vh', justifyContent: "center", alignItems: 'center' }}>
              <Spinner animation="border" role="status" variant="info">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          }
        </Tab>
        <Tab eventKey="3" title="Campus">
          {isApiHitComplete ?
            isDataFound ?
              selectedTab == '3' && <Campus onSuccess={onSuccess}  collegeList={clgList} />
              :
              <div style={{ display: "flex", width: "100%", height: '80vh', justifyContent: "center", alignItems: 'center' }}>
                <div style={{ fontWeight: "500" }}>
                  <span>Please <span style={{ color: "#0d6efd", cursor: 'pointer' }} onClick={() => setSelectedTab(0)}>+Create</span> a College General Info first</span>
                </div>
              </div>
            :
            <div style={{ display: "flex", width: "100%", height: '80vh', justifyContent: "center", alignItems: 'center' }}>
              <Spinner animation="border" role="status" variant="info">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          }
        </Tab>
        <Tab eventKey="4" title="Admission">
          {isApiHitComplete ?
            isDataFound ?
              selectedTab == '4' && <Admission onSuccess={onSuccess} collegeList={clgList} />
              :
              <div style={{ display: "flex", width: "100%", height: '80vh', justifyContent: "center", alignItems: 'center' }}>
                <div style={{ fontWeight: "500" }}>
                  <span>Please <span style={{ color: "#0d6efd", cursor: 'pointer' }} onClick={() => setSelectedTab(0)}>+Create</span> a College General Info first</span>
                </div>
              </div>
            :
            <div style={{ display: "flex", width: "100%", height: '80vh', justifyContent: "center", alignItems: 'center' }}>
              <Spinner animation="border" role="status" variant="info">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          }
        </Tab>
        <Tab eventKey="5" title="ScholarShip">
          {isApiHitComplete ?
            isDataFound ?
              selectedTab == '5' && <Scholorship onSuccess={onSuccess} collegeList={clgList} />
              :
              <div style={{ display: "flex", width: "100%", height: '80vh', justifyContent: "center", alignItems: 'center' }}>
                <div style={{ fontWeight: "500" }}>
                  <span>Please <span style={{ color: "#0d6efd", cursor: 'pointer' }} onClick={() => setSelectedTab(0)}>+Create</span> a College General Info first</span>
                </div>
              </div>
            :
            <div style={{ display: "flex", width: "100%", height: '80vh', justifyContent: "center", alignItems: 'center' }}>
              <Spinner animation="border" role="status" variant="info">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          }
        </Tab>
        <Tab eventKey="6" title="Placement">
          {isApiHitComplete ?
            isDataFound ?
              selectedTab == '6' && <Placement onSuccess={onSuccess} collegeList={clgList} />
              :
              <div style={{ display: "flex", width: "100%", height: '80vh', justifyContent: "center", alignItems: 'center' }}>
                <div style={{ fontWeight: "500" }}>
                  <span>Please <span style={{ color: "#0d6efd", cursor: 'pointer' }} onClick={() => setSelectedTab(0)}>+Create</span> a College General Info first</span>
                </div>
              </div>
            :
            <div style={{ display: "flex", width: "100%", height: '80vh', justifyContent: "center", alignItems: 'center' }}>
              <Spinner animation="border" role="status" variant="info">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          }
        </Tab>
        <Tab eventKey="7" title="Cut Off">
          {isApiHitComplete ?
            isDataFound ?
              selectedTab == '7' && <Cutoff onSuccess={onSuccess} collegeList={clgList} />
              :
              <div style={{ display: "flex", width: "100%", height: '80vh', justifyContent: "center", alignItems: 'center' }}>
                <div style={{ fontWeight: "500" }}>
                  <span>Please <span style={{ color: "#0d6efd", cursor: 'pointer' }} onClick={() => setSelectedTab(0)}>+Create</span> a College General Info first</span>
                </div>
              </div>
            :
            <div style={{ display: "flex", width: "100%", height: '80vh', justifyContent: "center", alignItems: 'center' }}>
              <Spinner animation="border" role="status" variant="info">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          }
        </Tab>
        <Tab eventKey="8" title="College Ranking">
          {isApiHitComplete ?
            isDataFound ?
              selectedTab == '8' && <CollegeRanking onSuccess={onSuccess} collegeList={clgList} />
              :
              <div style={{ display: "flex", width: "100%", height: '80vh', justifyContent: "center", alignItems: 'center' }}>
                <div style={{ fontWeight: "500" }}>
                  <span>Please <span style={{ color: "#0d6efd", cursor: 'pointer' }} onClick={() => setSelectedTab(0)}>+Create</span> a College General Info first</span>
                </div>
              </div>
            :
            <div style={{ display: "flex", width: "100%", height: '80vh', justifyContent: "center", alignItems: 'center' }}>
              <Spinner animation="border" role="status" variant="info">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          }
        </Tab>
      </Tabs>
    </>
  );
};
export default Addcollege;
