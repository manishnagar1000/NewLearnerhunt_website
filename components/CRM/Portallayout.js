import React, { Component, createRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from '@mui/material/Divider';
import IconButton from "@mui/material/IconButton";
import Classes from "/styles/portaldashboard.module.css";
import PersonIcon from '@mui/icons-material/Person';
import Avatar from "@mui/material/Avatar";
import SidebarItem from "./SidebarItem";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import { Spinner } from 'react-bootstrap'
import { Modal, Col, Row, Card } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Image from "next/image";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatDate from "../Comps/FormatDate";
import { Select } from "@mui/material";
import moment from "moment";
import { KeyPressForAlphabets, KeyPressForNumeric } from "../Comps/formValidation";

export default class PortalLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSidebarOpen: true,
      // selectedLi: "",
      // selectedItem: "",
      selectedPage: '',
      anchorEl: null,
      sidebarList: [],
      isLoading: true,
      isLoadingUserDetails: true,
      userDetails: null,
      email: '',
      name: '',
      password: '',
      cpassword: '',
      mobile: '',
      dob: '',
      gender: '',
      verified: '',
      createdAt: '',
      allowDelete: '',
      profilePhoto: '/assets/images/adminportal/user.png',
      showPassword: false,
      cshowPassword: false,
      isModalOpen: false,
      editDetails: false,
    };
    this.fileInputRef = React.createRef();
    this.assignAppName = this.assignAppName.bind(this)
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCloseEditModal = this.handleCloseEditModal.bind(this);
  }

  handleEditClick() {
    this.setState({ editDetails: true });
  }

  handleCloseEditModal() {
    this.setState({ editDetails: false, password: '', cpassword: '' })
  }

  handleCancel() {
    this.setState({
      isModalOpen: false,
      email: '',
      name: '',
      password: '',
      cpassword: '',
      profilePhoto: '/assets/images/adminportal/user.png',
      editDetails: false
    });
  }




  getUserDetails() {
    this.setState({ isLoadingUserDetails: true })
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/my-profile", {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(resp => {
        const { data } = resp
        if (data) {
          const { profilePhoto } = data
          if (profilePhoto) {
            this.setState({ profilePhoto: `https://learnerhunt-assets.s3.us-east-1.amazonaws.com/${profilePhoto}` })
          }
          this.setState({ userDetails: data, name: data.name, email: data.email, mobile: data.mobile, gender: data.gender, dob: data.dob?.split("T")[0], verified: data.verified, allowDelete: data.allowDelete, createdAt: data.createdAt?.split("T")[0], isLoading: false });
        }
      }
      )
      .catch(error => this.setState({ error, isLoadingUserDetails: false }));

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
      } else {
        this.setState({ selectedPage: res.data[0].name })
      }
      this.setState({ sidebarList: res.data, isLoading: false })

    });
  }

  assignAppName(role = localStorage.getItem('crmrole')) {
    if (role == 0) {
      return 'Learnerhunt-Admin'
    } else if (role == 4) {
      return 'Learnerhunt-Support'
    }
    return 'Learnerhunt'
  }

  handleOpenModal() {
    this.getUserDetails()
    this.setState({ isModalOpen: true })
  }
  handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.setState({
        profilePhoto: file
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.name === "") {
      Swal.fire({
        title: "error",
        text: "Please enter name",
        icon: "error",
        confirmButtonText: "Ok",
      }).then(() => {
        this.setState({ isLoading: false });
      });
    }
    else if (this.state.mobile === "") {
      Swal.fire({
        title: "error",
        text: "Please enter your mobile",
        icon: "error",
        confirmButtonText: "Ok",
      }).then(() => {
        this.setState({ isLoading: false });
      });
    } else if (this.state.password === "") {
      Swal.fire({
        title: "error",
        text: "Please enter your password",
        icon: "error",
        confirmButtonText: "Ok",
      }).then(() => {
        this.setState({ isLoading: false });
      });
    } else if (this.state.cpassword === "") {
      Swal.fire({
        title: "error",
        text: "Please enter confirm password",
        icon: "error",
        confirmButtonText: "Ok",
      }).then(() => {
        this.setState({ isLoading: false });
      });
    } else if (this.state.password !== this.state.cpassword) {
      Swal.fire({
        title: "error",
        text: "Password does not match.",
        icon: "error",
        confirmButtonText: "Ok",
      }).then(() => {
        this.setState({ isLoading: false });
      });
    } else {
      try {
        this.setState({ isLoading: true });

        const fd = new FormData();
        fd.append("name", this.state.name);
        fd.append("mobile", this.state.mobile);
        fd.append("email", this.state.email);
        fd.append("profilePhoto", this.state.profilePhoto);
        fd.append("password", this.state.password);
        fd.append("dob", this.state.dob);
        fd.append("gender", this.state.gender);

        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/my-profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pt")}`,
          },
          method: "PUT",
          body: fd,
        })
          .then(async (response) => {
            var res = await response.json();
            if (response.ok) {
              Swal.fire({
                title: "Success",
                text: `${res.message}`,
                icon: "success",
                confirmButtonText: "Ok",
              }).then(() => {
                this.setState({ editDetails: false, isModalOpen: false, isLoading: false, name: '', password: '', cpassword: '' }, () => { localStorage.setItem('admincrmemail', this.state.email) });
              });
            } else {
              Swal.fire({
                title: "error",
                text: `${res.error}`,
                icon: "error",
                confirmButtonText: "Ok",
              });
              this.setState({ isLoading: false });
            }
          });
      } catch (error) {
        console.error(error);
      }
    }
  };


  handleClickUpload = () => {
    this.fileInputRef.current.click();
  };


  async handleDeleteProfile() {
    const confirmationResult = await Swal.fire({
      title: "Are you sure to delete your profile?",
      html: `<div style="color: red;">You won't be able to revert this action!</div>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (confirmationResult.isConfirmed) {
      Swal.fire({
        title: 'Deleting...',
        text: 'Please wait while we delete your profile.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/my-profile", {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pt")}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete profile');
        }

        Swal.fire({
          title: 'Deleted!',
          text: 'Your profile has been deleted.',
          icon: 'success'
        }).then(() => {
          window.location.href = '/adminportal';
        });

      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'There was a problem deleting your profile. Please try again later.',
          icon: 'error'
        });
      }
    }
  }



  render() {

    return (
      <>
        {!this.state.isLoading ?
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
                <MenuItem onClick={this.handleOpenModal}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => this.props.onLogout()}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </React.Fragment>
            {

            }
            <Modal
              size="lg"
              centered
              show={this.state.isModalOpen}
              onHide={() => {
                this.setState({ isModalOpen: false, email: '', password: '', cpassword: '' });
              }}
              onExited={() => {
                this.setState({ editDetails: false });
              }}
              // backdrop="static"
              keyboard={false}
            >

              <div className={`${Classes.modalBackground} rounded-top `}>
                <Modal.Header style={{ border: "none", display: "flex", justifyContent: "space-between" }}>
                  <Modal.Title>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span>
                        {
                          this.state.editDetails ? "Edit Profile" : "Profile"
                        }

                        {
                          !this.state.editDetails && this.state.userDetails?.verified && (
                            <Image
                              alt="profilePic"
                              className="mb-2 mx-2"
                              width={30}
                              height={30}
                              src='/assets/images/adminportal/verefiedBadge.webp'
                            />
                          )
                        }
                      </span>

                      {!this.state.editDetails &&
                        <p className="text-secondary fw-normal  mt-3 ml-2"   ><i>
                          created on : {this.state.userDetails?.createdAt ? moment(this.state.userDetails.createdAt).format('MMMM Do YYYY') : ''}
                        </i>

                        </p>
                      }

                    </div>
                  </Modal.Title>
                  <div>
                    {
                      this.state.userDetails?.allowDelete && (
                        <Tooltip title="Delete Profile">
                          <IconButton>
                            <DeleteIcon onClick={this.handleDeleteProfile} className="text-danger" />
                          </IconButton>
                        </Tooltip>
                      )
                    }
                    {this.state.editDetails ? <Tooltip title="Close"><IconButton> <CloseIcon onClick={this.handleCloseEditModal} style={{ cursor: "pointer" }} /></IconButton></Tooltip>
                      : <Tooltip title="Edit Profile"><IconButton> <EditIcon onClick={this.handleEditClick} className="text-primary" style={{ cursor: "pointer" }} /></IconButton></Tooltip>
                    }
                  </div>
                </Modal.Header>
              </div>
              <Modal.Body className={`rounded-bottom ${Classes.modalBackground}`}>
                <Row >
                  <Col md={4} className="d-flex justify-content-center align-items-center">
                    <div className="mb-4 text-center ">
                      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <div className="position-relative d-inline-block">

                          <img src={this.state.profilePhoto ? this.state.profilePhoto : '/assets/images/adminportal/user.png'} alt="Profile Photo" className="rounded-circle border border-secondary " width={200} height={200} />
                          {/* <span className="position-absolute top-0 right-0 bg-success text-white text-xs rounded-pill px-2" style={{ right: '10px', top: '10px' }}>ONLINE</span> */}
                          {this.state.editDetails ?
                            <div style={{ marginTop: "-30px" }} className="d-flex justify-content-end ">
                              <Tooltip title="Change Photo" ><IconButton> <EditIcon onClick={this.handleClickUpload} style={{ cursor: "pointer" }} /></IconButton></Tooltip>
                            </div>
                            : ""}
                          <input

                            accept="image/*"
                            type="file"
                            ref={this.fileInputRef}
                            style={{ display: 'none' }}
                            onChange={this.handleFileChange}
                          />
                        </div>
                        <h4 className="mt-2">{this.state.userDetails?.name}</h4>
                      </div>

                    </div>
                  </Col>
                  <Col md={8}>
                    <Card className="mb-4 shadow-sm">
                      <Card.Body>
                        {
                          this.state.editDetails ?
                            <Box
                              component="form"
                              // onSubmit={this.handleSubmit}
                              noValidate
                              sx={{ mt: 1 }}
                            >
                              <FormControl
                                sx={{ mt: 2, width: "100%" }}
                                variant="outlined"
                                required
                              >
                                <TextField
                                  autoFocus
                                  id="name"
                                  name="name"
                                  type="text"
                                  fullWidth
                                  variant="outlined"
                                  label="Name"
                                  onKeyDown={KeyPressForAlphabets}
                                  value={this.state.name}
                                  onChange={(e) => this.setState({ name: e.target.value })}
                                  required
                                  className="mb-2"
                                />
                              </FormControl>
                              <TextField
                                id="email"
                                name="email"
                                type="email"
                                disabled
                                fullWidth
                                variant="outlined"
                                label="Email"
                                value={this.state.email}
                                onChange={(e) => this.setState({ email: e.target.value })}
                                required
                                className="mt-3"
                              />
                              <FormControl
                                sx={{ mt: 2, width: "100%" }}
                                variant="outlined"
                                required
                              >
                                <InputLabel htmlFor="outlined-adornment-mobile">Mobile</InputLabel>
                                <OutlinedInput
                                  inputProps={{ maxLength: 10 }}
                                  id="mobile"
                                  name="mobile"
                                  value={this.state.mobile}
                                  onKeyDown={KeyPressForNumeric}
                                  onChange={(e) => this.setState({ mobile: e.target.value })}
                                  type="text"
                                  label="Mobile"
                                />
                              </FormControl>
                              <FormControl
                                sx={{ mt: 2, width: "100%" }}
                                variant="outlined"
                                required
                              >
                                <InputLabel>Gender</InputLabel>
                                <Select
                                  id="gender"
                                  name="gender"
                                  value={this.state.gender}
                                  onChange={(e) => this.setState({ gender: e.target.value })}
                                  label="Gender"
                                >
                                  <MenuItem value="male">Male</MenuItem>
                                  <MenuItem value="female">Female</MenuItem>
                                </Select>
                              </FormControl>

                              <FormControl
                                sx={{ mt: 2, width: "100%" }}
                                variant="outlined"
                                required
                              >
                                <TextField
                                  required
                                  id="dob"
                                  name="dob"
                                  type="date"
                                  label="Date of Birth"
                                  value={this.state.dob}
                                  onChange={(e) => this.setState({ dob: e.target.value })}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  fullWidth
                                />
                              </FormControl>
                              <FormControl
                                sx={{ mt: 2, width: "100%" }}
                                variant="outlined"
                                required
                              >
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                  id="password"
                                  name="password"
                                  value={this.state.password}
                                  onChange={(e) => this.setState({ password: e.target.value })}
                                  type={this.state.showPassword ? "text" : "password"}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => this.setState({ showPassword: !this.state.showPassword })}
                                        edge="end"
                                      >
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                  label="Password"
                                />
                              </FormControl>
                              <FormControl
                                sx={{ mt: 2, width: "100%" }}
                                variant="outlined"
                                required
                              >
                                <InputLabel htmlFor="outlined-adornment-cpassword">Confirm Password</InputLabel>
                                <OutlinedInput
                                  id="cpassword"
                                  value={this.state.cpassword}
                                  name="cpassword"
                                  onChange={(e) => this.setState({ cpassword: e.target.value })}
                                  type={this.state.cshowPassword ? "text" : "password"}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => this.setState({ cshowPassword: !this.state.cshowPassword })}
                                        edge="end"
                                      >
                                        {this.state.cshowPassword ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                  label="Confirm Password"
                                />

                              </FormControl>
                            </Box>
                            :
                            <Col style={{ height: "32vh" }}>
                              <h5 className=" text-center pb-3">Personal Details</h5>
                              <h6>Name : {this.state.userDetails?.name ? this.state.userDetails?.name : "N/A"}</h6>
                              <h6>Email : {this.state.userDetails?.email ? this.state.userDetails?.email : "N/A"}</h6>
                              <h6>Mobile : {this.state.userDetails?.mobile ? this.state.userDetails?.mobile : "N/A"}</h6>
                              <h6>Gender : {this.state.userDetails?.gender ? this.state.userDetails?.gender : "N/A"}</h6>
                              <h6>Date of birth : {moment(this.state.userDetails?.dob).format('MMMM Do YYYY')}</h6>
                            </Col>
                        }
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                {this.state.editDetails &&
                  <Row>
                    <Col >
                      <Button
                        onClick={this.handleCancel}
                        className="bg-danger"
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Cancel
                      </Button>
                    </Col>
                    <Col  >
                      <Button
                        onClick={this.handleSubmit}
                        disabled={this.state.isLoading}
                        className="bg-primary"
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        {this.state.isLoading ? (
                          <>
                            <span>Please Wait...</span>
                            <Spinner animation="border" role="status" size="sm" className="ml-2" />
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </Col>
                  </Row>
                }
              </Modal.Body>
            </Modal >
          </div >
          :
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Spinner animation="border" variant="dark" />
          </div>
        }
      </>
    );
  }
}

