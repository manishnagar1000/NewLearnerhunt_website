import React, { useRef } from "react";
import Classes from "/styles/mbaleads.module.css";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Head from "next/head";
import { ugllbleads } from "/components/Comps/type";

import Stack from "@mui/material/Stack";
import LlbHeroSection from "@/components/Comps/llbHeroSection";

const structureddataOrg = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "Learnerhunt.com/ads/llb-college-admission",
  "name": "LLB/BA LLB 2024: Discover About Colleges, Admission & Course",
  "description": "Grow Your Careers With LLB/BA LLB & Upgrade your efficiency. Apply Now and start your journey to become legal Advocates, or Legal Professionals, and Enroll now.",
  "publisher": {
      "@type": "Organization",
      "name": "LLB/BA LLB 2024: Discover About Colleges, Admission & Course"
  },
  "author": {
      "@type": "Organization",
      "name": "LLB/BA LLB 2024: Discover About Colleges, Admission & Course"
  }
}

const colleges = [
  {
    name: "Bennett University",
    image: "/assets/BtechLanding/bennett.jpeg",
  },
  {
    name: "Sushant University",
    image: "/assets/BtechLanding/sushant.jpeg",
  },
  {
    name: "Gd Goenka University",
    image: "/assets/BtechLanding/gd.jpeg",
  },
  {
    name: "IILM University",
    image: "/assets/BtechLanding/iilm.jpeg",
  },
  {
    name: "K.R Mangalam University",
    image: "/assets/BtechLanding/kr.webp",
  },
];
export default function llbleads() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const inputRef = useRef(null);

  const focusInput = () => {
    // Focus on the input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <>
      <Head>
        <title>LLB/BA LLB 2024: Discover About Colleges, Admission & Course</title>
        <meta
          name="description"
          content="Grow Your Careers With LLB/BA LLB & Upgrade your efficiency. Apply Now and start your journey to become legal Advocates, or Legal Professionals, and Enroll now."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structureddataOrg),
          }}
        />
      </Head>
      <div className={Classes["Mba-body"]}>
        <div className={Classes["mba-nav"]}>
          <div>
            <img
              loading="lazy"
              // src="/assets/images/Svglogo.svg"
              src="/assets/images/Logo.webp"
              alt="Learnerhunt logo"
              width={176}
              height={55}
            />
          </div>
          <div>
            <p style={{ margin: "0px", fontWeight: "700" }}>
              Sales/Support +91-8860077807
            </p>
          </div>
        </div>
        <LlbHeroSection inputRef={inputRef} />
        {/* about us */}

        <div className={Classes["mba-Testimonials"]}>
          <div className={Classes["mba-Testimonials-inner"]}>
            <h3 className={Classes["mba-heading"]}>
              Unlock your potential! Get expert counselor guidance for LLB
              Admissions today.
            </h3>
            <div className={Classes["mba-centerlized"]}>
              <div className={Classes["mba-borderLine"]}></div>
            </div>
            <div className="container">
              <p style={{ lineHeight: "150%", textAlign: "center" }}>
                Begin your educational journey with Learnerhunt, a reputable
                consulting firm in Faridabad.{" "}
              </p>
              <p style={{ lineHeight: "150%", textAlign: "center" }}>
                With seven years of revel in, we focus on LLB admissions.
                Partnered with pinnacle LLB establishments nationally, we
                provide extraordinary possibilities for college kids.{" "}
              </p>
              <p style={{ lineHeight: "150%", textAlign: "center" }}>
                As LLB admission experts, we provide loose counseling and
                customized help to every pupil. Whether you are inquisitive
                about undergraduate or graduate regulation applications,
                Learnerhunt is right here for you.
              </p>
              <p style={{ lineHeight: "150%", textAlign: "center" }}>
                From helping with online admissions to navigating checks and
                cut-off dates, we have given you included. Don't allow the
                complexities of better schooling to keep you returned.
              </p>
            </div>
          </div>
        </div>
        <div className={Classes["mba-weTieup"]}>
          <div className={Classes["mba-Testimonials-inner"]}>
            <h3 className={Classes["mba-heading"]}>Courses</h3>
            <div className={Classes["mba-centerlized"]}>
              <div className={Classes["mba-borderLine"]}></div>
            </div>
            <div className="container">
              <p style={{ textAlign: "center" }}>
                Gain exclusive access to top LLB Admission with Learnerhunt
                comprehensive services, offering personalized guidance, seamless
                admissions, and expert support every step of the way.
              </p>
              <div className="row">
                <div className={Classes.pillouter}>
                  {/* <h3 className="my-2">LLB</h3> */}
                  {ugllbleads["LLB"].map((c, i) => {
                    return (
                      <div className={Classes.pill}>
                        <a>{c}</a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className={Classes["Landing-button"]}>
              <div
                id="u_content_divider_12"
                className="u_content_divider v-container-padding-padding"
                style={{ overflowWrap: "break-word", padding: "10px" }}
              >
                <div style={{ textAlign: "center", lineHeight: 0 }}>
                  <div
                    style={{
                      borderTopWidth: "1px",
                      borderTopStyle: "solid",
                      borderTopColor: "#BBBBBB",
                      width: "100%",
                      display: "inline-block",
                      lineHeight: "1px",
                      height: "0px",
                      verticalAlign: "middle",
                    }}
                  ></div>
                </div>
              </div>
              <div
                id="u_content_button_8"
                className="u_content_button v-container-padding-padding"
                style={{ overflowWrap: "break-word", padding: "10px" }}
              >
                <div className="v-text-align" style={{ textAlign: "center" }}>
                  <a
                    href="#"
                    target="_self"
                    className="v-size-width v-line-height v-padding v-button-colors v-border v-border-radius v-font-family v-font-size v-font-weight"
                    style={{
                      color: "#FFFFFF",
                      backgroundColor: "#950304",
                      borderRadius: "4px",
                      lineHeight: "120%",
                      display: "inline-block",
                      textDecoration: "none",
                      textAlign: "center",
                      padding: "10px 20px",
                      width: "auto",
                      maxWidth: "100%",
                      wordWrap: "break-word",
                      fontSize: "21px",
                    }}
                    onClick={focusInput}
                  >
                    Apply Now
                  </a>
                </div>
              </div>
              <div
                id="u_content_divider_12"
                className="u_content_divider v-container-padding-padding"
                style={{ overflowWrap: "break-word", padding: "10px" }}
              >
                <div style={{ textAlign: "center", lineHeight: 0 }}>
                  <div
                    style={{
                      borderTopWidth: "1px",
                      borderTopStyle: "solid",
                      borderTopColor: "#BBBBBB",
                      width: "100%",
                      display: "inline-block",
                      lineHeight: "1px",
                      height: "0px",
                      verticalAlign: "middle",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={Classes["mba-Testimonials"]}>
          <div className={Classes["mba-Testimonials-inner"]}>
            <h3 className={Classes["mba-heading"]}>
              How to Apply in LLB Programs
            </h3>
            <div className={Classes["mba-centerlized"]}>
              <div className={Classes["mba-borderLine"]}></div>
            </div>
            <div className="container">
              <p style={{ textAlign: "center" }}>
                Start your journey towards LLB programs by filling out our
                online application form and submitting your documents.
              </p>

              <div className="row">
                <div className="col-md">
                  <div className={Classes["Image-div"]}>
                    <img
                      className={Classes["mba-studentImg"]}
                      src="/assets/Landing/diff1.webp"
                      alt="studentname"
                      width={100}
                      maxWidth={100}
                    />
                    <p className={Classes["mba-studentname"]}>
                      Register Yourself
                    </p>
                  </div>
                </div>
                <div className="col-md">
                  <div className={Classes["Image-div"]}>
                    <img
                      className={Classes["mba-studentImg"]}
                      src="/assets/Landing/diff2.webp"
                      alt="studentname"
                      width={100}
                      maxWidth={100}
                    />
                    <p className={Classes["mba-studentname"]}>
                      Verify Via OTP / email
                    </p>
                  </div>
                </div>
                <div className="col-md">
                  <div className={Classes["Image-div"]}>
                    <img
                      className={Classes["mba-studentImg"]}
                      src="/assets/Landing/diff3.webp"
                      alt="studentname"
                      width={100}
                      maxWidth={100}
                    />
                    <p className={Classes["mba-studentname"]}>
                      Fill Application Form Online
                    </p>
                  </div>
                </div>
                <div className="col-md">
                  <div className={Classes["Image-div"]}>
                    <img
                      className={Classes["mba-studentImg"]}
                      src="/assets/Landing/diff4.webp"
                      alt="studentname"
                      width={100}
                      maxWidth={100}
                    />
                    <p className={Classes["mba-studentname"]}>
                      Upload Required Documents
                    </p>
                  </div>
                </div>
                <div className="col-md">
                  <div className={Classes["Image-div"]}>
                    <img
                      className={Classes["mba-studentImg"]}
                      src="/assets/Landing/diff5.webp"
                      alt="studentname"
                      width={100}
                      maxWidth={100}
                    />
                    <p className={Classes["mba-studentname"]}>
                      Pay the Application Fee
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={Classes["Landing-button"]}>
            <div
              id="u_content_divider_12"
              className="u_content_divider v-container-padding-padding"
              style={{ overflowWrap: "break-word", padding: "10px" }}
            >
              <div style={{ textAlign: "center", lineHeight: 0 }}>
                <div
                  style={{
                    borderTopWidth: "1px",
                    borderTopStyle: "solid",
                    borderTopColor: "#BBBBBB",
                    width: "100%",
                    display: "inline-block",
                    lineHeight: "1px",
                    height: "0px",
                    verticalAlign: "middle",
                  }}
                ></div>
              </div>
            </div>
            <div
              id="u_content_button_8"
              className="u_content_button v-container-padding-padding"
              style={{ overflowWrap: "break-word", padding: "10px" }}
            >
              <div className="v-text-align" style={{ textAlign: "center" }}>
                <a
                  href="#"
                  target="_self"
                  className="v-size-width v-line-height v-padding v-button-colors v-border v-border-radius v-font-family v-font-size v-font-weight"
                  style={{
                    color: "#FFFFFF",
                    backgroundColor: "#950304",
                    borderRadius: "4px",
                    lineHeight: "120%",
                    display: "inline-block",
                    textDecoration: "none",
                    textAlign: "center",
                    padding: "10px 20px",
                    width: "auto",
                    maxWidth: "100%",
                    wordWrap: "break-word",
                    fontSize: "21px",
                  }}
                  onClick={focusInput}
                >
                  Apply Now
                </a>
              </div>
            </div>
            <div
              id="u_content_divider_12"
              className="u_content_divider v-container-padding-padding"
              style={{ overflowWrap: "break-word", padding: "10px" }}
            >
              <div style={{ textAlign: "center", lineHeight: 0 }}>
                <div
                  style={{
                    borderTopWidth: "1px",
                    borderTopStyle: "solid",
                    borderTopColor: "#BBBBBB",
                    width: "100%",
                    display: "inline-block",
                    lineHeight: "1px",
                    height: "0px",
                    verticalAlign: "middle",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className={Classes["mba-weTieup"]}>
          <h3 className={Classes["mba-heading"]}>
            Associated Colleges & Universities
          </h3>
          <div className={Classes["mba-centerlized"]}>
            <div className={Classes["mba-borderLine"]}></div>
          </div>

          <p style={{ textAlign: "center" }}>
            Learnerhunt proudly partners with 1,000+ leading colleges and
            universities in India, providing exceptional opportunities for BBA
            courses, B.Tech courses, and BCA admissions, Here’s some popular
            colleges.
          </p>

          <Carousel
            responsive={responsive}
            swipeable={true}
            draggable={true}
            showDots={false}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="transform 300ms ease-in-out"
            transitionDuration={300}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {colleges.map((college, index) => (
              <div key={index} className="container">
                <div className={Classes["Image-div"]}>
                  <img
                    className="mba-studentImg"
                    style={{ objectFit: "contain" }}
                    src={college.image}
                    alt={college.name}
                    width={100}
                    height={100}
                  />
                  {/* <p className="mba-studentname">{college.name}</p> */}
                </div>
              </div>
            ))}
          </Carousel>
          <div className={Classes["Landing-button"]}>
            <div
              id="u_content_divider_12"
              className="u_content_divider v-container-padding-padding"
              style={{ overflowWrap: "break-word", padding: "10px" }}
            >
              <div style={{ textAlign: "center", lineHeight: 0 }}>
                <div
                  style={{
                    borderTopWidth: "1px",
                    borderTopStyle: "solid",
                    borderTopColor: "#BBBBBB",
                    width: "100%",
                    display: "inline-block",
                    lineHeight: "1px",
                    height: "0px",
                    verticalAlign: "middle",
                  }}
                ></div>
              </div>
            </div>
            <div
              id="u_content_button_8"
              className="u_content_button v-container-padding-padding"
              style={{ overflowWrap: "break-word", padding: "10px" }}
            >
              <div className="v-text-align" style={{ textAlign: "center" }}>
                <a
                  href="#"
                  target="_self"
                  className="v-size-width v-line-height v-padding v-button-colors v-border v-border-radius v-font-family v-font-size v-font-weight"
                  style={{
                    color: "#FFFFFF",
                    backgroundColor: "#950304",
                    borderRadius: "4px",
                    lineHeight: "120%",
                    display: "inline-block",
                    textDecoration: "none",
                    textAlign: "center",
                    padding: "10px 20px",
                    width: "auto",
                    maxWidth: "100%",
                    wordWrap: "break-word",
                    fontSize: "21px",
                  }}
                  onClick={focusInput}
                >
                  Apply Now
                </a>
              </div>
            </div>
            <div
              id="u_content_divider_12"
              className="u_content_divider v-container-padding-padding"
              style={{ overflowWrap: "break-word", padding: "10px" }}
            >
              <div style={{ textAlign: "center", lineHeight: 0 }}>
                <div
                  style={{
                    borderTopWidth: "1px",
                    borderTopStyle: "solid",
                    borderTopColor: "#BBBBBB",
                    width: "100%",
                    display: "inline-block",
                    lineHeight: "1px",
                    height: "0px",
                    verticalAlign: "middle",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className={Classes["mba-Testimonials"]}>
          <div className={Classes["mba-Testimonials-inner"]}>
            <h3 className={Classes["mba-heading"]}>Real Story, Real Result</h3>
            <div className={Classes["mba-centerlized"]}>
              <div className={Classes["mba-borderLine"]}></div>
            </div>
            <div className="container">
              <p style={{ textAlign: "center" }}>
                Explore what our clients have to say about their experiences
                with Learnerhunt through our testimonials.
              </p>
              <div className="row">
                <div className="col-md">
                  <div className={Classes["Image-div"]}>
                    {/* <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student1.webp" alt='studentname' width={100} height={100} maxWidth={100}/> */}
                    <p className={Classes["mba-studentname"]}>Vivek Gupta</p>
                    <p>
                      Learnerhunt’s mentoring services have been invaluable in
                      my journey in psychology. Their personal guidance and
                      expertise impressed and guided me. Their support gave me
                      the confidence to pursue my interest in understanding
                      human behavior.
                    </p>
                  </div>
                </div>
                <div className="col-md">
                  <div className={Classes["Image-div"]}>
                    {/* <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student2.webp" alt='studentname' width={100} height={100} maxWidth={100}/> */}
                    <p className={Classes["mba-studentname"]}>
                      Meera Choudhary
                    </p>
                    <p>
                      Choosing the LLB program recommended by Learnerhunt
                      changed my career path. The broad curriculum and practical
                      approach sharpened my legal skills and broadened my
                      understanding of the law. I am grateful to Learnerhunt for
                      guiding me through this rewarding learning journey.
                    </p>
                  </div>
                </div>
                <div className="col-md">
                  <div className={Classes["Image-div"]}>
                    {/* <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student3.webp" alt='studentname' width={100} height={100} maxWidth={100}/> */}
                    <p className={Classes["mba-studentname"]}>Kavita Jain</p>
                    <p>
                      Their guidance gave me the clarity and confidence to
                      pursue my passion for law. Learnerhunt’s advisors tried to
                      understand my aspirations and provide advice tailored to
                      my simple goals. Sincere thanks go to Lernerhunt for
                      guiding me through this transitional process.{" "}
                    </p>
                  </div>
                </div>
                <div className="col-md">
                  <div className={Classes["Image-div"]}>
                    {/* <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student5.webp" alt='studentname' width={100} height={100} maxWidth={100}/> */}
                    <p className={Classes["mba-studentname"]}>
                      Siddharth Bhatt
                    </p>
                    <p>
                      Choosing the LLB program suggested by Learnerhunt proved
                      to be a pivotal decision in my career planning. The
                      well-designed curriculum, combined with a hands-on
                      learning style, gave me a strong foundation in law.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={Classes["Landing-button"]}>
            <div
              id="u_content_divider_12"
              className="u_content_divider v-container-padding-padding"
              style={{ overflowWrap: "break-word", padding: "10px" }}
            >
              <div style={{ textAlign: "center", lineHeight: 0 }}>
                <div
                  style={{
                    borderTopWidth: "1px",
                    borderTopStyle: "solid",
                    borderTopColor: "#BBBBBB",
                    width: "100%",
                    display: "inline-block",
                    lineHeight: "1px",
                    height: "0px",
                    verticalAlign: "middle",
                  }}
                ></div>
              </div>
            </div>
            <div
              id="u_content_button_8"
              className="u_content_button v-container-padding-padding"
              style={{ overflowWrap: "break-word", padding: "10px" }}
            >
              <div className="v-text-align" style={{ textAlign: "center" }}>
                <a
                  href="#"
                  target="_self"
                  className="v-size-width v-line-height v-padding v-button-colors v-border v-border-radius v-font-family v-font-size v-font-weight"
                  style={{
                    color: "#FFFFFF",
                    backgroundColor: "#950304",
                    borderRadius: "4px",
                    lineHeight: "120%",
                    display: "inline-block",
                    textDecoration: "none",
                    textAlign: "center",
                    padding: "10px 20px",
                    width: "auto",
                    maxWidth: "100%",
                    wordWrap: "break-word",
                    fontSize: "21px",
                  }}
                  onClick={focusInput}
                >
                  Apply Now
                </a>
              </div>
            </div>
            <div
              id="u_content_divider_12"
              className="u_content_divider v-container-padding-padding"
              style={{ overflowWrap: "break-word", padding: "10px" }}
            >
              <div style={{ textAlign: "center", lineHeight: 0 }}>
                <div
                  style={{
                    borderTopWidth: "1px",
                    borderTopStyle: "solid",
                    borderTopColor: "#BBBBBB",
                    width: "100%",
                    display: "inline-block",
                    lineHeight: "1px",
                    height: "0px",
                    verticalAlign: "middle",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className={Classes["mba-footer"]}>
          <p className="mba-footer-para">
            © 2024 Learnerhunt - <Link href={"/privacy"}>PRIVACY POLICY</Link>
          </p>
        </div>
        <button
          type="button"
          className={Classes["npfWidgetButton"]}
          onClick={focusInput}
        >
          Enquire Now!
        </button>
      </div>
    </>
  );
}
