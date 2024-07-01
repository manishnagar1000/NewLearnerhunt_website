import React, { Component } from "react";
import Swal from "sweetalert2";
// import { Modal } from "react-bootstrap";
import LoadingSpinner from "./trashcomponent/LoadingSpinner";
// import Tablenav from "../Comps/Tablenav";
import TrashCategoryCard from "./trashcomponent/TrashCategoryCard";
import TrashModal from "./trashcomponent/TrashModal";
// import Styles from "../../styles/trash.module.css";

const data = [
  { id: 1, type: "College", icon: "🎓" },
  { id: 2, type: "Course", icon: "💻" },
  { id: 3, type: "Exam", icon: "📝" },
];

class TrashColleges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      clgList: [],
      isDataFound: false,
      isApiHitComplete: false,
      searchInput: "",
      show: false,
      TotalCountNumber: "",
      dataId: "1",
      username: localStorage.getItem("username"),
      statusAnchorEl: null,
    };
    this.oldData = [];
  }

  getAssetList = () => {
    const { dataId } = this.state;
    let url = "";

    if (dataId == "1") {
      url = "/get-trashed-colleges";
    } else if (dataId == "2") {
      url = "/get-trashed-courses";
    } else if (dataId == "3") {
      url = "/get-trashed-exams";
    }

    this.setState({ isApiHitComplete: false, isDataFound: false });

    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + url, {
      headers: { Authorization: `Bearer ${localStorage.getItem("pt")}` },
    }).then(async (res) => {
      const response = await res.json();
      if (response.data.length > 0) {
        this.setState({
          clgList: response.data,
          isDataFound: true,
          TotalCountNumber: response.data.length,
        });
      }
      this.oldData = response.data;
      this.setState({ isApiHitComplete: true });
    });
  };

  handleSearchChange = (e) => {
    const searchInput = e.target.value;
    this.setState({ searchInput });

    const searchTerm = searchInput.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const searchKeyword = new RegExp(`\\b${searchTerm}\\w*\\b`, "i");

    if (searchInput == "") {
      this.setState({ clgList: this.oldData });
      this.setState({ isDataFound: this.oldData.length > 0 });
    } else {
      const filteredData = this.oldData.filter((data) => {
        if (this.state.dataId == "1") {
          return (
            searchKeyword.test(data.college_name.toLowerCase()) ||
            searchKeyword.test(data.approved_by.toLowerCase()) ||
            searchKeyword.test(data.state.toLowerCase())
          );
        } else if (this.state.dataId == "2") {
          return searchKeyword.test(data.course_name.toLowerCase());
        } else if (this.state.dataId == "3") {
          return searchKeyword.test(data.exam_name.toLowerCase());
        }
        return false;
      });

      this.setState({ clgList: filteredData, isDataFound: filteredData.length > 0 });
    }
  };

  handleRestore = (e, id) => {
    // console.log(id)
    const { dataId } = this.state;
    const url =
      dataId == "1" ? "/admin/restore-clg" :
      dataId == "2" ? "/admin/restore-course" :
      "/admin/restore-exam";

    const formData = new FormData();
    
    formData.append(
      dataId == "1" ? "college_id" :
      dataId == "2" ? "course_id" :
      "exam_id",
      id
    );

    Swal.fire({
      text: dataId == "1" ? "Are you sure you want to restore this college?" :
            dataId == "2" ? "Are you sure you want to restore this course?" :
            "Are you sure you want to restore this exam?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + url, {
          method: "PUT",
          headers: { Authorization: `Bearer ${localStorage.getItem("pt")}` },
          body: formData,
        }).then(async (response) => {
          const res = await response.json();
          if (response.ok) {
            Swal.fire({
              title: "Success",
              text: res.message,
              icon: "success",
              confirmButtonText: "Ok",
            }).then(() => {
              this.setState({ searchInput: "" });
              this.getAssetList();
            });
          } else {
            Swal.fire({
              title: "Error",
              text: res.error,
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        });
      }
    });
  };

  handleModalOpen = (e, dataId) => {
    e.preventDefault();
    this.setState({ show: true, dataId }, () => {
      this.getAssetList();
    });
  };

  render() {
    const { clgList, isDataFound, isApiHitComplete, show, TotalCountNumber, searchInput, dataId } = this.state;
    return (
      <>
        <div className="row">
          {data.map((item) => (
            <TrashCategoryCard
              key={item.id}
              id={item.id}
              type={item.type}
              icon={item.icon}
              handleModalOpen={this.handleModalOpen}
            />
          ))}
        </div>
        <TrashModal
          show={show}
          dataId={dataId}
          clgList={clgList}
          isDataFound={isDataFound}
          isApiHitComplete={isApiHitComplete}
          TotalCountNumber={TotalCountNumber}
          searchInput={searchInput}
          handleSearchChange={this.handleSearchChange}
          handleRestore={this.handleRestore}
          handleClose={() => this.setState({ show: false })}
        />
        <LoadingSpinner isLoading={this.state.isLoading} />
      </>
    );
  }
}

export default TrashColleges;
