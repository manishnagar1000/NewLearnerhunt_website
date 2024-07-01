import React, { useEffect, useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormLabel from "react-bootstrap/FormLabel";
import Button from "react-bootstrap/Button";
import Loading from "../Comps/Loading";
import JoditEditor from "jodit-react";
import Classes from "/styles/crmblog.module.css";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Swal from "sweetalert2";
import { FormControl, Spinner } from "react-bootstrap";
import Tablenav from "../Comps/Tablenav";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

var oldData = [];

export default function CreateBlog() {
  const editor = useRef(null);
  const [categories, setCategories] = useState([]);
  const [blogApi, setBlogApi] = useState([]);
const [blogid,setBlogId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isApiHitComplete, setIsApiHitComplete] = useState(false);
  const [isDataFound, setIsDataFound] = useState(false);
  const [TotalCountNumber, setTotalCountNumber] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: [],
  });

  
  const blogListApi = () => {
    setIsApiHitComplete(false);
    setIsDataFound(false);
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/blog", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
    })
      .then(async (response) => {
        var res = await response.json();
        // console.log(res.data);
        if (res.data.length > 0) {
          setIsDataFound(true);
          setBlogApi(res.data);
        }
        setTotalCountNumber(res.data.length);
        setIsApiHitComplete(true);
        oldData = res.data;
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const getCategoryList = () => {
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/blog-category`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
    })
      .then(async (res) => {
        // console.log(res);
        let response = await res.json();
        // console.log(response);
        if (response.data) {
          if (response.data.length > 0) {
            setCategories(response.data);
          }
        } else {
          Swal.fire({
            title: "error",
            html: `${response.error}`,
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      })
      .catch((error) => {});
  };

  const formatTimestamp=(timestamp)=> {
    const dateObject = new Date(timestamp);

    const formattedTime = dateObject.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const formattedDate = dateObject.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return `${formattedTime}, ${formattedDate}`;
  }

  useEffect(() => {
    getCategoryList();
    blogListApi();
  }, []);

  const fieldChanged = (event) => {
    // console.log(event);
    setPost({ ...post, [event.target.name]: event.target.value });
  };
  const contentFieldChanaged = (data) => {
    setPost({ ...post, content: data });
  };
  const handleFileChange = (event) => {
    // console.log(event.target.files[0]);
    setImage(event.target.files[0]);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    } else {
      setPreview(null);
    }
  };
  const createPost = (event) => {
    event.preventDefault();

    // console.log(post);
    if (post.categoryId.length <= 0) {
      Swal.fire("Select some category !!");
      return;
    }

    if (post.title.trim() === "") {
      Swal.fire("Post title is required !!");
      return;
    }

    if (post.content.trim() === "") {
      Swal.fire("Post content is required !!");
      return;
    }

    if(blogid ==  ""){
    setIsLoading(true);
    const fd = new FormData();
    const cid = categories
      .filter((s) => post.categoryId.includes(s.name))
      .map((s) => s._id);
    // console.log(cid);
    fd.append("categories", JSON.stringify(cid));
    fd.append("content", post.content);
    fd.append("title", post.title);
    if(image){
      fd.append("banner_image", image);
      }
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/blog`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
      method: "POST",
      body: fd,
    }).then(async (response) => {
      var res = await response.json();
      // console.log(res);
      if (response.ok) {
        Swal.fire({
          title: "Success",
          text: `${res.message}`,
          icon: "success",
          confirmButtonText: "Ok",
        }).then((s)=>{
          setShowModal(false);
          blogListApi();
          setBlogId('')
          setPost({
        title:'', content:'',
          categoryId:[]
        })
          setPreview('')
          setImage('')

        });
      } else {
        Swal.fire({
          title: "error",
          text: `${res.error}`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          setIsLoading(false);

        });
      }
      setIsLoading(false);
    });
  }else{
    setIsLoading(true);
    const fd = new FormData();
    const cid = categories
      .filter((s) => post.categoryId.includes(s.name))
      .map((s) => s._id);
    // console.log(cid);
    fd.append("postId",blogid)
    fd.append("categories", JSON.stringify(cid));
    fd.append("content", post.content);
    fd.append("title", post.title);
    if(image){
    fd.append("banner_image", image);
    }
    // fd.append("banner_image", image);
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/blog`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
      method: "PUT",
      body: fd,
    }).then(async (response) => {
      var res = await response.json();
      // console.log(res);
      if (response.ok) {
        Swal.fire({
          title: "Success",
          text: `${res.message}`,
          icon: "success",
          confirmButtonText: "Ok",
        }).then((s)=>{
          setShowModal(false);
          blogListApi();
          setBlogId('')
          setPost({
            title:'', content:'',
              categoryId:[]
            })
            setPreview('')
            setImage('')
        });
      } else {
        Swal.fire({
          title: "error",
          text: `${res.error}`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          setIsLoading(false);
        });
      }
      setIsLoading(false);
    });
  }
  };
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    const searchTerm = e.target.value
      .trim()
      .replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const searchKeyword = new RegExp(`\\b${searchTerm}\\w*\\b`, "i");

    if (e.target.value === "") {
      setBlogApi(oldData);
      setIsDataFound(oldData.length > 0);
    } else {
      const filteredData = oldData.filter((data) =>
        searchKeyword.test(data.title.toLowerCase())
      );

      setBlogApi(filteredData);
      setIsDataFound(filteredData.length > 0);
    }
  };

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => {
    setShowModal(false);
    setBlogId('')
    setPost({
      ...post,title:'', content:'',
      categoryId:[]
  })
  setPreview('')
  setImage('')
  };
  const handleDelete = (e, id) => {
    Swal.fire({
      title: "Are you sure you want to delete this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/blog/" + id,
          {
            method: "Delete",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pt")}`,
            },
            // body: formData,
          }
        )
          .then(async (response) => {
            // console.log(response)
            if (response.ok) {
              var res = await response.json();
              Swal.fire({
                title: "Success",
                text: `${res.message}`,
                icon: "success",
                confirmButtonText: "Ok",
              }).then((e) => {
                blogListApi();
              });
            } else {
              var res = await response.json();
              Swal.fire({
                title: "error",
                text: `${res.error}`,
                icon: "error",
                confirmButtonText: "Ok",
              });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  };
  const handleEdit = (e, id) => {
    setBlogId(id);
    setIsLoading(true);
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/blog/" + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
    })
      .then(async (response) => {
        var res = await response.json();
        // console.log(res.data);
        setShowModal(true);
        setIsLoading(false);
        
        const editcid = categories
      .filter((s) => res.data.categories.includes(s._id))
      .map((s) => s.name);
        setPost({
            ...post,title:res.data.title, content: res.data.content,
            categoryId:editcid
        })
        // setImage(res.data.banner_image)
        setPreview(`https://learnerhunt-assets.s3.us-east-1.amazonaws.com/${res.data.banner_image}`)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={Classes.wrapper}>
      <Tablenav
        TotalCount={{
          Total: (
            <h5>
              Total Count :{TotalCountNumber == "" ? "0" : TotalCountNumber}
            </h5>
          ),
        }}
        Actions={{
          Actions: (
            <>
              <div className="d-flex justify-between align-center">
                <input
                  type="text"
                  className="form-control"
                  value={searchInput}
                  placeholder="Search..."
                  onChange={handleSearchChange}
                />
                <Button variant="primary" onClick={handleModalShow}>
                  +
                </Button>
              </div>
            </>
          ),
        }}
      />
      {isApiHitComplete ? (
        isDataFound ? (
          <table className={`table table-hover custom-table`}>
            <thead style={{ top: `8vh` }}>
              <tr>
                <th style={{ background: "var(--primary)" }}>Author Name</th>
                <th style={{ background: "var(--primary)" }}>Title</th>
                <th style={{ background: "var(--primary)" }}>Updated By</th>
                <th style={{ background: "var(--primary)" }}>Updated At</th>
                <th style={{ background: "var(--primary)" }}>Created At</th>
                <th style={{ background: "var(--primary)" }}>Remove</th>
                <th style={{ background: "var(--primary)" }}>Edit</th>
              </tr>
            </thead>
            <tbody>
              {blogApi.map((clg, i) => {
                return (
                  <tr key={i}>
                    <td style={{ wordWrap: "break-word", whiteSpace: "unset" }}>
                      {clg.author_name}
                    </td>
                    <td style={{ wordWrap: "break-word", whiteSpace: "unset" }}>
                      {clg.title}
                    </td>
                    <td style={{ wordWrap: "break-word", whiteSpace: "unset" }}>
                      {clg.updated_by}
                    </td>
                    <td style={{ wordWrap: "break-word", whiteSpace: "unset" }}>
                      {formatTimestamp(clg.updatedAt)}
                    </td>
                    <td style={{ wordWrap: "break-word", whiteSpace: "unset" }}>
                      {formatTimestamp(clg.createdAt)}
                    </td>
                    <td
                      style={{ wordWrap: "break-word", whiteSpace: "unset" }}
                      onClick={(e) => handleDelete(e, clg._id)}
                    >
                      <DeleteForeverIcon />
                    </td>
                    <td
                      style={{ wordWrap: "break-word", whiteSpace: "unset" }}
                      onClick={(e) => handleEdit(e, clg._id)}
                    >
                      <EditIcon />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "80vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ fontWeight: "500" }}>
              <span style={{ color: "#0d6efd", cursor: "pointer" }}>
                {" "}
                No Records{" "}
              </span>
            </div>
          </div>
        )
      ) : (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "80vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner animation="border" role="status" variant="info">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      <Modal
        show={showModal}
        onHide={handleModalClose}
        size="xl"
        centered
        backdrop="static"
        keyboard={false}
        animation="true"
      >
        <Modal.Header closeButton>
          <Modal.Title> {blogid == "" ? "Add Blog Data" : "Edit Blog Data"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="shadow-sm border-0 mt-2">
            <Card.Body>
              <Form onSubmit={createPost}>
                <div className="my-3">
                  <FormLabel style={{fontWeight:'500'}} htmlFor="category">Post Category</FormLabel>
                  <Select
                    sx={{ mt: 1 }}
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    fullWidth
                    name="categoryId"
                    multiple
                    value={post.categoryId}
                    onChange={fieldChanged}
                    input={
                      <OutlinedInput
                        id="select-multiple-chip"
                        label="Chip"
                        name="categoryId"
                      />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {categories.map((s) => (
                      <MenuItem key={s._id} value={s.name}>
                        {s.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="mt-3">
                  <FormLabel style={{fontWeight:'500'}} htmlFor="image">Select Post banner</FormLabel>
                  <FormControl
                    id="image"
                    type="file"
                    onChange={handleFileChange}
                  />
                   {preview && (
        <div className="m-3"> 
          <p>Preview:</p>
          <img src={preview} alt="Preview" style={{ width: '20%', height: '20%',border:"1px solid black" }} />
        </div>
      )}
                   {/* {image && <p>Selected file: {image==null?"":image}</p>} */}
                </div>

                <div className="my-3">
                  <Form.Label style={{fontWeight:'500'}} htmlFor="title">Post title</Form.Label>
                  <Form.Control
                    type="text"
                    id="title"
                    value={post.title}
                    placeholder="Enter here"
                    className="rounded-0"
                    name="title"
                    onChange={fieldChanged}
                  />
                </div>
                <div className="my-3">
                  <FormLabel style={{fontWeight:'500'}} htmlFor="content">Post Content</FormLabel>
                  <JoditEditor
                    ref={editor}
                    value={post.content}
                    onChange={(newContent) => contentFieldChanaged(newContent)}
                  />
                </div>

                <div className="m-2 text-center">
                {blogid == "" ? (
            <Button
            className="rounded-0" color="primary"
              type="submit" 
              disabled={isLoading}
            >
              {!isLoading ? "Create Post" : "Waiting..."}
            </Button>
          ) : (
            <Button
            className="rounded-0" color="primary"
              type="submit" 
              disabled={isLoading}
            >
              {!isLoading ? "Update Post" : "Waiting..."}
            </Button>
          )}
                  {/* <Button type="submit" className="rounded-0" color="primary">
                    Create Post
                  </Button> */}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
      <Loading show={isLoading} onHide={() => setIsLoading(false)} />
    </div>
  );
}
