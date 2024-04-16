import { useEffect, useState } from "react";
import Classes from "../../styles/blogs.module.css";
import Carousel from "react-multi-carousel";
import Chip from "@mui/material/Chip";
import "react-multi-carousel/lib/styles.css";




export default function index() {
  const collegeType = [
    {
      name: "MBA",
      type: "MBA",
    },
    {
      name: "MCA",
      type: "MCA",
    },

    {
      name: "L.L.B",
      type: "LLB",
    },

    {
      name: "B.com",
      type: "B.com",
    },
    {
      name: "BCA",
      type: "BCA",
    },
    {
      name: "BBA",
      type: "BBA",
    },

    {
      name: "M.COM",
      type: "M.COM",
    },
     {
      name: "MCA",
      type: "MCA",
    },

    {
      name: "L.L.B",
      type: "LLB",
    },

    {
      name: "B.com",
      type: "B.com",
    },
    {
      name: "BCA",
      type: "BCA",
    },
    {
      name: "BBA",
      type: "BBA",
    },

    {
      name: "M.COM",
      type: "M.COM",
    },
  ];
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
      partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
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
    <div className="container">
      <div className="main">
        <div className={Classes["welcome-box"]}>
          <div className={Classes["welcome-box-content"]}>
            <div className="pb-3">
              <h1 className={Classes["h1Tag"]}>Welcome to our blog</h1>
            </div>
            <p>
              Your personal space to feed your curiosity and stay up-to-date
              with accounting, tax, the cloud, and everything that comes with
              it!
            </p>
          </div>
          <div className={Classes["welcome-box-form"]}>
            <form
              role="search"
              method="get"
              action="https://www.leanerhunt.com/blog/"
            >
              <input
                type="text"
                placeholder="Search topics and Keywords"
                name="s"
                id="s"
                className=""
                required=""
              />
              <button type="submit">Search</button>
            </form>
          </div>
          <div className="d-flex justify-content-center">
            <span>Subscribe to our Newsletter*</span>
          </div>
        </div>
        <div className="pt-2">
        <div className={Classes["blogs_main"]}><h2>Categories</h2></div>
        <div className="postion-relative">

        <Carousel
        className={Classes['react-multi-carousel-list']}
         responsive={responsive}
         partialVisbile={false}
          >
            {collegeType.map((college) => {
                return (
                  <Chip
                    key={college.type}
                    // onClick={(e) => handleTabChange(college.type, college.name)}
                    label={college.name}
                    color="primary"
                  />
                );
              })}
          </Carousel>

       
        </div>
        </div>
        <div className={Classes["allCategories"]}>
          <h2 className={Classes["Allh2"]}>
            All Blogs:<span className={Classes["articlesCount"]}>275</span>
          </h2>
        </div>
      </div>
      <div className=" container py-5">
        <div className={`${Classes["bloglist"]} row`}>
          <div className="col-lg-4 col-md-6 col-md-12">
            <div className={`${Classes["card"]} p-0 rounded-0 overlay-img`}>
              <a
                className="text-decoration-none text-reset"
                href="/blog/1099-vs-w2-tax-form"
              >
                <img
                  src="https://snb.thesagenext.com/blog/wp-content/uploads/2024/04/1099-vs-W2.webp"
                  className="card-img-top"
                  alt="1099-vs-w2-tax-form"
                />
              </a>
              <div className={`${Classes["card-body"]} pb-0`}>
                <a className={Classes["card_link"]} href="/blog/1099-vs-w2-tax-form">
                  <h2 className={Classes["card-title"]}>
                    1099 vs W2 (Tax Form): Which is Right for You and ...
                  </h2>
                </a>
                <div className={Classes["card-text"]}>
                  <p>
                    When it comes to employment in the United States, there are
                    two primary classifications: 1099 vs W2. As a freelancer,...
                  </p>
                </div>
                <div className="card-footer bg-transparent text-muted pb-3 small border-0">
                12 / 04 / 2024|
                <a className="text-muted" href="/blog/category/accounting">
                  Accounting
                </a>
                <a className="text-muted" href="/blog/category/tax-preparation">
                  , Tax Preparation
                </a>
              </div>
              </div>
              
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-md-12">
            <div className={`${Classes["card"]} p-0 rounded-0 overlay-img`}>
              <a
                className="text-decoration-none text-reset"
                href="/blog/1099-vs-w2-tax-form"
              >
                <img
                  src="https://snb.thesagenext.com/blog/wp-content/uploads/2024/04/1099-vs-W2.webp"
                  className="card-img-top"
                  alt="1099-vs-w2-tax-form"
                />
              </a>
              <div className={`${Classes["card-body"]} pb-0`}>
                <a className={Classes["card_link"]} href="/blog/1099-vs-w2-tax-form">
                  <h2 className={Classes["card-title"]}>
                    1099 vs W2 (Tax Form): Which is Right for You and ...
                  </h2>
                </a>
                <div className={Classes["card-text"]}>
                  <p>
                    When it comes to employment in the United States, there are
                    two primary classifications: 1099 vs W2. As a freelancer,...
                  </p>
                </div>
                <div className="card-footer bg-transparent text-muted pb-3 small border-0">
                12 / 04 / 2024|
                <a className="text-muted" href="/blog/category/accounting">
                  Accounting
                </a>
                <a className="text-muted" href="/blog/category/tax-preparation">
                  , Tax Preparation
                </a>
              </div>
              </div>
              
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-md-12">
            <div className={`${Classes["card"]} p-0 rounded-0 overlay-img`}>
              <a
                className="text-decoration-none text-reset"
                href="/blog/1099-vs-w2-tax-form"
              >
                <img
                  src="https://snb.thesagenext.com/blog/wp-content/uploads/2024/04/1099-vs-W2.webp"
                  className="card-img-top"
                  alt="1099-vs-w2-tax-form"
                />
              </a>
              <div className={`${Classes["card-body"]} pb-0`}>
                <a className={Classes["card_link"]} href="/blog/1099-vs-w2-tax-form">
                  <h2 className={Classes["card-title"]}>
                    1099 vs W2 (Tax Form): Which is Right for You and ...
                  </h2>
                </a>
                <div className={Classes["card-text"]}>
                  <p>
                    When it comes to employment in the United States, there are
                    two primary classifications: 1099 vs W2. As a freelancer,...
                  </p>
                </div>
                <div className="card-footer bg-transparent text-muted pb-3 small border-0">
                12 / 04 / 2024|
                <a className="text-muted" href="/blog/category/accounting">
                  Accounting
                </a>
                <a className="text-muted" href="/blog/category/tax-preparation">
                  , Tax Preparation
                </a>
              </div>
              </div>
              
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
