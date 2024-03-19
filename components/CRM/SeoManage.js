// components/SEOManager.js

import { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import Loading from "../Comps/Loading";
import Tablenav from "../Comps/Tablenav";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Spinner } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Zoom from "@mui/material/Zoom";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

var oldData = [];

const SEOManage = () => {
  const [showModal, setShowModal] = useState(false);
  const [collegeApi, setCollegeApi] = useState([]);
  const [seoApi, setSeoApi] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [isApiHitComplete, setIsApiHitComplete] = useState(false);
  const [isDataFound, setIsDataFound] = useState(false);
  const [TotalCountNumber, setTotalCountNumber] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [collegeId, setCollegId] = useState("");

  const [formData, setFormData] = useState({
    collegename: "",
    title: "",
    description: "",
    keywords: "",
    canonical: "",
  });
  const [twitterDetails, setTwitterDetails] = useState({
    twittertitle: "",
    twitterdescription: "",
    twitterImage: "",
    twitterCreator: "@learnerhunt",
    twitterSite: "@learnerhunt",
  });
  const [ogDetails, setOgDetails] = useState({
    ogLocale: "en_US",
    ogType: "website",
    ogTitle: "",
    ogDescription: "",
    ogUrl: "",
    ogImage: "",
    ogImageSecureUrl: "",
    ogImageWidth: "",
    ogImageHeight: "",
    ogImageAlt: "",
  });
  const [customSchema, setCustomSchema] = useState({
    structuredData: "",
    faqStructuredData: "",
  });

  const [errors, setErrors] = useState({
    collegename: false,
    title: false,
    description: false,
    keywords: false,
    canonical: false,
    customSchemaStructuredData: false,
    customSchemafaqStructuredData: false,
  });

  const handleModalClose = () => {
    setShowModal(false);
    setCollegId("");
    // console.log(formData.title);
    setFormData({
      collegename: "",
      title: "",
      description: "",
      keywords: "",
      canonical: "",
    });
    setTwitterDetails({
      twittertitle: "",
      twitterdescription: "",
      twitterImage: "",
      twitterCreator: "@learnerhunt",
      twitterSite: "@learnerhunt",
    });
    setOgDetails({
      ogLocale: "en_US",
      ogType: "website",
      ogTitle: "",
      ogDescription: "",
      ogUrl: "",
      ogImage: "",
      ogImageSecureUrl: "",
      ogImageWidth: "",
      ogImageHeight: "",
      ogImageAlt: "",
    });

    setCustomSchema({
      structuredData: "",
      faqStructuredData: "",
    });
    setErrors({
      collegename: false,
      title: false,
      description: false,
      keywords: false,
      canonical: false,
      customSchemaStructuredData: false,
      customSchemafaqStructuredData: false,
    });
  };
  const handleModalShow =() => setShowModal(true);

  const collegeDataApi = () => {
    setIsApiHitComplete(false);
    setIsDataFound(false);
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/seomanager", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
    })
      .then(async (response) => {
        var res = await response.json();
        // console.log(res.data);
        setCollegeApi(res.data.college_list);
        if (res.data.seo_pages.length > 0) {
          setIsDataFound(true);
          setSeoApi(res.data.seo_pages);
        }
        setTotalCountNumber(res.data.seo_pages.length);
        setIsApiHitComplete(true);
        oldData = res.data.seo_pages;

        //   console.log(res.data.college_list)
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  useEffect(() => {
    collegeDataApi();
  }, []);

  const handleInputChange = (e, group, type = "text") => {
    const { name, value } = e.target;
    // console.log(name,value)
    if (group === "basic") {
      if (type == "select") {
        // console.log("selectlist onchange")
        // const selectedObj = collegeApi.find((obj) => console.log(obj));

        const selectedObj = collegeApi.find((obj) => obj._id == value.value);
        // console.log(selectedObj);
        // console.log(selectedObj.square_img_path)
        setFormData({
          ...formData,
          ["canonical"]: `https://www.learnerhunt.com/${selectedObj.slug}`,
          ["collegename"]: value,
        });
        setTwitterDetails({
          ...twitterDetails,
          ["twitterImage"]: `https://learnerhunt-assets.s3.us-east-1.amazonaws.com/${selectedObj.square_img_path}`,
        });
        setOgDetails({
          ...ogDetails,
          ["ogUrl"]: `https://www.learnerhunt.com/${selectedObj.slug}`,
        });
      } else if (type == "title") {
        setFormData({ ...formData, [name]: value });
        setTwitterDetails({ ...twitterDetails, ["twittertitle"]: value });
        setOgDetails({ ...ogDetails, ["ogTitle"]: value });
      }
      else if (type == "desc") {
        setFormData({ ...formData, [name]: value });
        setTwitterDetails({ ...twitterDetails, ["twitterdescription"]: value });
        setOgDetails({ ...ogDetails, ["ogDescription"]: value });
      }
       else {
        setFormData({ ...formData, [name]: value });
      }
      setErrors({ ...errors, [name]: false });
    } else if (group === "twitter") {
      setTwitterDetails({ ...twitterDetails, [name]: value });
    } else if (group === "og") {
      setOgDetails({ ...ogDetails, [name]: value });
    } else if (group === "schemaname") {
      setCustomSchema({ ...customSchema, [name]: value });
    }
  };

  const handleSaveSEOData = () => {
    const newErrors = {};
    if (formData.collegename == "") {
      newErrors.collegename = true;
      Swal.fire({
        title: "Select college name",
      });
    }
    if (formData.title.trim() === "") {
      newErrors.title = true;
      Swal.fire({
        title: "Please enter a title.",
      });
    } else if (formData.title.length > 60) {
      // Additional validation if needed
      newErrors.title = true;
      Swal.fire({
        title: "Title length must be between 1 and 60 characters.",
      });
    }
    if (formData.description.trim() === "") {
      newErrors.description = true;
      Swal.fire({
        title: "Please enter a description.",
      });
    } else if (formData.description.length > 160) {
      // Additional validation if needed
      newErrors.description = true;
      Swal.fire({
        title: "Description length must be between 1 and 160 characters.",
      });
    }
    if (formData.keywords.trim() === "") {
      newErrors.keywords = true;
      Swal.fire({
        title: "Please enter a keywords.",
      });
    } else if (formData.keywords.length > 65) {
      // Additional validation if needed
      newErrors.keywords = true;
      Swal.fire({
        title: "Keywords length must be between 1 and 65 characters.",
      });
    }
    if (formData.canonical.trim() === "") {
      newErrors.canonical = true;
      Swal.fire({
        title: "Please enter a canonical.",
      });
    } else if (formData.canonical.length > 265) {
      // Additional validation if needed
      newErrors.canonical = true;
      Swal.fire({
        title: "Canonical length must be between 1 and 265 characters.",
      });
    }

    if (formData.canonical.length > 256 || formData.canonical == "") {
      newErrors.canonical = true;
      Swal.fire({
        title: "Enter canonical.",
      });
    }
    if (customSchema.structuredData !== "") {
      try {
        JSON.parse(customSchema.structuredData);
      } catch (error) {
        Swal.fire({
          title: "Enter json format.",
        });
        newErrors.customSchemaStructuredData = true; // Mark as error if JSON parsing fails
      }
    }
    if (customSchema.faqStructuredData !== "") {
      try {
        JSON.parse(customSchema.faqStructuredData);
      } catch (error) {
        Swal.fire({
          title: "Enter json format.",
        });
        newErrors.customSchemafaqStructuredData = true; // Mark as error if JSON parsing fails
      }
    }
    if (Object.values(newErrors).some((error) => error)) {
      // If there are errors, set the errors state
      setErrors(newErrors);
    } else {
      // If no errors, proceed to save
      //   console.log(formData, twitterDetails, ogDetails, customSchema);
      try {
        const fd = new FormData();
        fd.append("cid", formData.collegename);
        fd.append("title", formData.title);
        fd.append("description", formData.description);
        fd.append("keywords", formData.keywords);
        fd.append("canonical", formData.canonical);
        fd.append("twitter_title", twitterDetails.twittertitle);
        fd.append("twitter_description", twitterDetails.twitterdescription);
        fd.append("twitter_image", twitterDetails.twitterImage);
        fd.append("twitter_creater", twitterDetails.twitterCreator);
        fd.append("twitter_site", twitterDetails.twitterSite);
        fd.append("og_locale", ogDetails.ogLocale);
        fd.append("og_type", ogDetails.ogType);
        fd.append("og_title", ogDetails.ogTitle);
        fd.append("og_description", ogDetails.ogDescription);
        fd.append("og_url", ogDetails.ogUrl);
        fd.append("og_image", ogDetails.ogImage);
        fd.append("og_image_secure_url", ogDetails.ogImageSecureUrl);
        fd.append("og_image_width", ogDetails.ogImageWidth || 0);
        fd.append("og_image_height", ogDetails.ogImageHeight || 0);
        fd.append("og_image_alt", ogDetails.ogImageAlt);
        fd.append("structured_data", customSchema.structuredData);
        fd.append("faq_structured_data", customSchema.faqStructuredData);

        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/seomanager", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pt")}`,
          },
          method: "POST",
          body: fd,
        }).then(async (response) => {
          // console.log(response)
          if (response.ok) {
            var res = await response.json();
            // console.log(res);
            // console.log(res.data);
            Swal.fire({
              title: "Success",
              text: `${res.message}`,
              icon: "success",
              confirmButtonText: "Ok",
            }).then(() => {
              setShowModal(false);
              collegeDataApi();
              setFormData({
                collegename: "",
                title: "",
                description: "",
                keywords: "",
                canonical: "",
              });
              setTwitterDetails({
                twittertitle: "",
                twitterdescription: "",
                twitterImage: "",
              });
              setOgDetails({
                ogTitle: "",
                ogDescription: "",
                ogUrl: "",
                ogImage: "",
                ogImageSecureUrl: "",
                ogImageWidth: "",
                ogImageHeight: "",
                ogImageAlt: "",
              });

              setCustomSchema({
                structuredData: "",
                faqStructuredData: "",
              });
              setErrors({
                collegename: false,
                title: false,
                description: false,
                keywords: false,
                canonical: false,
                customSchemaStructuredData: false,
                customSchemafaqStructuredData: false,
              });
            });
          } else {
            var res = await response.json();
            Swal.fire({
              title: "error",
              text: `${res.error}`,
              icon: "error",
              confirmButtonText: "Ok",
            }).then(() => {});
            // console.log("else part");
          }
        });
      } catch (error) {
        console.error("Failed to fetch OTP:", error);
      }
      //   handleModalClose();
    }
  };

  const handleEditSEOData = () => {
    const newErrors = {};
    if (formData.collegename == "") {
      newErrors.collegename = true;
      Swal.fire({
        title: "Select college name",
      });
    }
    if (formData.title.length > 60 || formData.title == "") {
      newErrors.title = true;
      Swal.fire({
        title: "Enter title.",
      });
    }
    if (formData.description.length > 160 || formData.description == "") {
      newErrors.description = true;
      Swal.fire({
        title: "Enter description.",
      });
    }
    if (formData.keywords.length > 65 || formData.keywords == "") {
      newErrors.keywords = true;
      Swal.fire({
        title: "Enter keyword.",
      });
    }
    if (formData.canonical.length > 256 || formData.canonical == "") {
      newErrors.canonical = true;
      Swal.fire({
        title: "Enter canonical.",
      });
    }
    if (customSchema.structuredData !== "") {
      try {
        JSON.parse(customSchema.structuredData);
      } catch (error) {
        Swal.fire({
          title: "Enter json format.",
        });
        newErrors.customSchemaStructuredData = true; // Mark as error if JSON parsing fails
      }
    }
    if (customSchema.faqStructuredData !== "") {
      try {
        JSON.parse(customSchema.faqStructuredData);
      } catch (error) {
        Swal.fire({
          title: "Enter json format.",
        });
        newErrors.customSchemafaqStructuredData = true; // Mark as error if JSON parsing fails
      }
    }
    if (Object.values(newErrors).some((error) => error)) {
      // If there are errors, set the errors state
      setErrors(newErrors);
    } else {
      // If no errors, proceed to save
      //   console.log(formData, twitterDetails, ogDetails, customSchema);
      try {
        const fd = new FormData();
        fd.append("cid", formData.collegename);
        fd.append("title", formData.title);
        fd.append("description", formData.description);
        fd.append("keywords", formData.keywords);
        fd.append("canonical", formData.canonical);
        fd.append("twitter_title", twitterDetails.twittertitle);
        fd.append("twitter_description", twitterDetails.twitterdescription);
        fd.append("twitter_image", twitterDetails.twitterImage);
        fd.append("twitter_creater", twitterDetails.twitterCreator);
        fd.append("twitter_site", twitterDetails.twitterSite);
        fd.append("og_locale", ogDetails.ogLocale);
        fd.append("og_type", ogDetails.ogType);
        fd.append("og_title", ogDetails.ogTitle);
        fd.append("og_description", ogDetails.ogDescription);
        fd.append("og_url", ogDetails.ogUrl);
        fd.append("og_image", ogDetails.ogImage);
        fd.append("og_image_secure_url", ogDetails.ogImageSecureUrl);
        fd.append("og_image_width", ogDetails.ogImageWidth || 0);
        fd.append("og_image_height", ogDetails.ogImageHeight || 0);
        fd.append("og_image_alt", ogDetails.ogImageAlt);
        fd.append("structured_data", customSchema.structuredData);
        fd.append("faq_structured_data", customSchema.faqStructuredData);

        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/seomanager", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pt")}`,
          },
          method: "PUT",
          body: fd,
        }).then(async (response) => {
          // console.log(response)
          if (response.ok) {
            var res = await response.json();
            // console.log(res);
            // console.log(res.data);
            Swal.fire({
              title: "Success",
              text: `${res.message}`,
              icon: "success",
              confirmButtonText: "Ok",
            }).then(() => {
              setShowModal(false);
              collegeDataApi();
              setCollegId("");
              setFormData({
                collegename: "",
                title: "",
                description: "",
                keywords: "",
                canonical: "",
              });
              setTwitterDetails({
                twittertitle: "",
                twitterdescription: "",
                twitterImage: "",
                twitterCreator: "@learnerhunt",
                twitterSite: "@learnerhunt",
              });
              setOgDetails({
                ogLocale: "en_US",
                ogType: "website",
                ogTitle: "",
                ogDescription: "",
                ogUrl: "",
                ogImage: "",
                ogImageSecureUrl: "",
                ogImageWidth: "",
                ogImageHeight: "",
                ogImageAlt: "",
              });

              setCustomSchema({
                structuredData: "",
                faqStructuredData: "",
              });
              setErrors({
                collegename: false,
                title: false,
                description: false,
                keywords: false,
                canonical: false,
                customSchemaStructuredData: false,
                customSchemafaqStructuredData: false,
              });
            });
          } else {
            var res = await response.json();
            Swal.fire({
              title: "error",
              text: `${res.error}`,
              icon: "error",
              confirmButtonText: "Ok",
            }).then(() => {});
            // console.log("else part");
          }
        });
      } catch (error) {
        console.error("Failed to fetch OTP:", error);
      }
      //   handleModalClose();
    }
  };
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    const searchTerm = e.target.value
      .trim()
      .replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const searchKeyword = new RegExp(`\\b${searchTerm}\\w*\\b`, "i");

    if (e.target.value === "") {
      setSeoApi(oldData);
      setIsDataFound(oldData.length > 0);
    } else {
      const filteredData = oldData.filter((data) =>
        searchKeyword.test(data.college_name.toLowerCase())
      );

      setSeoApi(filteredData);
      setIsDataFound(filteredData.length > 0);
    }
  };

  const handleEdit = (e, id) => {
    setCollegId(id);
    setShowModal(true);
    setIsApiHitComplete(false);
    setIsDataFound(false);
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/seomanager/" + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
    })
      .then(async (response) => {
        var res = await response.json();
        console.log(res.data);
        // console.log(res.data[0].title);
        setIsApiHitComplete(true);
        setIsDataFound(true);
        setFormData({
          collegename: res.data[0].college_name,
          title: res.data[0].title,
          description: res.data[0].description,
          keywords: res.data[0].keywords,
          canonical: res.data[0].canonical,
        });
        setTwitterDetails({
          twittertitle: res.data[0].twitter_title,
          twitterdescription: res.data[0].twitter_description,
          twitterImage: res.data[0].twitter_image,
          twitterCreator: res.data[0].twitter_creator || "@learnerhunt",
          twitterSite: res.data[0].twitter_site || "@learnerhunt",
        });
        setOgDetails({
          ogLocale: res.data[0].og_locale || "en_US",
          ogType: res.data[0].og_type || "website",
          ogTitle: res.data[0].og_title,
          ogDescription: res.data[0].og_description,
          ogUrl: res.data[0].og_url,
          ogImage: res.data[0].og_image,
          ogImageSecureUrl: res.data[0].og_image_secure_url,
          ogImageWidth: res.data[0].og_image_width,
          ogImageHeight: res.data[0].og_image_height,
          ogImageAlt: res.data[0].og_image_alt,
        });
        setCustomSchema({
          structuredData: res.data[0].structured_data,
          faqStructuredData: res.data[0].faq_structured_data,
        });

        // setCollegeApi(res.data.college_list)
      })
      .catch((error) => {
        console.log(error);
      });
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
          process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/seomanager/" + id,
          {
            method: "Delete",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pt")}`,
            },
            body: formData,
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
                collegeDataApi();
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
  return (
    <div>
      {/* <Button variant="primary" onClick={handleModalShow}>
        Add SEO Data
      </Button> */}

      {/* table get Data */}

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
                <th style={{ background: "var(--primary)" }}>College name</th>
                <th style={{ background: "var(--primary)" }}>Description</th>
                <th style={{ background: "var(--primary)" }}>Title</th>
                <th style={{ background: "var(--primary)" }}>keyword</th>
                <th style={{ background: "var(--primary)" }}>canonical</th>
                <th style={{ background: "var(--primary)" }}>Remove</th>
                <th style={{ background: "var(--primary)" }}>Edit</th>
              </tr>
            </thead>
            <tbody>
              {seoApi.map((clg, i) => {
                return (
                  <tr key={i}>
                    <td style={{ wordWrap: "break-word", whiteSpace: "unset" }}>
                      {clg.college_name}
                    </td>
                    <td style={{ wordWrap: "break-word", whiteSpace: "unset" }}>
                      {clg.description}
                    </td>
                    <td style={{ wordWrap: "break-word", whiteSpace: "unset" }}>
                      {clg.title}
                    </td>
                    <td style={{ wordWrap: "break-word", whiteSpace: "unset" }}>
                      {clg.keywords}
                    </td>
                    <td style={{ wordWrap: "break-word", whiteSpace: "unset" }}>
                      {clg.canonical}
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
      <Loading show={isloading} onHide={() => setIsloading(false)} />

      {/* Add module */}
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
          <Modal.Title>
            {collegeId == "" ? "Add Seo Data" : "Edit Seo Data"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={12} className="mb-2">
                {/* <Form.Group controlId="collegename">
                  <Form.Label
                    className={errors.collegename ? "text-danger" : ""}
                  >
                    College Name *
                  </Form.Label> */}
                  {/* <Form.Select
                    aria-label="Default select example"
                    name="collegename"
                    value={formData.collegename}
                    onChange={(e) => handleInputChange(e, "basic", "select")}
                    required
                  >
                    <option disabled value="">
                      Select College Name
                    </option>
                    {collegeApi.map((s, i) => (
                      <option key={i} value={s._id}>
                        {s.college_name}
                      </option>
                    ))}
                  </Form.Select> */}
      <Autocomplete
  disablePortal
  options={collegeApi.map((s) => ({
    value: s._id,
    label: s.college_name
  }))}
  value={formData.collegename} // Set the value attribute

  // onChange={(e) => handleInputChange(e, "basic", "select")}
  onChange={(event, value) => handleInputChange({ target: { name: "collegename", value: value } }, "basic", "select")}
  renderInput={(params) => 
    <TextField
    {...params}
    label="Select College Name"
    name="collegename" // Set the name attribute
    // value={formData.collegename}
  />}
/>
                {/* </Form.Group> */}
              </Col>
            </Row>
            <h3>Basic Details</h3>
            <Row>
              <Col md={4} className="mb-2">
                <Form.Group controlId="title">
                  <Form.Label className={errors.title ? "text-danger" : ""}>
                    Title *
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange(e, "basic", "title")}
                  />
                  <Form.Text className="text-muted">
                    Character length must be 50-60.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={4} className="mb-2">
                <Form.Group controlId="description">
                  <Form.Label
                    className={errors.description ? "text-danger" : ""}
                  >
                    Description *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange(e, "basic","desc")}
                  />
                  <Form.Text className="text-muted">
                    Character length must be 150-160.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={4} className="mb-2">
                <Form.Group controlId="keywords">
                  <Form.Label className={errors.keywords ? "text-danger" : ""}>
                    Keywords *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="keywords"
                    value={formData.keywords}
                    onChange={(e) => handleInputChange(e, "basic")}
                  />
                  <Form.Text className="text-muted">
                    Character length must be 60-65.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="canonical">
                  <Form.Label className={errors.canonical ? "text-danger" : ""}>
                    Canonical URL *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="canonical"
                    value={formData.canonical}
                    onChange={(e) => handleInputChange(e, "basic")}
                  />
                  <Form.Text className="text-muted">
                    Character length under 256.
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <h3>Advance Details</h3>
            <h6>Twitter Tags</h6>
            <Row>
              <Col md={4} className="mb-2">
                <Form.Group controlId="twittertitle">
                  <Form.Label>
                    Twitter Title
                    <Tooltip
                      placement="top"
                      TransitionComponent={Zoom}
                      arrow
                      title={
                        <span style={{ fontSize: "13px" }}>
                          The twitter:title attribute is used to specify the
                          title of the content being shared on Twitter.
                        </span>
                      }
                    >
                      <IconButton>
                        <InfoOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="twittertitle"
                    value={twitterDetails.twittertitle}
                    onChange={(e) => handleInputChange(e, "twitter")}
                  />
                  <Form.Text className="text-muted">
                    Character length must be 50-60.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={4} className="mb-2">
                <Form.Group controlId="twitterdescription">
                  <Form.Label>
                    Twitter Description
                    <Tooltip
                      placement="top"
                      TransitionComponent={Zoom}
                      arrow
                      title={
                        <span style={{ fontSize: "13px" }}>
                          The twitter:description provides a concise summary or
                          description of the content of the webpage, which can
                          be displayed when the page is shared on Twitter.
                        </span>
                      }
                    >
                      <IconButton>
                        <InfoOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="twitterdescription"
                    value={twitterDetails.twitterdescription}
                    onChange={(e) => handleInputChange(e, "twitter")}
                  />
                  <Form.Text className="text-muted">
                    Character length must be 150-160.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={4} className="mb-2">
                <Form.Group controlId="twitterImage">
                  <Form.Label>
                    Twitter Image
                    <Tooltip
                      placement="top"
                      TransitionComponent={Zoom}
                      arrow
                      title={
                        <span style={{ fontSize: "13px" }}>
                          The twitter:image meta tag is used in SEO to specify
                          the image that should be displayed when a webpage is
                          shared on Twitter.
                        </span>
                      }
                    >
                      <IconButton>
                        <InfoOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Form.Label>
                  <Form.Control
                    title={twitterDetails.twitterImage}
                    type="text"
                    name="twitterImage"
                    value={twitterDetails.twitterImage}
                    onChange={(e) => handleInputChange(e, "twitter")}
                  />
                  <Form.Text className="text-muted">
                    Provide image path url.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="twitterCreator">
                  <Form.Label>
                    Twitter Creator
                    <Tooltip
                      placement="top"
                      TransitionComponent={Zoom}
                      arrow
                      title={
                        <span style={{ fontSize: "13px" }}>
                          The twitter:creator tag in SEO Twitter tags is used to
                          specify the Twitter username of the content creator or
                          author.
                        </span>
                      }
                    >
                      <IconButton>
                        <InfoOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="twitterCreator"
                    value={twitterDetails.twitterCreator}
                    disabled
                    // onChange={(e) => handleInputChange(e, "twitter")}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="twitterSite">
                  <Form.Label>
                    Twitter Site
                    <Tooltip
                      placement="top"
                      TransitionComponent={Zoom}
                      arrow
                      title={
                        <span style={{ fontSize: "13px" }}>
                          When a user shares the webpage's URL on Twitter, the
                          twitter:site tag ensures that the specified Twitter
                          account is attributed as the source of the content.
                        </span>
                      }
                    >
                      <IconButton>
                        <InfoOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="twitterSite"
                    value={twitterDetails.twitterSite}
                    onChange={(e) => handleInputChange(e, "twitter")}
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <h6>Og Tags</h6>
            <Row>
              <Col md={4} className="mb-2">
                <Form.Group controlId="ogLocale">
                  <Form.Label>
                    OG Locale
                    <Tooltip
                      placement="top"
                      TransitionComponent={Zoom}
                      arrow
                      title={
                        <span style={{ fontSize: "13px" }}>
                          The og:locale meta tag is used to specify the locale
                          or language of the content on a webpage for Open Graph
                          (OG) protocol.
                        </span>
                      }
                    >
                      <IconButton>
                        <InfoOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="ogLocale"
                    value={ogDetails.ogLocale}
                    disabled
                    // onChange={(e) => handleInputChange(e, "og")}
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-2">
                <Form.Group controlId="ogType">
                  <Form.Label>
                    OG Type
                    <Tooltip
                      placement="top"
                      TransitionComponent={Zoom}
                      arrow
                      title={
                        <span style={{ fontSize: "13px" }}>
                          The og:type property in Open Graph (OG) meta tags is
                          used to define the type or category of the content
                          being shared.
                        </span>
                      }
                    >
                      <IconButton>
                        <InfoOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="ogType"
                    value={ogDetails.ogType}
                    disabled
                    // onChange={(e) => handleInputChange(e, "og")}
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-2">
                <Form.Group controlId="ogTitle">
                  <Form.Label>
                    OG Title
                    <Tooltip
                      placement="top"
                      TransitionComponent={Zoom}
                      arrow
                      title={
                        <span style={{ fontSize: "13px" }}>
                          The og:title tag is part of the Open Graph protocol,
                          which allows webmasters to specify how content should
                          be presented when shared on social media platforms
                          like Facebook, LinkedIn, and others.
                        </span>
                      }
                    >
                      <IconButton>
                        <InfoOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="ogTitle"
                    value={ogDetails.ogTitle}
                    onChange={(e) => handleInputChange(e, "og")}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="ogDescription">
                  <Form.Label>
                    OG Description
                    <Tooltip
                      placement="top"
                      TransitionComponent={Zoom}
                      arrow
                      title={
                        <span style={{ fontSize: "13px" }}>
                          The og:description provides a brief description of the
                          content of the webpage and is primarily used by social
                          media platforms and other services when a webpage is
                          shared or linked.
                        </span>
                      }
                    >
                      <IconButton>
                        <InfoOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="ogDescription"
                    value={ogDetails.ogDescription}
                    onChange={(e) => handleInputChange(e, "og")}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="ogUrl">
                  <Form.Label>
                    OG URL
                    <Tooltip
                      placement="top"
                      TransitionComponent={Zoom}
                      arrow
                      title={
                        <span style={{ fontSize: "13px" }}>
                          The og:url tag in Open Graph (OG) meta tags is used to
                          specify the canonical URL of the web page.
                        </span>
                      }
                    >
                      <IconButton>
                        <InfoOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="ogUrl"
                    value={ogDetails.ogUrl}
                    onChange={(e) => handleInputChange(e, "og")}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="ogImage">
                  <Form.Label>
                    OG Image
                    <Tooltip
                      placement="top"
                      TransitionComponent={Zoom}
                      arrow
                      title={
                        <span style={{ fontSize: "13px" }}>
                          The og:image tag is used to specify the image that
                          should be displayed when a webpage is shared on social
                          media platforms like Twitter.
                        </span>
                      }
                    >
                      <IconButton>
                        <InfoOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="ogImage"
                    value={ogDetails.ogImage}
                    onChange={(e) => handleInputChange(e, "og")}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="ogImageSecureUrl">
                  <Form.Label>
                    OG Image Secure URL
                    <Tooltip
                      placement="top"
                      TransitionComponent={Zoom}
                      arrow
                      title={
                        <span style={{ fontSize: "13px" }}>
                          The og:image:secure_url property serves a similar
                          purpose to the og:image property but ensures that the
                          image URL is served over a secure connection.
                        </span>
                      }
                    >
                      <IconButton>
                        <InfoOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="ogImageSecureUrl"
                    value={ogDetails.ogImageSecureUrl}
                    onChange={(e) => handleInputChange(e, "og")}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="ogImageWidth">
                  <Form.Label>
                    OG Image Width
                    <Tooltip
                      placement="top"
                      TransitionComponent={Zoom}
                      arrow
                      title={
                        <span style={{ fontSize: "13px" }}>
                          The og:image:width property in Open Graph (OG) tags,
                          including Twitter tags, is used to specify the width
                          of the image being shared.
                        </span>
                      }
                    >
                      <IconButton>
                        <InfoOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="ogImageWidth"
                    value={ogDetails.ogImageWidth}
                    onChange={(e) => handleInputChange(e, "og")}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="ogImageHeight">
                  <Form.Label>
                    OG Image Height
                    <Tooltip
                      placement="top"
                      TransitionComponent={Zoom}
                      arrow
                      title={
                        <span style={{ fontSize: "13px" }}>
                          The og:image:height property in Open Graph (OG) tags
                          is used to specify the height of the image being
                          shared.
                        </span>
                      }
                    >
                      <IconButton>
                        <InfoOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="ogImageHeight"
                    value={ogDetails.ogImageHeight}
                    onChange={(e) => handleInputChange(e, "og")}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="ogImageAlt">
                  <Form.Label>
                    OG Image Alt
                    <Tooltip
                      placement="top"
                      TransitionComponent={Zoom}
                      arrow
                      title={
                        <span style={{ fontSize: "13px" }}>
                          The og:image:alt property is used in Open Graph (OG)
                          meta tags to provide alternative text for an image.
                        </span>
                      }
                    >
                      <IconButton>
                        <InfoOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="ogImageAlt"
                    value={ogDetails.ogImageAlt}
                    onChange={(e) => handleInputChange(e, "og")}
                  />
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <h6>Schema</h6>
            <Row>
              <Col md={6}>
                <Form.Group controlId="structuredData">
                  <Form.Label
                    className={
                      errors.customSchemaStructuredData ? "text-danger" : ""
                    }
                  >
                    Structured Data
                    <Tooltip
                      placement="top"
                      TransitionComponent={Zoom}
                      arrow
                      title={
                        <span style={{ fontSize: "13px" }}>
                          By including schema markup on your website, you can
                          potentially improve your search engine visibility and
                          enhance the appearance of your search results.
                        </span>
                      }
                    >
                      <IconButton>
                        <InfoOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="structuredData"
                    value={customSchema.structuredData}
                    onChange={(e) => handleInputChange(e, "schemaname")}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="faqStructuredData">
                  <Form.Label
                    className={
                      errors.customSchemafaqStructuredData ? "text-danger" : ""
                    }
                  >
                    FAQ Structured Data
                    <Tooltip
                      placement="top"
                      TransitionComponent={Zoom}
                      arrow
                      title={
                        <span style={{ fontSize: "13px" }}>
                          Implementing FAQ schema markup can enhance the
                          visibility of FAQ content in search engine results
                          pages (SERPs) and improve the chances of appearing in
                          rich results such as rich snippets, FAQ carousels, or
                          voice search results.
                        </span>
                      }
                    >
                      <IconButton>
                        <InfoOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="faqStructuredData"
                    value={customSchema.faqStructuredData}
                    onChange={(e) => handleInputChange(e, "schemaname")}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {collegeId == "" ? (
            <Button variant="info" onClick={handleSaveSEOData}>
              Save
            </Button>
          ) : (
            <Button variant="info" onClick={handleEditSEOData}>
              Edit
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SEOManage;
