import React, { Component, createRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Classes from "/styles/portaldashboard.module.css";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import Avatar from "@mui/material/Avatar";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SidebarItem from "./SidebarItem";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { deepOrange } from "@mui/material/colors";
import { Container, Row, Col, Modal, Form, Button } from "react-bootstrap";
import DuoIcon from "@mui/icons-material/Duo";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import dynamic from "next/dynamic";
const AgoraUIKit = dynamic(() => import("agora-react-uikit"), { ssr: false });
// import CallingSound from "@/assets/audio/callingAudio.mp3";

const agoraAppid = process.env.NEXT_PUBLIC_AGORA_APP_ID,
  agoraTokenurl = process.env.NEXT_PUBLIC_AGORA_TOKEN_URL;

const sidebarList = [
  {
    name: "My Profile",
    icon: <AccountBoxIcon />,
    path: "/tutorportal/my-profile",
  }
  
];
export default class PortalLayout extends Component {
  constructor(props) {
    super(props);
    this.audioRef = createRef();
    this.state = {
      isPlaying: false,
      isSidebarOpen: true,
      // selectedLi: "",
      // selectedItem: "",
      selectedPage: "",
      anchorEl: null,
      anchorE2: null,
      notifications: [],
      error: "",
      isloading: false,
      videoCall: false,
      callingModal: false,
      rtcProps: {
        appId: agoraAppid,
        channel: "",
        tokenUrl: agoraTokenurl,
        uid: "",
        enableScreensharing: true,
      },
      rtmProps: {
        username: "",
        displayUsername: true,
        tokenUrl: agoraTokenurl,
        callActive: true,
        enableVideo: true,
        enableAudio: true,
      },
    };
  }


  componentDidMount() {
    if (sessionStorage.getItem("selectedPage")) {
      this.setState({ selectedPage: sessionStorage.getItem("selectedPage") });
    } else {
      this.setState({ selectedPage: sidebarList[0].name });
    }
  }
  render() {
    return (
      <>
        <div className={Classes.dashboard}>
          <div className={Classes.navbar}>
            <div className={Classes["left-div"]}>
              {/* <button onClick={this.togglePlay}>
                {this.state.isPlaying ? "Pause" : "Play"}
              </button> */}
              <IconButton
                onClick={() =>
                  this.setState({ isSidebarOpen: !this.state.isSidebarOpen })
                }
              >
                <MenuIcon />
              </IconButton>
              <span className={Classes["project-name"]}>Learnerhunt Tutor</span>
              {/* <span className="project-name">Asset Management System</span> */}
              <div className={Classes["page-desc"]}>
                {/* <Tooltip title="Go Back">
                <IconButton onClick={() => window.history.back(-1)}>
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip> */}
                <span className={Classes.heading}>
                  {this.state.selectedPage}
                </span>
              </div>
            </div>
            <div className={Classes["right-div"]}>
          
              <Tooltip title="Profile">
                <IconButton
                  onClick={(e) => this.setState({ anchorEl: e.currentTarget })}
                  size="small"
                  aria-controls={
                    Boolean(this.state.anchorEl) ? "account-menu" : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={
                    Boolean(this.state.anchorEl) ? "true" : undefined
                  }
                >
                  <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <div className={Classes["bottom-section"]}>
            <div
              className={`${Classes.sidebar} ${
                this.state.isSidebarOpen ? "" : Classes.hide
              } `}
            >
              <div className={Classes["list-div"]}>
                {sidebarList.map((item, index) => (
                  <SidebarItem
                    key={index}
                    item={item}
                    setSelectedItem={(page) =>
                      this.setState({ selectedPage: page })
                    }
                    selected={this.state.selectedPage}
                  />
                ))}
              </div>
            </div>
            <div
              className={`${Classes["content-div"]} ${
                this.state.isSidebarOpen ? "" : Classes.full
              }`}
            >
              {this.props.children}
            </div>
          </div>

          <React.Fragment>
            <Menu
              anchorEl={this.state.anchorEl}
              id="account-menu"
              open={Boolean(this.state.anchorEl)}
              onClose={() => this.setState({ anchorEl: null })}
              onClick={() => this.setState({ anchorEl: null })}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {/* <MenuItem>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem> */}
              <MenuItem onClick={() => this.props.onLogout()}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>

            {/* notification for counsellor */}
            <Menu
              anchorEl={this.state.anchorE2}
              id="account-menu"
              open={Boolean(this.state.anchorE2)}
              onClose={() => this.setState({ anchorE2: null })}
              onClick={() => this.setState({ anchorE2: null })}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {/* <MenuItem> */}

              {this.state.notifications.length > 0 ? (
                <>
                  {/* <div>
            {this.state.notifications.map((notification, index) => 
            (
              <div key={index}>
                <ListItemIcon>
           <CircleNotificationsIcon fontSize="small" /> {notification.channel}
         </ListItemIcon>  
              </div>
            )
            )}
          </div> */}

                  <List
                    sx={{
                      width: "100%",
                      maxHeight: "80vh",
                      overflowY: "auto",
                      bgcolor: "background.paper",
                    }}
                  >
                    <ListItem
                      sx={{
                        fontSize: "larger",
                        fontWeight: "500",
                        marginBottom: "0.1rem",
                      }}
                    >
                      Notifications...
                    </ListItem>
                    {this.state.notifications.map((notification, i) => {
                      return (
                        <>
                          <ListItem
                            sx={{
                              background: "#f8f8f8",
                              borderRadius: "0.2rem",
                              marginBottom: "0.1rem",
                            }}
                          >
                            <Avatar sx={{ bgcolor: deepOrange[500] }}>
                              {notification.college_name.charAt(0)}
                            </Avatar>
                            {/* <Avatar src="/broken-image.jpg" /> */}
                            <ListItemText
                              primary={notification.college_name}
                              style={{ margin: "0rem 1rem" }}
                            />
                            {this.handlenotifyAction(notification)}
                            {/* {notification.studentDisconnected ? (
                            <span style={{ color: "red" }}>Expired</span>
                          ) : (
                            <Button
                              style={{ cursor: "pointer" }}
                              onClick={(e) => this.handleJoin(e, notification)}
                            >
                            
                              {!notification.studentDisconnected && notification.counsellorDisconnected?'Rejoin':'Joined'}
                            </Button>
                          )} */}
                          </ListItem>
                        </>
                      );
                    })}
                  </List>
                </>
              ) : (
                // If there are no notifications, display a message
                <div>No new notifications</div>
              )}
              {/* </MenuItem> */}
            </Menu>
          </React.Fragment>

          {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0.5rem 0",
          }}
        > */}

          {/* </div> */}
        </div>
        {this.state.videoCall && (
          <Modal
            fullscreen
            show={true}
            centered
            onHide={() => this.setState({ videoCall: false })}
          >
            <Modal.Body>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100vh",
                }}
              >
                <AgoraUIKit
                  rtcProps={this.state.rtcProps}
                  rtmProps={this.state.rtmProps}
                  callbacks={{
                    EndCall: this.handleCallEnd,
                  }}
                />
              </div>
            </Modal.Body>
          </Modal>
        )}

        {/* <Modal
          keyboard={false}
          backdrop="static"
          size="sm"
          show={this.state.callingModal}
          onHide={() => this.setState({ callingModal: false })}
        >
          <Modal.Body>
            <div className="d-flex align-items-center justify-content-center">
              <img
                src="/assets/images/video.gif"
                alt="gif"
                width={50}
                height={50}
              />
              <span style={{ fontSize: "20px", fontWeight: "500" }}>
                Incoming Video Call...
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                margin: "1rem",
              }}
            >
              <Button variant="success">Accept</Button>
              <Button
                variant="danger"
                onClick={() =>
                  this.setState({ callingModal: false, isPlaying: false })
                }
              >
                Reject
              </Button>
            </div>
          </Modal.Body>
        </Modal> */}
        {/* {this.state.isPlaying && */}
        {/* <audio autoPlay>
       <source src="/assets/audio/callingAudio.mp3" type="audio/mp3" />
       Your browser does not support the audio element.
     </audio> */}
        {/* } */}
        {/* <audio ref={this.audioRef} src="/assets/audio/callingAudio.mp3" /> */}
      </>
    );
  }
}
