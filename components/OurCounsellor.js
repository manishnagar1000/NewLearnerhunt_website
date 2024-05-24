import React,{useState,useEffect} from 'react'
import Classes from "/styles/colleges.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DuoIcon from "@mui/icons-material/Duo";
import CallIcon from "@mui/icons-material/Call";
import LoginForm from "@/components/Loginuc-new";
import Swal from "sweetalert2";
import Loading from "@/components/Comps/Loading";

export default function OurCounsellor(Counsellor){
  const [userStatus, setUserStatus] = useState(false);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [videoCall, setVideoCall] = useState(false);
  const [useremail, setUseremail] = useState("");
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    const newstatus = localStorage.getItem("userid");
    // console.log(newstatus);
    if (newstatus) {
      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/check-status", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userid")}`,
        },
      }).then(async (response) => {
        var res = await response.json();
        // console.log(res)
        if (res.status) {
          setUserStatus(newstatus);
          setUseremail(localStorage.getItem("useremail"));
        } else {
          localStorage.removeItem("userid");
          localStorage.removeItem("status");
          localStorage.removeItem("useremail");
        }
      });
    } else {
      localStorage.removeItem("userid");
      localStorage.removeItem("status");
      localStorage.removeItem("useremail");
    }
  }, [userStatus]);

  const handlelogin = (e) => {
    setIsLoginFormOpen(true);
  };
    // console.log(Counsellor)
    const handleStudentCall = (e, counsellorInfo) => {
        e.preventDefault();
        // console.log(counsellorInfo)
    
        try {
          setIsloading(true);
    
          const fd = new FormData();
          fd.append("agentNum", counsellorInfo.mobile); // agent number cousellor number
          fd.append("customerNum", localStorage.getItem("usermobile")); // student number
          fd.append("slug", ''); // college slug
          fd.append("counsEmail", counsellorInfo.email); // cousellor email
          fd.append("studEmail", localStorage.getItem("useremail")); //student email
    
          // console.log(fd)
    
          //   setTimeout(() => {
          // setIsloading(false);
          //   }, 2000);
    
          fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/student/makephonecall", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userid")}`,
            },
            method: "POST",
            body: fd,
          }).then(async (response) => {
            var res = await response.json();
            // console.log(res.data);
            if (res.error) {
              Swal.fire({
                title: "error",
                text: `${res.error}`,
                icon: "error",
                confirmButtonText: "Ok",
              });
            } else {
              Swal.fire({
                title: "success",
                text: `${res.data.success.message}`,
                icon: "success",
                confirmButtonText: "Ok",
              });
            }
            setIsloading(false);
          });
        } catch (error) {
          console.error("Failed to fetch OTP:", error);
        }
      };
    const LearnerhuntCounsellor =Counsellor.data
    // console.log(LearnerhuntCounsellor)
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
          // partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
          slidestoSlide: 4,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          // partialVisibilityGutter: 50, // this is needed to tell the amount of px that should be visible.
          slidestoSlide: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          // partialVisibilityGutter: 80, // this is needed to tell the amount of px that should be visible.
          slidestoSlide: 1,
        },
      };
  return (
    <div>
            <div className='container'>
                    <h2>Meet Our Counsellors</h2>
                    <div>
                      <Carousel
                        responsive={responsive}
                        showDots={true}
                        partialVisbile={false}
                        itemAriaLabel="counsellor"
                      >
                        {LearnerhuntCounsellor&&LearnerhuntCounsellor.counsellors.length > 0
                          ? LearnerhuntCounsellor&&LearnerhuntCounsellor.counsellors.map((s) => (
                              <div
                                key={s._id}
                                className={Classes["Counsellor-box"]}
                              >
                                <div className={Classes["img-div-counsellor"]}>
                                  <img
                                    src={
                                      "/assets/images/counsellorFolder/counsellor-profile.png"
                                    }
                                    alt={s.name}
                                  />
                                </div>
                                <h4 style={{ marginTop: "10px" }}>
                                  {s.name.charAt(0).toUpperCase() +
                                    s.name.slice(1)}
                                </h4>
                                <p>
                                  {" "}
                                  <strong>Specializaion:</strong>{" "}
                                  {s.specialization}
                                </p>
                                <p>
                                  <strong>Location:</strong> {s.state},{s.city}
                                </p>

                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    margin: "0.5rem 0",
                                  }}
                                >
                                  {userStatus ? ( // Check if userStatus is truthy
                                    videoCall ? ( // Check if videoCall is truthy
                                      // If both userStatus and videoCall are truthy, render the video call modal
                                      <Modal
                                        fullscreen
                                        show={true}
                                        centered
                                        onHide={() => setVideoCall(false)}
                                      >
                                        <Modal.Body>
                                          <div
                                            style={{
                                              display: "flex",
                                              width: "100%",
                                              height: "100%",
                                            }}
                                          >
                                            <AgoraUIKit
                                              rtcProps={rtcProps}
                                              rtmProps={rtmProps}
                                              callbacks={{
                                                EndCall: handleCallEnd,
                                              }}
                                            />
                                          </div>
                                        </Modal.Body>
                                      </Modal>
                                    ) : s.counsellorJoined &&
                                      !s.counsellorDisconnected ? (
                                      <button
                                        style={{
                                          padding: "0.4rem 1rem",
                                          backgroundColor: "red",
                                          color: "#fff",
                                          border: "none",
                                          borderRadius: "25px",
                                          cursor: "no-drop",
                                        }}
                                      >
                                        <DuoIcon fontSize="small" /> Busy
                                      </button>
                                    ) : (
                                      <>
                                        <button
                                          //  onClick={handlelogin}
                                          onClick={(e) =>
                                            handleStudentCall(e, s)
                                          }
                                          style={{
                                            padding: "0.4rem 1rem",
                                            backgroundColor: "#007bff",
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: "25px",
                                            cursor: "pointer",
                                          }}
                                        >
                                          <CallIcon fontSize="small" /> Call
                                        </button>
                                      </>
                                    )
                                  ) : (
                                    <>
                                      <button
                                        onClick={handlelogin}
                                        style={{
                                          padding: "0.4rem 1rem",
                                          backgroundColor: "#007bff",
                                          color: "#fff",
                                          border: "none",
                                          borderRadius: "25px",
                                          cursor: "pointer",
                                        }}
                                      >
                                        <CallIcon fontSize="small" /> Call
                                      </button>
                                    </>
                                  )}

                                </div>
                              </div>
                            ))
                          : <p style={{margin:'2rem 0',textIndent:'50px',textAlign:'center',letterSpacing:'3px'}}>No Counsellor Available</p>}
                      </Carousel>
                    </div>
                    {isLoginFormOpen && (
          <LoginForm
            isOpen={isLoginFormOpen}
            onClose={() => setIsLoginFormOpen(false)}
            role="3"
          />
          
        )}
        <Loading show={isloading} onHide={() => setIsloading(false)} />

                  </div>
    </div>
  )
}
