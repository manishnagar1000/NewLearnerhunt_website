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
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import LoopIcon from "@mui/icons-material/Loop";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterModal from "./FilterModal/FilterModal";
import Chip from '@mui/material/Chip';

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
  const [seoType, setSeoType] = useState("1");
  const [totalPages, setTotalPages] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [modalShow, setModalShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isFilterApplied, setisFilterApplied] = useState(false);
  const [isFilterReset, setisFilterReset] = useState(false);

  const [formData, setFormData] = useState({
    collegename: "",
    title: "",
    description: "",
    keywords: "",
    canonical: "",
    changeSlug: "",
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

  // blog seo
  const [blogApi, setBlogApi] = useState([]);
  const [formblogData, setFormblogData] = useState({
    blogname: "",
    title: "",
    description: "",
    keywords: "",
    canonical: "",
    changeSlug: "",
  });

  const [twitterblogDetails, setTwitterblogDetails] = useState({
    twittertitle: "",
    twitterdescription: "",
    twitterImage: "",
    twitterCreator: "@learnerhunt",
    twitterSite: "@learnerhunt",
  });
  const [ogblogDetails, setOgblogDetails] = useState({
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
  const [customblogSchema, setCustomblogSchema] = useState({
    structuredData: "",
    faqStructuredData: "",
  });

  const [blogerrors, setblogErrors] = useState({
    blogname: false,
    title: false,
    description: false,
    keywords: false,
    canonical: false,
    customSchemaStructuredData: false,
    customSchemafaqStructuredData: false,
  });

  // courses seo
  const [courseApi, setCourseApi] = useState([]);
  const [formcourseData, setFormcourseData] = useState({
    coursename: "",
    title: "",
    description: "",
    keywords: "",
    canonical: "",
    changeSlug: "",
  });

  const [twittercourseDetails, setTwittercourseDetails] = useState({
    twittertitle: "",
    twitterdescription: "",
    twitterImage: "",
    twitterCreator: "@learnerhunt",
    twitterSite: "@learnerhunt",
  });
  const [ogcourseDetails, setOgcourseDetails] = useState({
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
  const [customcourseSchema, setCustomcourseSchema] = useState({
    structuredData: "",
    faqStructuredData: "",
  });

  const [courseerrors, setcourseErrors] = useState({
    coursename: false,
    title: false,
    description: false,
    keywords: false,
    canonical: false,
    customSchemaStructuredData: false,
    customSchemafaqStructuredData: false,
  });

  // Exam seo
  const [examApi, setExamApi] = useState([]);
  const [formexamData, setFormexamData] = useState({
    examname: "",
    title: "",
    description: "",
    keywords: "",
    canonical: "",
    changeSlug: "",
  });

  const [twitterexamDetails, setTwitterexamDetails] = useState({
    twittertitle: "",
    twitterdescription: "",
    twitterImage: "",
    twitterCreator: "@learnerhunt",
    twitterSite: "@learnerhunt",
  });
  const [ogexamDetails, setOgexamDetails] = useState({
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
  const [customexamSchema, setCustomexamSchema] = useState({
    structuredData: "",
    faqStructuredData: "",
  });

  const [examerrors, setexamErrors] = useState({
    examname: false,
    title: false,
    description: false,
    keywords: false,
    canonical: false,
    customSchemaStructuredData: false,
    customSchemafaqStructuredData: false,
  });

  // useEffect(()=>{
  //   console.log(formblogData)
  // },[formblogData.blogname])

  const handleModalClose = () => {
    setShowModal(false);
    setCollegId("");
    setIsloading(false);

    if (seoType == 1) {
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
    } else if (seoType == 2) {
      // console.log(formData.title);
      setFormblogData({
        blogname: "",
        title: "",
        description: "",
        keywords: "",
        canonical: "",
      });
      setTwitterblogDetails({
        twittertitle: "",
        twitterdescription: "",
        twitterImage: "",
        twitterCreator: "@learnerhunt",
        twitterSite: "@learnerhunt",
      });
      setOgblogDetails({
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

      setCustomblogSchema({
        structuredData: "",
        faqStructuredData: "",
      });
      setblogErrors({
        blogname: false,
        title: false,
        description: false,
        keywords: false,
        canonical: false,
        customSchemaStructuredData: false,
        customSchemafaqStructuredData: false,
      });
    } else if (seoType == 3) {
      // console.log(formData.title);
      setFormcourseData({
        coursename: "",
        title: "",
        description: "",
        keywords: "",
        canonical: "",
      });
      setTwittercourseDetails({
        twittertitle: "",
        twitterdescription: "",
        twitterImage: "",
        twitterCreator: "@learnerhunt",
        twitterSite: "@learnerhunt",
      });
      setOgcourseDetails({
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

      setCustomcourseSchema({
        structuredData: "",
        faqStructuredData: "",
      });
      setcourseErrors({
        coursename: false,
        title: false,
        description: false,
        keywords: false,
        canonical: false,
        customSchemaStructuredData: false,
        customSchemafaqStructuredData: false,
      });
    } else if (seoType == 4) {
      // console.log(formData.title);
      setFormexamData({
        examname: "",
        title: "",
        description: "",
        keywords: "",
        canonical: "",
      });
      setTwitterexamDetails({
        twittertitle: "",
        twitterdescription: "",
        twitterImage: "",
        twitterCreator: "@learnerhunt",
        twitterSite: "@learnerhunt",
      });
      setOgexamDetails({
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

      setCustomexamSchema({
        structuredData: "",
        faqStructuredData: "",
      });
      setexamErrors({
        examname: false,
        title: false,
        description: false,
        keywords: false,
        canonical: false,
        customSchemaStructuredData: false,
        customSchemafaqStructuredData: false,
      });
    }
  };
  const handleModalShow = () => setShowModal(true);

  const collegeDataApi = (seoType, page = 1) => {
    setIsApiHitComplete(false);
    setIsDataFound(false);
    fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT +
      `/admin/seomanager?type=${seoType}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pt")}`,
        },
      }
    )
      .then(async (response) => {
        let res = await response.json();
        // console.log(res.data);
        if (response.status === 429) {
          Swal.fire({
            title: "Error",
            text: response.error,
            icon: "error",
            confirmButtonText: "Ok",
          })
          this.setState({ isApiHitComplete: true });
          return;
        }
        setCollegeApi(res.data.college_list);
        setBlogApi(res.data.blog_list);
        setCourseApi(res.data.course_list);
        setExamApi(res.data.exam_list);
        setTotalPages(Math.ceil(res.data.totalSeoRecords / res.data.rowsPerPage))


        if (res.data.seo_pages.length > 0) {
          setIsDataFound(true);
          setSeoApi(res.data.seo_pages);
        }
        setTotalCountNumber(res.data.totalSeoRecords);
        setIsApiHitComplete(true);
        oldData = res.data.seo_pages;

        //   console.log(res.data.college_list)
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  useEffect(() => {
    collegeDataApi(seoType);
  }, [seoType]);

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
          ["canonical"]: `https://www.learnerhunt.com/colleges/${selectedObj.slug}`,
          ["changeSlug"]: selectedObj.slug,
          ["collegename"]: value,
        });
        setTwitterDetails({
          ...twitterDetails,
          ["twitterImage"]: `https://learnerhunt-assets.s3.us-east-1.amazonaws.com/${selectedObj.square_img_path}`,
        });
        setOgDetails({
          ...ogDetails,
          ["ogUrl"]: `https://www.learnerhunt.com/colleges/${selectedObj.slug}`,
          ["ogImage"]: `https://learnerhunt-assets.s3.us-east-1.amazonaws.com/${selectedObj.square_img_path}`,
        });
      } else if (type == "title") {
        setFormData({ ...formData, [name]: value });
        setTwitterDetails({ ...twitterDetails, ["twittertitle"]: value });
        setOgDetails({ ...ogDetails, ["ogTitle"]: value });
      } else if (type == "desc") {
        setFormData({ ...formData, [name]: value });
        setTwitterDetails({ ...twitterDetails, ["twitterdescription"]: value });
        setOgDetails({ ...ogDetails, ["ogDescription"]: value });
      } else {
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

  const handleBlogInputChange = (e, group, type = "text") => {
    const { name, value } = e.target;
    // console.log(name,value)
    if (group === "basic") {
      if (type == "select") {
        // console.log(blogApi.)

        const selectedblogObj = blogApi.find((obj) => obj._id == value.value);
        // console.log(selectedblogObj);
        if (selectedblogObj.banner_image == undefined) {
          Swal.fire({
            text: `We could not found banner image of this blog, please upload the banner image before doing the blog SEO.`,
            icon: "error",
            confirmButtonText: "Ok",
          }).then(() => {
            setShowModal(false)
          });
        } else {
          setFormblogData({
            ...formblogData,
            ["canonical"]: `https://www.learnerhunt.com/blog/${selectedblogObj.slug}`,
            ["blogname"]: value,
            ["changeSlug"]: selectedblogObj.slug,
          });
          setTwitterblogDetails({
            ...twitterblogDetails,
            ["twitterImage"]: `https://learnerhunt-assets.s3.us-east-1.amazonaws.com/${selectedblogObj.banner_image}`,
          });
          setOgblogDetails({
            ...ogblogDetails,
            ["ogUrl"]: `https://www.learnerhunt.com/blog/${selectedblogObj.slug}`,
            ["ogImage"]: `https://learnerhunt-assets.s3.us-east-1.amazonaws.com/${selectedblogObj.banner_image}`,
          });
        }

      } else if (type == "title") {
        // console.log("its a titlte with basic");
        setFormblogData({ ...formblogData, [name]: value });
        setTwitterblogDetails({
          ...twitterblogDetails,
          ["twittertitle"]: value,
        });
        setOgblogDetails({ ...ogblogDetails, ["ogTitle"]: value });
      } else if (type == "desc") {
        setFormblogData({ ...formblogData, [name]: value });
        setTwitterblogDetails({
          ...twitterblogDetails,
          ["twitterdescription"]: value,
        });
        setOgblogDetails({ ...ogblogDetails, ["ogDescription"]: value });
      } else {
        setFormblogData({ ...formblogData, [name]: value });
      }
      setErrors({ ...errors, [name]: false });
    } else if (group === "twitter") {
      setTwitterblogDetails({ ...twitterblogDetails, [name]: value });
    } else if (group === "og") {
      setOgblogDetails({ ...ogblogDetails, [name]: value });
    } else if (group === "schemaname") {
      setCustomblogSchema({ ...customblogSchema, [name]: value });
    }
  };
  const handleCourseInputChange = (e, group, type = "text") => {
    const { name, value } = e.target;
    // console.log(name,value)
    if (group === "basic") {
      if (type == "select") {
        const selectedcourseObj = courseApi.find(
          (obj) => obj._id == value.value
        );
        // console.log(selectedcourseObj);
        setFormcourseData({
          ...formcourseData,
          ["canonical"]: `https://www.learnerhunt.com/courses/${selectedcourseObj.slug}`,
          ["coursename"]: value,
          ["changeSlug"]: selectedcourseObj.slug,
        });
        setTwittercourseDetails({
          ...twittercourseDetails,
          ["twitterImage"]: `https://learnerhunt-assets.s3.us-east-1.amazonaws.com/${selectedcourseObj.banner_image}`,
        });
        setOgcourseDetails({
          ...ogcourseDetails,
          ["ogUrl"]: `https://www.learnerhunt.com/courses/${selectedcourseObj.slug}`,
          ["ogImage"]: `https://learnerhunt-assets.s3.us-east-1.amazonaws.com/${selectedcourseObj.banner_image}`,
        });
      } else if (type == "title") {
        // console.log("its a titlte with basic");
        setFormcourseData({ ...formcourseData, [name]: value });
        setTwittercourseDetails({
          ...twittercourseDetails,
          ["twittertitle"]: value,
        });
        setOgcourseDetails({ ...ogcourseDetails, ["ogTitle"]: value });
      } else if (type == "desc") {
        setFormcourseData({ ...formcourseData, [name]: value });
        setTwittercourseDetails({
          ...twittercourseDetails,
          ["twitterdescription"]: value,
        });
        setOgcourseDetails({ ...ogcourseDetails, ["ogDescription"]: value });
      } else {
        setFormcourseData({ ...formcourseData, [name]: value });
      }
      setErrors({ ...errors, [name]: false });
    } else if (group === "twitter") {
      setTwittercourseDetails({ ...twittercourseDetails, [name]: value });
    } else if (group === "og") {
      setOgcourseDetails({ ...ogcourseDetails, [name]: value });
    } else if (group === "schemaname") {
      setCustomcourseSchema({ ...customcourseSchema, [name]: value });
    }
  };
  const handleExamInputChange = (e, group, type = "text") => {
    const { name, value } = e.target;
    // console.log(name,value)
    if (group === "basic") {
      if (type == "select") {
        const selectedexamObj = examApi.find((obj) => obj._id == value.value);
        // console.log(selectedexamObj);
        setFormexamData({
          ...formexamData,
          ["canonical"]: `https://www.learnerhunt.com/exams/${selectedexamObj.slug}`,
          ["examname"]: value,
          ["changeSlug"]: selectedexamObj.slug,
        });
        setTwitterexamDetails({
          ...twitterexamDetails,
          ["twitterImage"]: `https://learnerhunt-assets.s3.us-east-1.amazonaws.com/${selectedexamObj.banner_image}`,
        });
        setOgexamDetails({
          ...ogexamDetails,
          ["ogUrl"]: `https://www.learnerhunt.com/exams/${selectedexamObj.slug}`,
          ["ogImage"]: `https://learnerhunt-assets.s3.us-east-1.amazonaws.com/${selectedexamObj.banner_image}`,
        });
      } else if (type == "title") {
        // console.log("its a titlte with basic");
        setFormexamData({ ...formexamData, [name]: value });
        setTwitterexamDetails({
          ...twitterexamDetails,
          ["twittertitle"]: value,
        });
        setOgexamDetails({ ...ogexamDetails, ["ogTitle"]: value });
      } else if (type == "desc") {
        setFormexamData({ ...formexamData, [name]: value });
        setTwitterexamDetails({
          ...twitterexamDetails,
          ["twitterdescription"]: value,
        });
        setOgexamDetails({ ...ogexamDetails, ["ogDescription"]: value });
      } else {
        setFormexamData({ ...formexamData, [name]: value });
      }
      setErrors({ ...errors, [name]: false });
    } else if (group === "twitter") {
      setTwitterexamDetails({ ...twitterexamDetails, [name]: value });
    } else if (group === "og") {
      setOgexamDetails({ ...ogexamDetails, [name]: value });
    } else if (group === "schemaname") {
      setCustomexamSchema({ ...customexamSchema, [name]: value });
    }
  };

  const handleSaveSEOData = () => {
    if (seoType == 1) {
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
      } else if (formData.keywords.length > 165) {
        // Additional validation if needed
        newErrors.keywords = true;
        Swal.fire({
          title: "Keywords length must be between 1 and 165 characters.",
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
        // console.log(formData, twitterDetails, ogDetails, customSchema);
        // console.log(formData.collegename)
        setIsDataFound(false);
        try {
          const fd = new FormData();
          fd.append("cid", formData.collegename.value);
          fd.append("slug", formData.changeSlug);
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
                collegeDataApi(seoType);
                setFormData({
                  collegename: "",
                  title: "",
                  description: "",
                  keywords: "",
                  canonical: "",
                });
                setTwitterDetails({
                  twitterCreator: "@learnerhunt",
                  twitterSite: "@learnerhunt",
                  twittertitle: "",
                  twitterdescription: "",
                  twitterImage: "",
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
              }).then(() => { });
              // console.log("else part");
            }
            setIsDataFound(true);
            setIsloading(false);
          });
        } catch (error) {
          console.error("Failed to fetch OTP:", error);
        }
        // handleModalClose();
      }
    } else if (seoType == 2) {
      // console.log("blog save");
      const newblogErrors = {};
      if (formblogData.blogname == "") {
        newblogErrors.blogname = true;
        Swal.fire({
          title: "Select blog name",
        });
      }
      if (formblogData.title.trim() === "") {
        newblogErrors.title = true;
        Swal.fire({
          title: "Please enter a title.",
        });
      } else if (formblogData.title.length > 60) {
        // Additional validation if needed
        newblogErrors.title = true;
        Swal.fire({
          title: "Title length must be between 1 and 60 characters.",
        });
      }
      if (formblogData.description.trim() === "") {
        newblogErrors.description = true;
        Swal.fire({
          title: "Please enter a description.",
        });
      } else if (formblogData.description.length > 160) {
        // Additional validation if needed
        newblogErrors.description = true;
        Swal.fire({
          title: "Description length must be between 1 and 160 characters.",
        });
      }
      if (formblogData.keywords.trim() === "") {
        newblogErrors.keywords = true;
        Swal.fire({
          title: "Please enter a keywords.",
        });
      } else if (formblogData.keywords.length > 165) {
        // Additional validation if needed
        newblogErrors.keywords = true;
        Swal.fire({
          title: "Keywords length must be between 1 and 165 characters.",
        });
      }
      if (formblogData.canonical.trim() === "") {
        newblogErrors.canonical = true;
        Swal.fire({
          title: "Please enter a canonical.",
        });
      } else if (formblogData.canonical.length > 265) {
        // Additional validation if needed
        newblogErrors.canonical = true;
        Swal.fire({
          title: "Canonical length must be between 1 and 265 characters.",
        });
      }

      if (customblogSchema.structuredData !== "") {
        try {
          JSON.parse(customblogSchema.structuredData);
        } catch (error) {
          Swal.fire({
            title: "Enter json format.",
          });
          newblogErrors.customSchemaStructuredData = true; // Mark as error if JSON parsing fails
        }
      }
      if (customblogSchema.faqStructuredData !== "") {
        try {
          JSON.parse(customblogSchema.faqStructuredData);
        } catch (error) {
          Swal.fire({
            title: "Enter json format.",
          });
          newblogErrors.customSchemafaqStructuredData = true; // Mark as error if JSON parsing fails
        }
      }
      if (Object.values(newblogErrors).some((error) => error)) {
        // If there are errors, set the errors state
        setblogErrors(newblogErrors);
      } else {
        // If no errors, proceed to save
        // console.log(formData, twitterDetails, ogDetails, customSchema);
        // console.log(formData.collegename)
        setIsDataFound(false);
        const fd = new FormData();
        fd.append("bid", formblogData.blogname.value);
        fd.append("slug", formblogData.changeSlug);
        fd.append("title", formblogData.title);
        fd.append("description", formblogData.description);
        fd.append("keywords", formblogData.keywords);
        fd.append("canonical", formblogData.canonical);
        fd.append("twitter_title", twitterblogDetails.twittertitle);
        fd.append("twitter_description", twitterblogDetails.twitterdescription);
        fd.append("twitter_image", twitterblogDetails.twitterImage);
        fd.append("twitter_creater", twitterblogDetails.twitterCreator);
        fd.append("twitter_site", twitterblogDetails.twitterSite);
        fd.append("og_locale", ogblogDetails.ogLocale);
        fd.append("og_type", ogblogDetails.ogType);
        fd.append("og_title", ogblogDetails.ogTitle);
        fd.append("og_description", ogblogDetails.ogDescription);
        fd.append("og_url", ogblogDetails.ogUrl);
        fd.append("og_image", ogblogDetails.ogImage);
        fd.append("og_image_secure_url", ogblogDetails.ogImageSecureUrl);
        fd.append("og_image_width", ogblogDetails.ogImageWidth || 0);
        fd.append("og_image_height", ogblogDetails.ogImageHeight || 0);
        fd.append("og_image_alt", ogblogDetails.ogImageAlt);
        fd.append("structured_data", customblogSchema.structuredData);
        fd.append("faq_structured_data", customblogSchema.faqStructuredData);

        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/seomanager-blog", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pt")}`,
          },
          method: "POST",
          body: fd,
        }).then(async (response) => {
          // console.log(response);
          if (response.ok) {
            var res = await response.json();
            Swal.fire({
              title: "Success",
              text: `${res.message}`,
              icon: "success",
              confirmButtonText: "Ok",
            }).then(() => {
              setShowModal(false);
              collegeDataApi(seoType);
              setFormblogData({
                blogname: "",
                title: "",
                description: "",
                keywords: "",
                canonical: "",
              });
              setTwitterblogDetails({
                twitterCreator: "@learnerhunt",
                twitterSite: "@learnerhunt",
                twittertitle: "",
                twitterdescription: "",
                twitterImage: "",
              });
              setOgblogDetails({
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

              setCustomblogSchema({
                structuredData: "",
                faqStructuredData: "",
              });
              setblogErrors({
                blogname: false,
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
            }).then(() => { });
            // console.log("else part");
          }
          setIsDataFound(true);
          setIsloading(false);
        });
      }
    } else if (seoType == 3) {
      // console.log("course save");
      const newcourseErrors = {};
      if (formcourseData.coursename == "") {
        newcourseErrors.coursename = true;
        Swal.fire({
          title: "Select course name",
        });
      }
      if (formcourseData.title.trim() === "") {
        newcourseErrors.title = true;
        Swal.fire({
          title: "Please enter a title.",
        });
      } else if (formcourseData.title.length > 60) {
        // Additional validation if needed
        newcourseErrors.title = true;
        Swal.fire({
          title: "Title length must be between 1 and 60 characters.",
        });
      }
      if (formcourseData.description.trim() === "") {
        newcourseErrors.description = true;
        Swal.fire({
          title: "Please enter a description.",
        });
      } else if (formcourseData.description.length > 160) {
        // Additional validation if needed
        newcourseErrors.description = true;
        Swal.fire({
          title: "Description length must be between 1 and 160 characters.",
        });
      }
      if (formcourseData.keywords.trim() === "") {
        newcourseErrors.keywords = true;
        Swal.fire({
          title: "Please enter a keywords.",
        });
      } else if (formcourseData.keywords.length > 165) {
        // Additional validation if needed
        newcourseErrors.keywords = true;
        Swal.fire({
          title: "Keywords length must be between 1 and 165 characters.",
        });
      }
      if (formcourseData.canonical.trim() === "") {
        newcourseErrors.canonical = true;
        Swal.fire({
          title: "Please enter a canonical.",
        });
      } else if (formcourseData.canonical.length > 265) {
        // Additional validation if needed
        newcourseErrors.canonical = true;
        Swal.fire({
          title: "Canonical length must be between 1 and 265 characters.",
        });
      }

      if (customcourseSchema.structuredData !== "") {
        try {
          JSON.parse(customcourseSchema.structuredData);
        } catch (error) {
          Swal.fire({
            title: "Enter json format.",
          });
          newcourseErrors.customSchemaStructuredData = true; // Mark as error if JSON parsing fails
        }
      }
      if (customcourseSchema.faqStructuredData !== "") {
        try {
          JSON.parse(customcourseSchema.faqStructuredData);
        } catch (error) {
          Swal.fire({
            title: "Enter json format.",
          });
          newcourseErrors.customSchemafaqStructuredData = true; // Mark as error if JSON parsing fails
        }
      }
      if (Object.values(newcourseErrors).some((error) => error)) {
        setcourseErrors(newcourseErrors);
      } else {
        setIsDataFound(false);
        const fd = new FormData();
        fd.append("course_id", formcourseData.coursename.value);
        fd.append("slug", formcourseData.changeSlug);
        fd.append("title", formcourseData.title);
        fd.append("description", formcourseData.description);
        fd.append("keywords", formcourseData.keywords);
        fd.append("canonical", formcourseData.canonical);
        fd.append("twitter_title", twittercourseDetails.twittertitle);
        fd.append(
          "twitter_description",
          twittercourseDetails.twitterdescription
        );
        fd.append("twitter_image", twittercourseDetails.twitterImage);
        fd.append("twitter_creater", twittercourseDetails.twitterCreator);
        fd.append("twitter_site", twittercourseDetails.twitterSite);
        fd.append("og_locale", ogcourseDetails.ogLocale);
        fd.append("og_type", ogcourseDetails.ogType);
        fd.append("og_title", ogcourseDetails.ogTitle);
        fd.append("og_description", ogcourseDetails.ogDescription);
        fd.append("og_url", ogcourseDetails.ogUrl);
        fd.append("og_image", ogcourseDetails.ogImage);
        fd.append("og_image_secure_url", ogcourseDetails.ogImageSecureUrl);
        fd.append("og_image_width", ogcourseDetails.ogImageWidth || 0);
        fd.append("og_image_height", ogcourseDetails.ogImageHeight || 0);
        fd.append("og_image_alt", ogcourseDetails.ogImageAlt);
        fd.append("structured_data", customcourseSchema.structuredData);
        fd.append("faq_structured_data", customcourseSchema.faqStructuredData);

        fetch(
          process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/seomanager-course",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pt")}`,
            },
            method: "POST",
            body: fd,
          }
        ).then(async (response) => {
          // console.log(response);
          if (response.ok) {
            var res = await response.json();
            Swal.fire({
              title: "Success",
              text: `${res.message}`,
              icon: "success",
              confirmButtonText: "Ok",
            }).then(() => {
              setShowModal(false);
              collegeDataApi(seoType);
              setFormcourseData({
                coursename: "",
                title: "",
                description: "",
                keywords: "",
                canonical: "",
              });
              setTwittercourseDetails({
                twitterCreator: "@learnerhunt",
                twitterSite: "@learnerhunt",
                twittertitle: "",
                twitterdescription: "",
                twitterImage: "",
              });
              setOgcourseDetails({
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

              setCustomcourseSchema({
                structuredData: "",
                faqStructuredData: "",
              });
              setcourseErrors({
                coursename: false,
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
            }).then(() => { });
            // console.log("else part");
          }
          setIsDataFound(true);
          setIsloading(false);
        });
      }
    } else if (seoType == 4) {
      // console.log("exam save");
      const newexamErrors = {};
      if (formexamData.examname == "") {
        newexamErrors.examname = true;
        Swal.fire({
          title: "Select exam name",
        });
      }
      if (formexamData.title.trim() === "") {
        newexamErrors.title = true;
        Swal.fire({
          title: "Please enter a title.",
        });
      } else if (formexamData.title.length > 60) {
        // Additional validation if needed
        newexamErrors.title = true;
        Swal.fire({
          title: "Title length must be between 1 and 60 characters.",
        });
      }
      if (formexamData.description.trim() === "") {
        newexamErrors.description = true;
        Swal.fire({
          title: "Please enter a description.",
        });
      } else if (formexamData.description.length > 160) {
        // Additional validation if needed
        newexamErrors.description = true;
        Swal.fire({
          title: "Description length must be between 1 and 160 characters.",
        });
      }
      if (formexamData.keywords.trim() === "") {
        newexamErrors.keywords = true;
        Swal.fire({
          title: "Please enter a keywords.",
        });
      } else if (formexamData.keywords.length > 165) {
        // Additional validation if needed
        newexamErrors.keywords = true;
        Swal.fire({
          title: "Keywords length must be between 1 and 165 characters.",
        });
      }
      if (formexamData.canonical.trim() === "") {
        newexamErrors.canonical = true;
        Swal.fire({
          title: "Please enter a canonical.",
        });
      } else if (formexamData.canonical.length > 265) {
        // Additional validation if needed
        newexamErrors.canonical = true;
        Swal.fire({
          title: "Canonical length must be between 1 and 265 characters.",
        });
      }

      if (customexamSchema.structuredData !== "") {
        try {
          JSON.parse(customexamSchema.structuredData);
        } catch (error) {
          Swal.fire({
            title: "Enter json format.",
          });
          newexamErrors.customSchemaStructuredData = true; // Mark as error if JSON parsing fails
        }
      }
      if (customexamSchema.faqStructuredData !== "") {
        try {
          JSON.parse(customexamSchema.faqStructuredData);
        } catch (error) {
          Swal.fire({
            title: "Enter json format.",
          });
          newexamErrors.customSchemafaqStructuredData = true; // Mark as error if JSON parsing fails
        }
      }
      if (Object.values(newexamErrors).some((error) => error)) {
        setexamErrors(newexamErrors);
      } else {
        setIsDataFound(false);
        const fd = new FormData();
        fd.append("exam_id", formexamData.examname.value);
        fd.append("slug", formexamData.changeSlug);
        fd.append("title", formexamData.title);
        fd.append("description", formexamData.description);
        fd.append("keywords", formexamData.keywords);
        fd.append("canonical", formexamData.canonical);
        fd.append("twitter_title", twitterexamDetails.twittertitle);
        fd.append("twitter_description", twitterexamDetails.twitterdescription);
        fd.append("twitter_image", twitterexamDetails.twitterImage);
        fd.append("twitter_creater", twitterexamDetails.twitterCreator);
        fd.append("twitter_site", twitterexamDetails.twitterSite);
        fd.append("og_locale", ogexamDetails.ogLocale);
        fd.append("og_type", ogexamDetails.ogType);
        fd.append("og_title", ogexamDetails.ogTitle);
        fd.append("og_description", ogexamDetails.ogDescription);
        fd.append("og_url", ogexamDetails.ogUrl);
        fd.append("og_image", ogexamDetails.ogImage);
        fd.append("og_image_secure_url", ogexamDetails.ogImageSecureUrl);
        fd.append("og_image_width", ogexamDetails.ogImageWidth || 0);
        fd.append("og_image_height", ogexamDetails.ogImageHeight || 0);
        fd.append("og_image_alt", ogexamDetails.ogImageAlt);
        fd.append("structured_data", customexamSchema.structuredData);
        fd.append("faq_structured_data", customexamSchema.faqStructuredData);

        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/seomanager-exam", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pt")}`,
          },
          method: "POST",
          body: fd,
        }).then(async (response) => {
          // console.log(response);
          if (response.ok) {
            var res = await response.json();
            Swal.fire({
              title: "Success",
              text: `${res.message}`,
              icon: "success",
              confirmButtonText: "Ok",
            }).then(() => {
              setShowModal(false);
              collegeDataApi(seoType);
              setFormexamData({
                examname: "",
                title: "",
                description: "",
                keywords: "",
                canonical: "",
              });
              setTwitterexamDetails({
                twitterCreator: "@learnerhunt",
                twitterSite: "@learnerhunt",
                twittertitle: "",
                twitterdescription: "",
                twitterImage: "",
              });
              setOgexamDetails({
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

              setCustomexamSchema({
                structuredData: "",
                faqStructuredData: "",
              });
              setexamErrors({
                examname: false,
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
            }).then(() => { });
            // console.log("else part");
          }
          setIsDataFound(true);
          setIsloading(false);
        });
      }
    }
  };

  const handleEditSEOData = () => {
    if (seoType == "1") {
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
      } else if (formData.keywords.length > 165) {
        // Additional validation if needed
        newErrors.keywords = true;
        Swal.fire({
          title: "Keywords length must be between 1 and 165 characters.",
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
        // console.log(formData, twitterDetails, ogDetails, customSchema);
        // console.log(formData)
        setIsDataFound(false);

        try {
          const fd = new FormData();
          fd.append("recid", collegeId);
          fd.append("slug", formData.changeSlug);
          fd.append("cid", formData.collegename.value);
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
                collegeDataApi(seoType);
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
              }).then(() => { });
              // console.log("else part");
            }
            setIsDataFound(true);
            setIsloading(false);
          });
        } catch (error) {
          console.error("Failed to fetch OTP:", error);
        }
      }
    } else if (seoType == "2") {
      // console.log("blog save");
      const newblogErrors = {};
      if (formblogData.blogname == "") {
        newblogErrors.blogname = true;
        Swal.fire({
          title: "Select blog name",
        });
      }
      if (formblogData.title.trim() === "") {
        newblogErrors.title = true;
        Swal.fire({
          title: "Please enter a title.",
        });
      } else if (formblogData.title.length > 60) {
        // Additional validation if needed
        newblogErrors.title = true;
        Swal.fire({
          title: "Title length must be between 1 and 60 characters.",
        });
      }
      if (formblogData.description.trim() === "") {
        newblogErrors.description = true;
        Swal.fire({
          title: "Please enter a description.",
        });
      } else if (formblogData.description.length > 160) {
        // Additional validation if needed
        newblogErrors.description = true;
        Swal.fire({
          title: "Description length must be between 1 and 160 characters.",
        });
      }
      if (formblogData.keywords.trim() === "") {
        newblogErrors.keywords = true;
        Swal.fire({
          title: "Please enter a keywords.",
        });
      } else if (formblogData.keywords.length > 165) {
        // Additional validation if needed
        newblogErrors.keywords = true;
        Swal.fire({
          title: "Keywords length must be between 1 and 165 characters.",
        });
      }
      if (formblogData.canonical.trim() === "") {
        newblogErrors.canonical = true;
        Swal.fire({
          title: "Please enter a canonical.",
        });
      } else if (formblogData.canonical.length > 265) {
        // Additional validation if needed
        newblogErrors.canonical = true;
        Swal.fire({
          title: "Canonical length must be between 1 and 265 characters.",
        });
      }

      if (customblogSchema.structuredData !== "") {
        try {
          JSON.parse(customblogSchema.structuredData);
        } catch (error) {
          Swal.fire({
            title: "Enter json format.",
          });
          newblogErrors.customSchemaStructuredData = true; // Mark as error if JSON parsing fails
        }
      }
      if (customblogSchema.faqStructuredData !== "") {
        try {
          JSON.parse(customblogSchema.faqStructuredData);
        } catch (error) {
          Swal.fire({
            title: "Enter json format.",
          });
          newblogErrors.customSchemafaqStructuredData = true; // Mark as error if JSON parsing fails
        }
      }
      if (Object.values(newblogErrors).some((error) => error)) {
        // If there are errors, set the errors state
        setblogErrors(newblogErrors);
      } else {
        setIsDataFound(false);

        try {
          const fd = new FormData();
          fd.append("recid", collegeId);
          fd.append("slug", formblogData.changeSlug);
          fd.append("bid", formblogData.blogname.value);
          fd.append("title", formblogData.title);
          fd.append("description", formblogData.description);
          fd.append("keywords", formblogData.keywords);
          fd.append("canonical", formblogData.canonical);
          fd.append("twitter_title", twitterblogDetails.twittertitle);
          fd.append(
            "twitter_description",
            twitterblogDetails.twitterdescription
          );
          fd.append("twitter_image", twitterblogDetails.twitterImage);
          fd.append("twitter_creater", twitterblogDetails.twitterCreator);
          fd.append("twitter_site", twitterblogDetails.twitterSite);
          fd.append("og_locale", ogblogDetails.ogLocale);
          fd.append("og_type", ogblogDetails.ogType);
          fd.append("og_title", ogblogDetails.ogTitle);
          fd.append("og_description", ogblogDetails.ogDescription);
          fd.append("og_url", ogblogDetails.ogUrl);
          fd.append("og_image", ogblogDetails.ogImage);
          fd.append("og_image_secure_url", ogblogDetails.ogImageSecureUrl);
          fd.append("og_image_width", ogblogDetails.ogImageWidth || 0);
          fd.append("og_image_height", ogblogDetails.ogImageHeight || 0);
          fd.append("og_image_alt", ogblogDetails.ogImageAlt);
          fd.append("structured_data", customblogSchema.structuredData);
          fd.append("faq_structured_data", customblogSchema.faqStructuredData);

          fetch(
            process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/seomanager-blog",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("pt")}`,
              },
              method: "PUT",
              body: fd,
            }
          ).then(async (response) => {
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
                collegeDataApi(seoType);
                setCollegId("");
                setFormblogData({
                  blogname: "",
                  title: "",
                  description: "",
                  keywords: "",
                  canonical: "",
                });
                setTwitterblogDetails({
                  twittertitle: "",
                  twitterdescription: "",
                  twitterImage: "",
                  twitterCreator: "@learnerhunt",
                  twitterSite: "@learnerhunt",
                });
                setOgblogDetails({
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

                setCustomblogSchema({
                  structuredData: "",
                  faqStructuredData: "",
                });
                setblogErrors({
                  blogname: false,
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
              }).then(() => { });
              // console.log("else part");
            }
            setIsDataFound(true);
            setIsloading(false);
          });
        } catch (error) {
          console.error("Failed to fetch OTP:", error);
        }
      }
    } else if (seoType == "3") {
      // console.log("course save");
      const newcourseErrors = {};
      if (formcourseData.coursename == "") {
        newcourseErrors.coursename = true;
        Swal.fire({
          title: "Select course name",
        });
      }
      if (formcourseData.title.trim() === "") {
        newcourseErrors.title = true;
        Swal.fire({
          title: "Please enter a title.",
        });
      } else if (formcourseData.title.length > 60) {
        // Additional validation if needed
        newcourseErrors.title = true;
        Swal.fire({
          title: "Title length must be between 1 and 60 characters.",
        });
      }
      if (formcourseData.description.trim() === "") {
        newcourseErrors.description = true;
        Swal.fire({
          title: "Please enter a description.",
        });
      } else if (formcourseData.description.length > 160) {
        // Additional validation if needed
        newcourseErrors.description = true;
        Swal.fire({
          title: "Description length must be between 1 and 160 characters.",
        });
      }
      if (formcourseData.keywords.trim() === "") {
        newcourseErrors.keywords = true;
        Swal.fire({
          title: "Please enter a keywords.",
        });
      } else if (formcourseData.keywords.length > 165) {
        // Additional validation if needed
        newcourseErrors.keywords = true;
        Swal.fire({
          title: "Keywords length must be between 1 and 165 characters.",
        });
      }
      if (formcourseData.canonical.trim() === "") {
        newcourseErrors.canonical = true;
        Swal.fire({
          title: "Please enter a canonical.",
        });
      } else if (formcourseData.canonical.length > 265) {
        // Additional validation if needed
        newcourseErrors.canonical = true;
        Swal.fire({
          title: "Canonical length must be between 1 and 265 characters.",
        });
      }

      if (customcourseSchema.structuredData !== "") {
        try {
          JSON.parse(customcourseSchema.structuredData);
        } catch (error) {
          Swal.fire({
            title: "Enter json format.",
          });
          newcourseErrors.customSchemaStructuredData = true; // Mark as error if JSON parsing fails
        }
      }
      if (customcourseSchema.faqStructuredData !== "") {
        try {
          JSON.parse(customcourseSchema.faqStructuredData);
        } catch (error) {
          Swal.fire({
            title: "Enter json format.",
          });
          newcourseErrors.customSchemafaqStructuredData = true; // Mark as error if JSON parsing fails
        }
      }
      if (Object.values(newcourseErrors).some((error) => error)) {
        // If there are errors, set the errors state
        setcourseErrors(newcourseErrors);
      } else {
        setIsDataFound(false);

        try {
          const fd = new FormData();
          fd.append("recid", collegeId);
          fd.append("slug", formcourseData.changeSlug);
          fd.append("course_id", formcourseData.coursename.value);
          fd.append("title", formcourseData.title);
          fd.append("description", formcourseData.description);
          fd.append("keywords", formcourseData.keywords);
          fd.append("canonical", formcourseData.canonical);
          fd.append("twitter_title", twittercourseDetails.twittertitle);
          fd.append(
            "twitter_description",
            twittercourseDetails.twitterdescription
          );
          fd.append("twitter_image", twittercourseDetails.twitterImage);
          fd.append("twitter_creater", twittercourseDetails.twitterCreator);
          fd.append("twitter_site", twittercourseDetails.twitterSite);
          fd.append("og_locale", ogcourseDetails.ogLocale);
          fd.append("og_type", ogcourseDetails.ogType);
          fd.append("og_title", ogcourseDetails.ogTitle);
          fd.append("og_description", ogcourseDetails.ogDescription);
          fd.append("og_url", ogcourseDetails.ogUrl);
          fd.append("og_image", ogcourseDetails.ogImage);
          fd.append("og_image_secure_url", ogcourseDetails.ogImageSecureUrl);
          fd.append("og_image_width", ogcourseDetails.ogImageWidth || 0);
          fd.append("og_image_height", ogcourseDetails.ogImageHeight || 0);
          fd.append("og_image_alt", ogcourseDetails.ogImageAlt);
          fd.append("structured_data", customcourseSchema.structuredData);
          fd.append(
            "faq_structured_data",
            customcourseSchema.faqStructuredData
          );

          fetch(
            process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/seomanager-course",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("pt")}`,
              },
              method: "PUT",
              body: fd,
            }
          ).then(async (response) => {
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
                collegeDataApi(seoType);
                setCollegId("");
                setFormcourseData({
                  coursename: "",
                  title: "",
                  description: "",
                  keywords: "",
                  canonical: "",
                });
                setTwittercourseDetails({
                  twittertitle: "",
                  twitterdescription: "",
                  twitterImage: "",
                  twitterCreator: "@learnerhunt",
                  twitterSite: "@learnerhunt",
                });
                setOgcourseDetails({
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

                setCustomcourseSchema({
                  structuredData: "",
                  faqStructuredData: "",
                });
                setcourseErrors({
                  coursename: false,
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
              }).then(() => { });
              // console.log("else part");
            }
            setIsDataFound(true);
            setIsloading(false);
          });
        } catch (error) {
          console.error("Failed to fetch OTP:", error);
        }
      }
    } else if (seoType == "4") {
      // console.log("exam save");
      const newexamErrors = {};
      if (formexamData.examname == "") {
        newexamErrors.examname = true;
        Swal.fire({
          title: "Select exam name",
        });
      }
      if (formexamData.title.trim() === "") {
        newexamErrors.title = true;
        Swal.fire({
          title: "Please enter a title.",
        });
      } else if (formexamData.title.length > 60) {
        // Additional validation if needed
        newexamErrors.title = true;
        Swal.fire({
          title: "Title length must be between 1 and 60 characters.",
        });
      }
      if (formexamData.description.trim() === "") {
        newexamErrors.description = true;
        Swal.fire({
          title: "Please enter a description.",
        });
      } else if (formexamData.description.length > 160) {
        // Additional validation if needed
        newexamErrors.description = true;
        Swal.fire({
          title: "Description length must be between 1 and 160 characters.",
        });
      }
      if (formexamData.keywords.trim() === "") {
        newexamErrors.keywords = true;
        Swal.fire({
          title: "Please enter a keywords.",
        });
      } else if (formexamData.keywords.length > 165) {
        // Additional validation if needed
        newexamErrors.keywords = true;
        Swal.fire({
          title: "Keywords length must be between 1 and 165 characters.",
        });
      }
      if (formexamData.canonical.trim() === "") {
        newexamErrors.canonical = true;
        Swal.fire({
          title: "Please enter a canonical.",
        });
      } else if (formexamData.canonical.length > 265) {
        // Additional validation if needed
        newexamErrors.canonical = true;
        Swal.fire({
          title: "Canonical length must be between 1 and 265 characters.",
        });
      }

      if (customexamSchema.structuredData !== "") {
        try {
          JSON.parse(customexamSchema.structuredData);
        } catch (error) {
          Swal.fire({
            title: "Enter json format.",
          });
          newexamErrors.customSchemaStructuredData = true; // Mark as error if JSON parsing fails
        }
      }
      if (customexamSchema.faqStructuredData !== "") {
        try {
          JSON.parse(customexamSchema.faqStructuredData);
        } catch (error) {
          Swal.fire({
            title: "Enter json format.",
          });
          newexamErrors.customSchemafaqStructuredData = true; // Mark as error if JSON parsing fails
        }
      }
      if (Object.values(newexamErrors).some((error) => error)) {
        // If there are errors, set the errors state
        setexamErrors(newexamErrors);
      } else {
        setIsDataFound(false);

        try {
          const fd = new FormData();
          fd.append("recid", collegeId);
          fd.append("slug", formexamData.changeSlug);
          fd.append("exam_id", formexamData.examname.value);
          fd.append("title", formexamData.title);
          fd.append("description", formexamData.description);
          fd.append("keywords", formexamData.keywords);
          fd.append("canonical", formexamData.canonical);
          fd.append("twitter_title", twitterexamDetails.twittertitle);
          fd.append(
            "twitter_description",
            twitterexamDetails.twitterdescription
          );
          fd.append("twitter_image", twitterexamDetails.twitterImage);
          fd.append("twitter_creater", twitterexamDetails.twitterCreator);
          fd.append("twitter_site", twitterexamDetails.twitterSite);
          fd.append("og_locale", ogexamDetails.ogLocale);
          fd.append("og_type", ogexamDetails.ogType);
          fd.append("og_title", ogexamDetails.ogTitle);
          fd.append("og_description", ogexamDetails.ogDescription);
          fd.append("og_url", ogexamDetails.ogUrl);
          fd.append("og_image", ogexamDetails.ogImage);
          fd.append("og_image_secure_url", ogexamDetails.ogImageSecureUrl);
          fd.append("og_image_width", ogexamDetails.ogImageWidth || 0);
          fd.append("og_image_height", ogexamDetails.ogImageHeight || 0);
          fd.append("og_image_alt", ogexamDetails.ogImageAlt);
          fd.append("structured_data", customexamSchema.structuredData);
          fd.append("faq_structured_data", customexamSchema.faqStructuredData);

          fetch(
            process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/seomanager-exam",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("pt")}`,
              },
              method: "PUT",
              body: fd,
            }
          ).then(async (response) => {
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
                collegeDataApi(seoType);
                setCollegId("");
                setFormexamData({
                  examname: "",
                  title: "",
                  description: "",
                  keywords: "",
                  canonical: "",
                });
                setTwitterexamDetails({
                  twittertitle: "",
                  twitterdescription: "",
                  twitterImage: "",
                  twitterCreator: "@learnerhunt",
                  twitterSite: "@learnerhunt",
                });
                setOgexamDetails({
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

                setCustomexamSchema({
                  structuredData: "",
                  faqStructuredData: "",
                });
                setexamErrors({
                  examname: false,
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
              }).then(() => { });
              // console.log("else part");
            }
            setIsDataFound(true);
            setIsloading(false);
          });
        } catch (error) {
          console.error("Failed to fetch OTP:", error);
        }
      }
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
      const filteredData = oldData.filter(
        (data) =>
          searchKeyword.test(
            seoType == 1
              ? data.college_name.toLowerCase()
              : seoType == 2
                ? data.blog_title.toLowerCase()
                : seoType == 3
                  ? data.course_name.toLowerCase()
                  : seoType == 4
                    ? data.exam_name.toLowerCase()
                    : ""
          )

        // if(seoType == 1){
        //   searchKeyword.test(data.college_name.toLowerCase())
        // }
        //   else if(seoType ==2){
        //     searchKeyword.test(data.blog_name.toLowerCase())
        //   }else if(seoType ==3){
        // searchKeyword.test(data.course_name.toLowerCase())
        //   }else if(seoType ==4){
        // searchKeyword.test(data.exam_name.toLowerCase())
        //   }
      );

      setSeoApi(filteredData);
      setIsDataFound(filteredData.length > 0);
    }
  };

  const handleEdit = (e, id) => {
    setCollegId(id);

    if (seoType == "1") {
      // setIsApiHitComplete(false);
      setIsloading(true);
      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/seomanager/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pt")}`,
        },
      }).then(async (response) => {
        var res = await response.json();
        // console.log(res.data);
        setShowModal(true);

        setFormData({
          collegename: {
            value: res.data[0].college_id,
            label: res.data[0].college_name,
          },
          title: res.data[0].title,
          description: res.data[0].description,
          keywords: res.data[0].keywords,
          canonical: res.data[0].canonical,
          changeSlug: res.data[0].slug,
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
        setIsloading(false);

        // setCollegeApi(res.data.college_list)
      });
    } else if (seoType == "2") {
      setIsloading(true);
      fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/seomanager-blog/" + id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pt")}`,
          },
        }
      ).then(async (response) => {
        var res = await response.json();
        // console.log(res.data);
        setShowModal(true);

        setFormblogData({
          blogname: {
            value: res.data[0].blog_id,
            label: res.data[0].blog_title,
          },
          title: res.data[0].title,
          description: res.data[0].description,
          keywords: res.data[0].keywords,
          canonical: res.data[0].canonical,
          changeSlug: res.data[0].slug,
        });
        setTwitterblogDetails({
          twittertitle: res.data[0].twitter_title,
          twitterdescription: res.data[0].twitter_description,
          twitterImage: res.data[0].twitter_image,
          twitterCreator: res.data[0].twitter_creator || "@learnerhunt",
          twitterSite: res.data[0].twitter_site || "@learnerhunt",
        });
        setOgblogDetails({
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
        setCustomblogSchema({
          structuredData: res.data[0].structured_data,
          faqStructuredData: res.data[0].faq_structured_data,
        });
        setIsloading(false);

        // setCollegeApi(res.data.college_list)
      });
    } else if (seoType == "3") {
      setIsloading(true);
      fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/seomanager-course/" + id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pt")}`,
          },
        }
      ).then(async (response) => {
        var res = await response.json();
        // console.log(res.data);
        setShowModal(true);

        setFormcourseData({
          coursename: {
            value: res.data[0].course_id,
            label: res.data[0].course_name,
          },
          title: res.data[0].title,
          description: res.data[0].description,
          keywords: res.data[0].keywords,
          canonical: res.data[0].canonical,
          changeSlug: res.data[0].slug,
        });
        setTwittercourseDetails({
          twittertitle: res.data[0].twitter_title,
          twitterdescription: res.data[0].twitter_description,
          twitterImage: res.data[0].twitter_image,
          twitterCreator: res.data[0].twitter_creator || "@learnerhunt",
          twitterSite: res.data[0].twitter_site || "@learnerhunt",
        });
        setOgcourseDetails({
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
        setCustomcourseSchema({
          structuredData: res.data[0].structured_data,
          faqStructuredData: res.data[0].faq_structured_data,
        });
        setIsloading(false);

        // setCollegeApi(res.data.college_list)
      });
    } else if (seoType == "4") {
      setIsloading(true);
      fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/seomanager-exam/" + id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pt")}`,
          },
        }
      ).then(async (response) => {
        var res = await response.json();
        // console.log(res.data);
        setShowModal(true);

        setFormexamData({
          examname: {
            value: res.data[0].exam_id,
            label: res.data[0].exam_name,
          },
          title: res.data[0].title,
          description: res.data[0].description,
          keywords: res.data[0].keywords,
          canonical: res.data[0].canonical,
          changeSlug: res.data[0].slug,
        });
        setTwitterexamDetails({
          twittertitle: res.data[0].twitter_title,
          twitterdescription: res.data[0].twitter_description,
          twitterImage: res.data[0].twitter_image,
          twitterCreator: res.data[0].twitter_creator || "@learnerhunt",
          twitterSite: res.data[0].twitter_site || "@learnerhunt",
        });
        setOgexamDetails({
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
        setCustomexamSchema({
          structuredData: res.data[0].structured_data,
          faqStructuredData: res.data[0].faq_structured_data,
        });
        setIsloading(false);

        // setCollegeApi(res.data.college_list)
      });
    }
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
                collegeDataApi(seoType);
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

  const handleSeoChange = (e) => {
    setSeoType(e.target.value);
    setSearchInput("");
    setCurrentPage(1)
    setisFilterApplied(false)
    setSearchValue("")
  };


  const handleRefresh = () => {
    if (isFilterApplied) {
      getSearchedCollegeData();
    } else {
      collegeDataApi(seoType);
    }
  };



  const handlePageChange = (e, page) => {
    setCurrentPage(page)
    collegeDataApi(seoType, page);

  };





  const getSearchedCollegeData = () => {
    setIsApiHitComplete(false);
    setIsDataFound(false);
    let paramName;
    switch (seoType) {
      case 1:
        paramName = 'clgname';
        break;
      case 2:
        paramName = 'blog_title';
        break;
      case 3:
        paramName = 'course_name';
        break;
      case 4:
        paramName = 'exam_name';
        break;
      default:
        paramName = 'clgname';
    }

    fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT +
      `/admin/advance-search-seomanager?${paramName}=${searchValue}&type=${seoType}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pt")}`,
        },
      }
    )
      .then(async (response) => {
        let res = await response.json();
        if (response.status === 429) {
          Swal.fire({
            title: "Error",
            text: res.error,
            icon: "error",
            confirmButtonText: "Ok",
          }).then(() => {
            handleResetFilter();
          });
          setIsApiHitComplete(true);
          return;
        }
        if (res.data?.seo_pages.length > 0) {
          setIsDataFound(true);
          setSeoApi(res.data.seo_pages);
          setTotalCountNumber(res.data.seo_pages.length);
        }
        setIsApiHitComplete(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsApiHitComplete(true);
      });
  };




  const handleShowSearchModal = () => {
    setModalShow(true);
  }

  const handleCloseSearchModal = () => {
    setModalShow(false);
  }

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleApplyFilter = () => {
    setisFilterApplied(true)
    setModalShow()
    getSearchedCollegeData()
  };

  const handleResetFilter = () => {
    setSearchValue("")
    setisFilterApplied(false)
    setisFilterReset(true)
    setModalShow(false)
    collegeDataApi(seoType)
  };



  return (
    <>
      {/* <Button variant="primary" onClick={handleModalShow}>
        Add SEO Data
      </Button> */}

      {/* table get Data */}

      <Tablenav
        TotalCount={{
          Total: (
            <div className="d-flex">

              <h5>
                Total Count :{TotalCountNumber == "" ? "0" : TotalCountNumber}
              </h5>
              <p style={{ marginLeft: "20px", marginRight: "3px" }}> {isFilterApplied && `Applied Filter : `} </p>
              {isFilterApplied && <Stack direction="row" spacing={1}>
                <Chip className="bg-light" label={searchValue} variant="outlined" onDelete={handleResetFilter} />
              </Stack>}
            </div>
          ),
        }}

        Actions={{
          Actions: (
            <>
              <div className="d-flex  justify-content-between align-items-center">
                {!isFilterApplied &&
                  <input
                    type="text"
                    className="form-control"
                    value={searchInput}
                    placeholder="Search..."
                    onChange={handleSearchChange}
                  />
                }
                <FilterModal handleApplyFilter={handleApplyFilter} handleResetFilter={handleResetFilter} handleSearchValueChange={handleSearchValueChange} searchValue={searchValue} filterApplied={isFilterApplied} show={modalShow} handleClose={handleCloseSearchModal} />
                <FormControl
                  variant="standard"
                  sx={{ m: 1, minWidth: 120 }}
                  fullWidth
                >
                  <InputLabel id="demo-simple-select-label">
                    Select the Seo list
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={seoType}
                    label="Select"
                    onChange={(e) => handleSeoChange(e)}
                  >
                    <MenuItem value={1}>College Seo</MenuItem>
                    <MenuItem value={2}>Blog Seo</MenuItem>
                    <MenuItem value={3}>Course Seo</MenuItem>
                    <MenuItem value={4}>Exam Seo</MenuItem>
                  </Select>
                </FormControl>
                {
                  localStorage.getItem('crmrole') === '5' && <Button variant="primary" onClick={handleModalShow}>
                    +
                  </Button>
                }
                <Tooltip title="Refresh">
                  <IconButton
                    aria-label="Refresh"
                    onClick={handleRefresh}
                  >
                    <LoopIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Filter">
                  <IconButton
                    aria-label="Filter"
                  >
                    {/* <FilterAltIcon onClick={handleShowSearchModal} /> */}
                    <FilterAltIcon className={`${isFilterApplied && "text-primary"}`} onClick={handleShowSearchModal} />
                  </IconButton>
                </Tooltip>
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
                {seoType == "1" ? (
                  <th style={{ background: "var(--primary)" }}>College name</th>
                ) : seoType == "2" ? (
                  <th style={{ background: "var(--primary)" }}>Blog Title</th>
                ) : seoType == "3" ? (
                  <th style={{ background: "var(--primary)" }}>Course name</th>
                ) : seoType == "4" ? (
                  <th style={{ background: "var(--primary)" }}>Exam name</th>
                ) : (
                  "Other"
                )}
                <th style={{ background: "var(--primary)" }}>Description</th>
                <th style={{ background: "var(--primary)" }}>Title</th>
                <th style={{ background: "var(--primary)" }}>keyword</th>
                <th style={{ background: "var(--primary)" }}>canonical</th>
                {
                  localStorage.getItem('crmrole') === '5' &&
                  <>
                    <th style={{ background: "var(--primary)" }}>Remove</th>
                    <th style={{ background: "var(--primary)" }}>Edit</th>
                  </>

                }

              </tr>
            </thead>
            <tbody>
              {seoApi.map((clg, i) => {
                // console.log(clg)
                return (
                  <tr key={i}>
                    {seoType == "1" ? (
                      <td
                        style={{ wordWrap: "break-word", whiteSpace: "unset" }}
                      >
                        {clg.college_name}
                      </td>
                    ) : seoType == "2" ? (
                      <td
                        style={{ wordWrap: "break-word", whiteSpace: "unset" }}
                      >
                        {clg.blog_title}
                      </td>
                    ) : seoType == "3" ? (
                      <td
                        style={{ wordWrap: "break-word", whiteSpace: "unset" }}
                      >
                        {clg.course_name}
                      </td>
                    ) : seoType == "4" ? (
                      <td
                        style={{ wordWrap: "break-word", whiteSpace: "unset" }}
                      >
                        {clg.exam_name}
                      </td>
                    ) : (
                      "Other"
                    )}

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
                    {
                      localStorage.getItem('crmrole') === '5' &&
                      <>
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
                      </>

                    }
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

      {seoType == "1" ? (
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
                  <Autocomplete
                    disablePortal
                    options={collegeApi.map((s) => ({
                      value: s._id,
                      label: s.college_name,
                    }))}
                    value={formData.collegename} // Set the value attribute
                    // onChange={(e) => handleInputChange(e, "basic", "select")}
                    onChange={(event, value) =>
                      handleInputChange(
                        { target: { name: "collegename", value: value } },
                        "basic",
                        "select"
                      )
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select College Name"
                        name="collegename" // Set the name attribute
                      // value={formData.collegename}
                      />
                    )}
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
                      onChange={(e) => handleInputChange(e, "basic", "desc")}
                    />
                    <Form.Text className="text-muted">
                      Character length must be 150-160.
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-2">
                  <Form.Group controlId="keywords">
                    <Form.Label
                      className={errors.keywords ? "text-danger" : ""}
                    >
                      Keywords *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="keywords"
                      value={formData.keywords}
                      onChange={(e) => handleInputChange(e, "basic")}
                    />
                    <Form.Text className="text-muted">
                      Character length must be 160-165.
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="changeSlug">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                      type="text"
                      name="changeSlug"
                      value={formData.changeSlug}
                      onChange={(e) => handleInputChange(e, "basic")}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="canonical">
                    <Form.Label
                      className={errors.canonical ? "text-danger" : ""}
                    >
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
                            The twitter:description provides a concise summary
                            or description of the content of the webpage, which
                            can be displayed when the page is shared on Twitter.
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
                            The twitter:creator tag in SEO Twitter tags is used
                            to specify the Twitter username of the content
                            creator or author.
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
                            or language of the content on a webpage for Open
                            Graph (OG) protocol.
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
                            which allows webmasters to specify how content
                            should be presented when shared on social media
                            platforms like Facebook, LinkedIn, and others.
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
                            The og:description provides a brief description of
                            the content of the webpage and is primarily used by
                            social media platforms and other services when a
                            webpage is shared or linked.
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
                            The og:url tag in Open Graph (OG) meta tags is used
                            to specify the canonical URL of the web page.
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
                            should be displayed when a webpage is shared on
                            social media platforms like Twitter.
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
                            purpose to the og:image property but ensures that
                            the image URL is served over a secure connection.
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
                            potentially improve your search engine visibility
                            and enhance the appearance of your search results.
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
                        errors.customSchemafaqStructuredData
                          ? "text-danger"
                          : ""
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
                            pages (SERPs) and improve the chances of appearing
                            in rich results such as rich snippets, FAQ
                            carousels, or voice search results.
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
              <Button
                variant="info"
                disabled={!isDataFound}
                onClick={handleSaveSEOData}
              >
                {isDataFound ? "Save" : "Waiting..."}
              </Button>
            ) : (
              <Button
                variant="info"
                disabled={!isDataFound}
                onClick={handleEditSEOData}
              >
                {isDataFound ? "Edit" : "Waiting..."}
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      ) : seoType == "2" ? (
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
              {collegeId == "" ? "Add Blog Seo Data" : "Edit Blog Seo Data"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col md={12} className="mb-2">
                  <Autocomplete
                    disablePortal
                    options={blogApi.map((s) => ({
                      value: s._id,
                      label: s.blog_title,
                    }))}
                    value={formblogData.blogname} // Set the value attribute
                    // onChange={(e) => handleInputChange(e, "basic", "select")}
                    onChange={(event, value) => {
                      // console.log(value);
                      handleBlogInputChange(
                        { target: { name: "blogname", value: value } },
                        "basic",
                        "select"
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Blog Name"
                        name="blogname" // Set the name attribute
                      // value={formData.collegename}
                      />
                    )}
                  />
                  {/* </Form.Group> */}
                </Col>
              </Row>
              <h3>Basic Details</h3>
              <Row>
                <Col md={4} className="mb-2">
                  <Form.Group controlId="title">
                    <Form.Label
                      className={blogerrors.title ? "text-danger" : ""}
                    >
                      Title *
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="title"
                      value={formblogData.title}
                      onChange={(e) =>
                        handleBlogInputChange(e, "basic", "title")
                      }
                    />
                    <Form.Text className="text-muted">
                      Character length must be 50-60.
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-2">
                  <Form.Group controlId="description">
                    <Form.Label
                      className={blogerrors.description ? "text-danger" : ""}
                    >
                      Description *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      value={formblogData.description}
                      onChange={(e) =>
                        handleBlogInputChange(e, "basic", "desc")
                      }
                    />
                    <Form.Text className="text-muted">
                      Character length must be 150-160.
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-2">
                  <Form.Group controlId="keywords">
                    <Form.Label
                      className={blogerrors.keywords ? "text-danger" : ""}
                    >
                      Keywords *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="keywords"
                      value={formblogData.keywords}
                      onChange={(e) => handleBlogInputChange(e, "basic")}
                    />
                    <Form.Text className="text-muted">
                      Character length must be 160-165.
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="changeSlug">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                      type="text"
                      name="changeSlug"
                      value={formblogData.changeSlug}
                      onChange={(e) => handleBlogInputChange(e, "basic")}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="canonical">
                    <Form.Label
                      className={blogerrors.canonical ? "text-danger" : ""}
                    >
                      Canonical URL *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="canonical"
                      value={formblogData.canonical}
                      onChange={(e) => handleBlogInputChange(e, "basic")}
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
                      value={twitterblogDetails.twittertitle}
                      onChange={(e) => handleBlogInputChange(e, "twitter")}
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
                            The twitter:description provides a concise summary
                            or description of the content of the webpage, which
                            can be displayed when the page is shared on Twitter.
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
                      value={twitterblogDetails.twitterdescription}
                      onChange={(e) => handleBlogInputChange(e, "twitter")}
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
                      title={twitterblogDetails.twitterImage}
                      type="text"
                      name="twitterImage"
                      value={twitterblogDetails.twitterImage}
                      onChange={(e) => handleBlogInputChange(e, "twitter")}
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
                            The twitter:creator tag in SEO Twitter tags is used
                            to specify the Twitter username of the content
                            creator or author.
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
                      value={twitterblogDetails.twitterCreator}
                      disabled
                    // onChange={(e) => handleBlogInputChange(e, "twitter")}
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
                      value={twitterblogDetails.twitterSite}
                      onChange={(e) => handleBlogInputChange(e, "twitter")}
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
                            or language of the content on a webpage for Open
                            Graph (OG) protocol.
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
                      value={ogblogDetails.ogLocale}
                      disabled
                    // onChange={(e) => handleBlogInputChange(e, "og")}
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
                      value={ogblogDetails.ogType}
                      disabled
                    // onChange={(e) => handleBlogInputChange(e, "og")}
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
                            which allows webmasters to specify how content
                            should be presented when shared on social media
                            platforms like Facebook, LinkedIn, and others.
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
                      value={ogblogDetails.ogTitle}
                      onChange={(e) => handleBlogInputChange(e, "og")}
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
                            The og:description provides a brief description of
                            the content of the webpage and is primarily used by
                            social media platforms and other services when a
                            webpage is shared or linked.
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
                      value={ogblogDetails.ogDescription}
                      onChange={(e) => handleBlogInputChange(e, "og")}
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
                            The og:url tag in Open Graph (OG) meta tags is used
                            to specify the canonical URL of the web page.
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
                      value={ogblogDetails.ogUrl}
                      onChange={(e) => handleBlogInputChange(e, "og")}
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
                            should be displayed when a webpage is shared on
                            social media platforms like Twitter.
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
                      value={ogblogDetails.ogImage}
                      onChange={(e) => handleBlogInputChange(e, "og")}
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
                            purpose to the og:image property but ensures that
                            the image URL is served over a secure connection.
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
                      value={ogblogDetails.ogImageSecureUrl}
                      onChange={(e) => handleBlogInputChange(e, "og")}
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
                      value={ogblogDetails.ogImageWidth}
                      onChange={(e) => handleBlogInputChange(e, "og")}
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
                      value={ogblogDetails.ogImageHeight}
                      onChange={(e) => handleBlogInputChange(e, "og")}
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
                      value={ogblogDetails.ogImageAlt}
                      onChange={(e) => handleBlogInputChange(e, "og")}
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
                        blogerrors.customSchemaStructuredData
                          ? "text-danger"
                          : ""
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
                            potentially improve your search engine visibility
                            and enhance the appearance of your search results.
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
                      value={customblogSchema.structuredData}
                      onChange={(e) => handleBlogInputChange(e, "schemaname")}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="faqStructuredData">
                    <Form.Label
                      className={
                        blogerrors.customSchemafaqStructuredData
                          ? "text-danger"
                          : ""
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
                            pages (SERPs) and improve the chances of appearing
                            in rich results such as rich snippets, FAQ
                            carousels, or voice search results.
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
                      value={customblogSchema.faqStructuredData}
                      onChange={(e) => handleBlogInputChange(e, "schemaname")}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {collegeId == "" ? (
              <Button
                variant="info"
                disabled={!isDataFound}
                onClick={handleSaveSEOData}
              >
                {isDataFound ? "Save" : "Waiting..."}
              </Button>
            ) : (
              <Button
                variant="info"
                disabled={!isDataFound}
                onClick={handleEditSEOData}
              >
                {isDataFound ? "Edit" : "Waiting..."}
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      ) : seoType == "3" ? (
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
              {collegeId == "" ? "Add Course Seo Data" : "Edit Course Seo Data"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col md={12} className="mb-2">
                  <Autocomplete
                    disablePortal
                    options={courseApi.map((s) => ({
                      value: s._id,
                      label: s.course_name,
                    }))}
                    value={formcourseData.coursename} // Set the value attribute
                    // onChange={(e) => handleInputChange(e, "basic", "select")}
                    onChange={(event, value) => {
                      // console.log(value);
                      handleCourseInputChange(
                        { target: { name: "coursename", value: value } },
                        "basic",
                        "select"
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Course Name"
                        name="coursename" // Set the name attribute
                      // value={formData.collegename}
                      />
                    )}
                  />
                  {/* </Form.Group> */}
                </Col>
              </Row>
              <h3>Basic Details</h3>
              <Row>
                <Col md={4} className="mb-2">
                  <Form.Group controlId="title">
                    <Form.Label
                      className={courseerrors.title ? "text-danger" : ""}
                    >
                      Title *
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="title"
                      value={formcourseData.title}
                      onChange={(e) =>
                        handleCourseInputChange(e, "basic", "title")
                      }
                    />
                    <Form.Text className="text-muted">
                      Character length must be 50-60.
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-2">
                  <Form.Group controlId="description">
                    <Form.Label
                      className={courseerrors.description ? "text-danger" : ""}
                    >
                      Description *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      value={formcourseData.description}
                      onChange={(e) =>
                        handleCourseInputChange(e, "basic", "desc")
                      }
                    />
                    <Form.Text className="text-muted">
                      Character length must be 150-160.
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-2">
                  <Form.Group controlId="keywords">
                    <Form.Label
                      className={courseerrors.keywords ? "text-danger" : ""}
                    >
                      Keywords *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="keywords"
                      value={formcourseData.keywords}
                      onChange={(e) => handleCourseInputChange(e, "basic")}
                    />
                    <Form.Text className="text-muted">
                      Character length must be 160-165.
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="changeSlug">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                      type="text"
                      name="changeSlug"
                      value={formcourseData.changeSlug}
                      onChange={(e) => handleCourseInputChange(e, "basic")}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="canonical">
                    <Form.Label
                      className={courseerrors.canonical ? "text-danger" : ""}
                    >
                      Canonical URL *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="canonical"
                      value={formcourseData.canonical}
                      onChange={(e) => handleCourseInputChange(e, "basic")}
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
                      value={twittercourseDetails.twittertitle}
                      onChange={(e) => handleCourseInputChange(e, "twitter")}
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
                            The twitter:description provides a concise summary
                            or description of the content of the webpage, which
                            can be displayed when the page is shared on Twitter.
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
                      value={twittercourseDetails.twitterdescription}
                      onChange={(e) => handleCourseInputChange(e, "twitter")}
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
                      title={twittercourseDetails.twitterImage}
                      type="text"
                      name="twitterImage"
                      value={twittercourseDetails.twitterImage}
                      onChange={(e) => handleCourseInputChange(e, "twitter")}
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
                            The twitter:creator tag in SEO Twitter tags is used
                            to specify the Twitter username of the content
                            creator or author.
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
                      value={twittercourseDetails.twitterCreator}
                      disabled
                    // onChange={(e) => handleBlogInputChange(e, "twitter")}
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
                      value={twittercourseDetails.twitterSite}
                      onChange={(e) => handleCourseInputChange(e, "twitter")}
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
                            or language of the content on a webpage for Open
                            Graph (OG) protocol.
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
                      value={ogcourseDetails.ogLocale}
                      disabled
                    // onChange={(e) => handleBlogInputChange(e, "og")}
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
                      value={ogcourseDetails.ogType}
                      disabled
                    // onChange={(e) => handleBlogInputChange(e, "og")}
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
                            which allows webmasters to specify how content
                            should be presented when shared on social media
                            platforms like Facebook, LinkedIn, and others.
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
                      value={ogcourseDetails.ogTitle}
                      onChange={(e) => handleCourseInputChange(e, "og")}
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
                            The og:description provides a brief description of
                            the content of the webpage and is primarily used by
                            social media platforms and other services when a
                            webpage is shared or linked.
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
                      value={ogcourseDetails.ogDescription}
                      onChange={(e) => handleCourseInputChange(e, "og")}
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
                            The og:url tag in Open Graph (OG) meta tags is used
                            to specify the canonical URL of the web page.
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
                      value={ogcourseDetails.ogUrl}
                      onChange={(e) => handleCourseInputChange(e, "og")}
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
                            should be displayed when a webpage is shared on
                            social media platforms like Twitter.
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
                      value={ogcourseDetails.ogImage}
                      onChange={(e) => handleCourseInputChange(e, "og")}
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
                            purpose to the og:image property but ensures that
                            the image URL is served over a secure connection.
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
                      value={ogcourseDetails.ogImageSecureUrl}
                      onChange={(e) => handleCourseInputChange(e, "og")}
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
                      value={ogcourseDetails.ogImageWidth}
                      onChange={(e) => handlecourseInputChange(e, "og")}
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
                      value={ogcourseDetails.ogImageHeight}
                      onChange={(e) => handleCourseInputChange(e, "og")}
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
                      value={ogcourseDetails.ogImageAlt}
                      onChange={(e) => handleCourseInputChange(e, "og")}
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
                        courseerrors.customSchemaStructuredData
                          ? "text-danger"
                          : ""
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
                            potentially improve your search engine visibility
                            and enhance the appearance of your search results.
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
                      value={customcourseSchema.structuredData}
                      onChange={(e) => handleCourseInputChange(e, "schemaname")}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="faqStructuredData">
                    <Form.Label
                      className={
                        courseerrors.customSchemafaqStructuredData
                          ? "text-danger"
                          : ""
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
                            pages (SERPs) and improve the chances of appearing
                            in rich results such as rich snippets, FAQ
                            carousels, or voice search results.
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
                      value={customcourseSchema.faqStructuredData}
                      onChange={(e) => handleCourseInputChange(e, "schemaname")}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {collegeId == "" ? (
              <Button
                variant="info"
                // disabled={!isDataFound}
                onClick={handleSaveSEOData}
              >
                {/* {isDataFound ? "Save" : "Waiting..."} */}
                Save
              </Button>
            ) : (
              <Button
                variant="info"
                disabled={!isDataFound}
                onClick={handleEditSEOData}
              >
                {/* {isDataFound ? "Edit" : "Waiting..."} */}
                Edit
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      ) : seoType == "4" ? (
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
              {collegeId == "" ? "Add Exam Seo Data" : "Edit Exam Seo Data"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col md={12} className="mb-2">
                  <Autocomplete
                    disablePortal
                    options={examApi.map((s) => ({
                      value: s._id,
                      label: s.exam_name,
                    }))}
                    value={formexamData.examname} // Set the value attribute
                    // onChange={(e) => handleInputChange(e, "basic", "select")}
                    onChange={(event, value) => {
                      // console.log(value);
                      handleExamInputChange(
                        { target: { name: "examname", value: value } },
                        "basic",
                        "select"
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select exam Name"
                        name="examname" // Set the name attribute
                      // value={formData.collegename}
                      />
                    )}
                  />
                  {/* </Form.Group> */}
                </Col>
              </Row>
              <h3>Basic Details</h3>
              <Row>
                <Col md={4} className="mb-2">
                  <Form.Group controlId="title">
                    <Form.Label
                      className={examerrors.title ? "text-danger" : ""}
                    >
                      Title *
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="title"
                      value={formexamData.title}
                      onChange={(e) =>
                        handleExamInputChange(e, "basic", "title")
                      }
                    />
                    <Form.Text className="text-muted">
                      Character length must be 50-60.
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-2">
                  <Form.Group controlId="description">
                    <Form.Label
                      className={examerrors.description ? "text-danger" : ""}
                    >
                      Description *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      value={formexamData.description}
                      onChange={(e) =>
                        handleExamInputChange(e, "basic", "desc")
                      }
                    />
                    <Form.Text className="text-muted">
                      Character length must be 150-160.
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-2">
                  <Form.Group controlId="keywords">
                    <Form.Label
                      className={examerrors.keywords ? "text-danger" : ""}
                    >
                      Keywords *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="keywords"
                      value={formexamData.keywords}
                      onChange={(e) => handleExamInputChange(e, "basic")}
                    />
                    <Form.Text className="text-muted">
                      Character length must be 160-165.
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="changeSlug">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                      type="text"
                      name="changeSlug"
                      value={formexamData.changeSlug}
                      onChange={(e) => handleExamInputChange(e, "basic")}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="canonical">
                    <Form.Label
                      className={examerrors.canonical ? "text-danger" : ""}
                    >
                      Canonical URL *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="canonical"
                      value={formexamData.canonical}
                      onChange={(e) => handleExamInputChange(e, "basic")}
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
                      value={twitterexamDetails.twittertitle}
                      onChange={(e) => handleExamInputChange(e, "twitter")}
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
                            The twitter:description provides a concise summary
                            or description of the content of the webpage, which
                            can be displayed when the page is shared on Twitter.
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
                      value={twitterexamDetails.twitterdescription}
                      onChange={(e) => handleExamInputChange(e, "twitter")}
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
                      title={twitterexamDetails.twitterImage}
                      type="text"
                      name="twitterImage"
                      value={twitterexamDetails.twitterImage}
                      onChange={(e) => handleExamInputChange(e, "twitter")}
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
                            The twitter:creator tag in SEO Twitter tags is used
                            to specify the Twitter username of the content
                            creator or author.
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
                      value={twitterexamDetails.twitterCreator}
                      disabled
                    // onChange={(e) => handleBlogInputChange(e, "twitter")}
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
                      value={twitterexamDetails.twitterSite}
                      onChange={(e) => handleExamInputChange(e, "twitter")}
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
                            or language of the content on a webpage for Open
                            Graph (OG) protocol.
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
                      value={ogexamDetails.ogLocale}
                      disabled
                    // onChange={(e) => handleBlogInputChange(e, "og")}
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
                      value={ogexamDetails.ogType}
                      disabled
                    // onChange={(e) => handleBlogInputChange(e, "og")}
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
                            which allows webmasters to specify how content
                            should be presented when shared on social media
                            platforms like Facebook, LinkedIn, and others.
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
                      value={ogexamDetails.ogTitle}
                      onChange={(e) => handleExamInputChange(e, "og")}
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
                            The og:description provides a brief description of
                            the content of the webpage and is primarily used by
                            social media platforms and other services when a
                            webpage is shared or linked.
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
                      value={ogexamDetails.ogDescription}
                      onChange={(e) => handleExamInputChange(e, "og")}
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
                            The og:url tag in Open Graph (OG) meta tags is used
                            to specify the canonical URL of the web page.
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
                      value={ogexamDetails.ogUrl}
                      onChange={(e) => handleExamInputChange(e, "og")}
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
                            should be displayed when a webpage is shared on
                            social media platforms like Twitter.
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
                      value={ogexamDetails.ogImage}
                      onChange={(e) => handleExamInputChange(e, "og")}
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
                            purpose to the og:image property but ensures that
                            the image URL is served over a secure connection.
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
                      value={ogexamDetails.ogImageSecureUrl}
                      onChange={(e) => handleExamInputChange(e, "og")}
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
                      value={ogexamDetails.ogImageWidth}
                      onChange={(e) => handleExamInputChange(e, "og")}
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
                      value={ogexamDetails.ogImageHeight}
                      onChange={(e) => handleExamInputChange(e, "og")}
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
                      value={ogexamDetails.ogImageAlt}
                      onChange={(e) => handleExamInputChange(e, "og")}
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
                        examerrors.customSchemaStructuredData
                          ? "text-danger"
                          : ""
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
                            potentially improve your search engine visibility
                            and enhance the appearance of your search results.
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
                      value={customexamSchema.structuredData}
                      onChange={(e) => handleExamInputChange(e, "schemaname")}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="faqStructuredData">
                    <Form.Label
                      className={
                        examerrors.customSchemafaqStructuredData
                          ? "text-danger"
                          : ""
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
                            pages (SERPs) and improve the chances of appearing
                            in rich results such as rich snippets, FAQ
                            carousels, or voice search results.
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
                      value={customexamSchema.faqStructuredData}
                      onChange={(e) => handleExamInputChange(e, "schemaname")}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {collegeId == "" ? (
              <Button
                variant="info"
                // disabled={!isDataFound}
                onClick={handleSaveSEOData}
              >
                {/* {isDataFound ? "Save" : "Waiting..."} */}
                Save
              </Button>
            ) : (
              <Button
                variant="info"
                disabled={!isDataFound}
                onClick={handleEditSEOData}
              >
                {/* {isDataFound ? "Edit" : "Waiting..."} */}
                Edit
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      ) : (
        "Other"
      )}
      {isDataFound && !isFilterApplied ?
        <div className="pt-3">
          <Stack
            spacing={2}
            className="d-flex justify-content-center align-items-center"
            style={{
              position: 'fixed',
              bottom: 0,
              width: '100%',
              backgroundColor: 'white',
              zIndex: 1000,
              padding: '10px 0',
              boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
            }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </div> : ""
      }
    </>
  );
};

export default SEOManage;