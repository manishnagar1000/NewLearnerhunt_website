import React, { Component } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from '@mui/material/Divider';
import IconButton from "@mui/material/IconButton";
import Classes from  "/styles/portaldashboard.module.css";
import PersonIcon from '@mui/icons-material/Person';
import Avatar from "@mui/material/Avatar";
import SidebarItem from "./SidebarItem";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import {Spinner} from 'react-bootstrap'

// import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
// import SsidChartIcon from '@mui/icons-material/SsidChart';
// import TimelineIcon from '@mui/icons-material/Timeline';
// import InsightsIcon from '@mui/icons-material/Insights';
// import AddRoadIcon from '@mui/icons-material/AddRoad';
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
// const sidebarList = [
//   {
//     name: "Dashboard",
//     icon: 'Home',
//     path: "/adminportal/dashboard",
//   },
//   {
//     name: "Colleges",
//     icon: 'Group',
//     children: [
//       {
//         name: "Add College",
//         icon: 'PersonAdd',
//         path: "/adminportal/addcollege",
//       },
//       {
//         name: "All Colleges",
//         icon: 'Contacts',
//         path: "/adminportal/allcollege",
//       },
      
//     ],
//   },
 
  
//   // {
//   //   name: "ApiIntegration",
//   //   icon: <ApiIcon/>,
//   //   path: "/adminportal/api",
//   // },
// {
//   name: "ApiIntegration",
//   icon: 'Api',
//   children: [
//     {
//       name: "Imarticus",
//       icon: 'Timeline',
//       path: "/adminportal/imarticus",
//     },
//     {
//       name: "Others",
//       icon: 'SsidChart',
//       path: "/adminportal/api",
//     }
//   ]
// },
//   {
//     name: "Leads",
//     icon: 'Leaderboard',
//     children: [
//       {
//         name: "Test Eligibility",
//         icon: 'Timeline',
//         path: "/adminportal/testeligibility",
//       },
//       {
//         name: "Applied Colleges",
//         icon: 'SsidChart',
//         path: "/adminportal/appliedcollege",
//       },
//       {
//         name: "Student's Registered",
//         icon: 'Insights',
//         path: "/adminportal/studentregister",
//       },
//       {
//         name: "Ad Leads",
//         icon: 'AddRoad',
//         path: "/adminportal/adleads",
//       },
//       {
//         name: "PopUp Leads",
//         icon: 'SsidChart',
//         path: "/adminportal/popupregister",
//       },
//       {
//         name: "Colleges Admin",
//         icon: 'SupervisorAccount',
//         path: "/adminportal/collegeadmins",
//       }
      
//     ],
//   },
//   {
//     name: "Trash",
//     icon: 'DeleteForever',
//     children:[{
//       name: "Colleges",
//       icon: 'Apartment',
//     path: "/adminportal/trashcolleges",
//     }
//     ],
//   },
//   // {
//   //   name: "Import Export",
//   //   icon: <HomeIcon />,
//   //   path: "/adminportal/importexport",
//   // },
// ];
export default class PortalLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarOpen: true,
      // selectedLi: "",
      // selectedItem: "",
      selectedPage: '',
      anchorEl: null,
      sidebarList:[],
      isLoading:true
    };

    this.assignAppName = this.assignAppName.bind(this)
  }

  componentDidMount() {
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/get-sidebar", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
    }).then(async (response) => {
      var res = await response.json();
      // console.log(res)
      if (sessionStorage.getItem("selectedPage")) {
        this.setState({ selectedPage: sessionStorage.getItem("selectedPage") });
      }else{
        this.setState({ selectedPage: res.data[0].name})
      }
      this.setState({sidebarList:res.data,isLoading:false})

    });
  }

  assignAppName(role=localStorage.getItem('crmrole')){
    if(role==0){
      return 'Learnerhunt-Admin'
    }else if(role==4){
      return 'Learnerhunt-Support'
    }
    return 'Learnerhunt'
  }
  

  render() {
    return (
      <>
      {!this.state.isLoading?
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
            <span className={Classes["project-name"]}>{this.assignAppName()}</span>
            {/* <span className="project-name">Asset Management System</span> */}
            <div className={Classes["page-desc"]}>
              {/* <Tooltip title="Go Back">
                <IconButton onClick={() => window.history.back(-1)}>
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip> */}
              <span className={Classes.heading}>{this.state.selectedPage}</span>
            </div>
          </div>
          <div className={Classes["right-div"]}>
            <Tooltip title="Profile">
              <IconButton
                onClick={(e) => this.setState({ anchorEl: e.currentTarget })}
                size="small"
                sx={{ ml: 2 }}
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
          <div className={`${Classes.sidebar} ${this.state.isSidebarOpen ? "" : Classes.hide} `}>
            <div className={Classes["list-div"]}>
              {this.state.sidebarList.map((item, index) => (
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
            className={`${Classes["content-div"]} ${this.state.isSidebarOpen ? "" : Classes.full}`}
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
            <MenuItem>
            <ListItemIcon>
              <PersonIcon fontSize="small"/>
              </ListItemIcon>
              {localStorage.getItem('admincrmemail')}
            </MenuItem>
            <Divider />
            {/* <MenuItem>
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
            <MenuItem onClick={()=>this.props.onLogout()}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </React.Fragment>
      </div>
      :
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Spinner animation="border" variant="dark" />
  </div>
      }
      </>
    );
  }
}
