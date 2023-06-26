import React from "react";

const AboutUsPage = () => {
  return (
    <div className="container">
      <div className="row my-4">
        <div className="col-md-8 col-sm-12">
          <h1>About Us</h1>
          <p>
            Learner Hunt is a digital platform for educational career
            counselling, providing detailed information related to educational
            institutions & universities offering Undergraduate Programs, Post
            Graduate Programs, MBBS, and other Professional Courses. It started
            its journey in September 2017 and presently housed at two locations
            in Faridabad (Sector 37 & Mathura road, Sector 11). Over 300+
            Business Schools and universities are registered with us.
          </p>
          <p>
            It is a Division of Decred Digital Services Pvt Ltd. Presently
            mastered to be a storehouse of detailed information to enable the
            selection of the right college & career decision. It holds a wide
            coverage of over 1000 colleges & universities, 150+ courses & more
            than 25 entrance exams.
          </p>
          <p>
            It has an endless list of offers to electrify the aspiring students
            and help them make a reliable decision for the future to follow.
          </p>
          <h4>Our Exceptional services:</h4>
          <ul>
            <li>Accurate guidance for the right courses</li>
            <li>Assisting in admissions & placements</li>
            <li>Varied courses - PGDM, MBA, B.Tech, BBA, BCA & many more</li>
            <li>
              College Locations covered - Delhi NCR, Pune, Mumbai, Bangalore,
              Hyderabad, & many more
            </li>
            <li>Form scholarship</li>
          </ul>
        </div>
        <div className="col-md-4">
          <img
            src="/assets/images/about-us.png"
            className="img-fluid"
            alt="Logo"
            width={400}
            height={400}
          />
        </div>
      </div>
      <div className="mt-20 " style={{ backgroundColor: "#87CEEB4D" }}>
        <div className="row">
          <div className=" col-12 text-center my-4 ">
            <h2 style={{ fontWeight: "bolder" }}>
              <strong>Who are we and what we do</strong>
            </h2>
            <p
              className="text-center mx-auto mt-2"
              style={{ maxWidth: "500px" }}
            >
              We are rapidly increasing educational portal who will provide you
              valueable information,counselling and guidance to help your career
              path wisely
            </p>
          </div>
        </div>
        <div class="row p-2">
          <div className=" col-md-4">
            <div class="card text-center p-4">
              <div style={{ width: "100%" }}>
                <img
                  src="/assets/images/courseimg.png"
                  alt="Card image cap"
                  width={50}
                  height={50}
                />
              </div>
              <div class="card-body">
                <h5 class="card-title">150+ Courses</h5>
                <p class="card-text">
                  Discover the year’s top best course and select the best
                </p>
              </div>
            </div>
          </div>
          <div className=" col-md-4">
            <div class="card text-center p-4">
                <div style={{ width: "100%" }}>
              <img
                src="/assets/images/collegeimg.png"
                alt="Card image cap"
                width={50}
                height={50}
              />
              </div>
              <div class="card-body">
                <h5 class="card-title">1000+ Colleges</h5>
                <p class="card-text">
                Discover the best college with vivid choices
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card text-center p-4">
            <div style={{ width: "100%" }}>
              <img
                src="/assets/images/counsellors.png"
                alt="Card image cap"
                width={50}
                height={50}
              />
              </div>
              <div class="card-body">
                <h5 class="card-title">25 Counsellors</h5>
                <p class="card-text">
                Get counselling from the best counsellors 
                </p>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default AboutUsPage;
