import React, { Component } from "react";
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
import dynamic from "next/dynamic";
const AgoraUIKit = dynamic(() => import("agora-react-uikit"), { ssr: false });
const sidebarList = [
  {
    name: "My Profile",
    icon: <AccountBoxIcon />,
    path: "/counsellorportal/my-profile",
  },
  {
    name: "Calling History",
    icon: <DuoIcon />,
    path: "/counsellorportal/call-history",
  },
];
export default class PortalLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarOpen: true,
      // selectedLi: "",
      // selectedItem: "",
      selectedPage: sidebarList[0].name,
      anchorEl: null,
      anchorE2: null,
      notifications: [],
      error: "",
      isloading: false,
      videoCall: false,
      rtcProps: {
        appId: "a0ac742ba6f24cf88219cb67e7f1f342",
        channel: "",
        tokenUrl: "https://learnerhunt-backend.onrender.com",
        uid: "",
        enableScreensharing: true,
      },
      rtmProps: {
        username: "",
        displayUsername: true,
        tokenUrl: "https://learnerhunt-backend.onrender.com",
        callActive: true,
        enableVideo: true,
        enableAudio: true,
      },
    };
  }

  NotificationApi = () => {
    this.setState({ isloading: true });
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/counsellor/notifications", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("cst")}`,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          var res = await response.json();
          // console.log(res.data);
          this.setState({ notifications: res.data });
        } else {
          var res = await response.json();
          // setError(res.error);
          this.setState({ error: res.error });
        }
        this.setState({ isloading: false });
      })
      .catch((error) => {
        alert(error);
      });
  };

  // componentDidMount() {
  //   if (sessionStorage.getItem("selectedPage")) {
  //     this.setState({ selectedPage: sessionStorage.getItem("selectedPage") });
  //   }
  //   // console.log(this.props)
  // }
  componentDidMount() {
    this.NotificationApi();
    this.interval = setInterval(this.NotificationApi, 30000);
  }
  componentWillUnmount() {
    // Clear interval when component unmounts
    clearInterval(this.interval);
  }

  handleJoin(e, notification) {
    e.preventDefault();

    const cid = Math.floor(Math.random() * 900) + 100;
    this.setState((prevState) => ({
      rtcProps: {
        ...prevState.rtcProps,
        channel: notification.channel,
        uid: cid,
      },
      rtmProps: {
        ...prevState.rtmProps,
        username: notification.counsellorEmail,
      },
      callingSession: {
        ...prevState.callingSession,
        notificationId: notification._id,
      },
    }));

    // console.log(counsellor)
    try {
      const fd = new FormData();
      fd.append("notificationId", notification._id);
      fd.append("cid", cid);

      fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "/counsellor/notifications",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("cst")}`,
          },
          method: "PUT",
          body: fd,
        }
      ).then(async (response) => {
        var res = await response.json();
        // console.log(res);
        // console.log(res.error)
        if (res.error) {
          Swal.fire({
            title: "error",
            text: `${res.error}`,
            icon: "error",
            confirmButtonText: "Ok",
          });
        } else {
          // console.log("modal open");
          this.setState({ videoCall: true });
          // setVideoCall(false)
        }
      });
    } catch (error) {
      console.error("Failed to fetch OTP:", error);
    }
    // console.log(counsellor_id)
  }

  handleCallEnd = () => {
    try {
      const fd = new FormData();
      fd.append("notificationId", this.state.callingSession.notificationId);
      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/counsellor/video-call", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("cst")}`,
        },
        method: "PUT",
        body: fd,
      }).then(async (response) => {
        var res = await response.json();
        // console.log(res);
        if (res.error) {
          Swal.fire({
            title: "error",
            text: `${res.error}`,
            icon: "error",
            confirmButtonText: "Ok",
          });
        } else {
          this.setState({ videoCall: false });
        }
      });
    } catch (error) {
      console.error("Failed to fetch OTP:", error);
    }
  };

  handlenotifyAction = (notification) => {
    const { studentDisconnected, counsellorDisconnected, counsellorJoined } =
      notification;
    if (counsellorDisconnected && studentDisconnected) {
      return <span style={{ color: "red" }}>Expired</span>;
    }
    if (counsellorDisconnected && !studentDisconnected && counsellorJoined) {
      return (
        <Button
          style={{ cursor: "pointer" }}
          onClick={(e) => this.handleJoin(e, notification)}
        >
          Rejoin
        </Button>
      );
    }

    if (!counsellorDisconnected && !studentDisconnected && counsellorJoined) {
      return <span style={{ color: "blue" }}>In-Meeting</span>;
    }

    if (!counsellorDisconnected && !studentDisconnected && !counsellorJoined) {
      return (
        <Button
          style={{ cursor: "pointer" }}
          onClick={(e) => this.handleJoin(e, notification)}
        >
          Join
        </Button>
      );
    }

    
  };

  render() {
    return (
      <>
        <div className={Classes.dashboard}>
          <div className={Classes.navbar}>
            <div className={Classes["left-div"]}>
              <IconButton
                onClick={() =>
                  this.setState({ isSidebarOpen: !this.state.isSidebarOpen })
                }
              >
                <MenuIcon />
              </IconButton>
              <span className={Classes["project-name"]}>Learnerhunt</span>
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
              <Tooltip title="Notification">
                <IconButton
                  onClick={(e) => this.setState({ anchorE2: e.currentTarget })}
                  size="small"
                  aria-controls={
                    Boolean(this.state.anchorE2) ? "account-menu" : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={
                    Boolean(this.state.anchorE2) ? "true" : undefined
                  }
                >
                  <CircleNotificationsIcon
                    sx={{ width: 36, height: 36 }}
                  ></CircleNotificationsIcon>
                </IconButton>
              </Tooltip>
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
                      height: "80vh",
                      maxHeight: "40vh",
                      bgcolor: "background.paper",
                    }}
                  >
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
                              {notification.channel.charAt(0)}
                            </Avatar>
                            {/* <Avatar src="/broken-image.jpg" /> */}
                            <ListItemText
                              primary={notification.channel}
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
      </>
    );
  }
}
