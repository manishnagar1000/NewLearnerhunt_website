import React, { useRef } from "react";
import Classes from "/styles/mbaleads.module.css";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Head from "next/head";
import { psychologyleads } from "/components/Comps/type";
import PsychologyHeroSection from "@/components/Comps/PsychologyHeroSection";

const structureddataOrg = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "Learnerhunt.com/ads/psychology-college-admission",
    "name": "BA Psychology Admission 2024: Know About Subjects & Colleges",
    "description": "Build the Right Skill & Shape Your Future with BA Psychology. Apply now & Start your journey towards becoming a Psychology Expert. Ranked #1 in India. Enroll now",
    "publisher": {
        "@type": "Organization",
        "name": "BA Psychology Admission 2024: Know About Subjects & Colleges"
    },
    "author": {
        "@type": "Organization",
        "name": "BA Psychology Admission 2024: Know About Subjects & Colleges"
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
export default function psychology() {
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
        <title>BA Psychology Admission 2024: Know About Subjects & Colleges</title>
        <meta
          name="description"
          content="Build the Right Skill & Shape Your Future with BA Psychology. Apply now & Start your journey towards becoming a Psychology Expert. Ranked #1 in India. Enroll now"
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
        <PsychologyHeroSection inputRef={inputRef} />

        {/* about us */}

        <div className={Classes["mba-Testimonials"]}>
          <div className={Classes["mba-Testimonials-inner"]}>
            <h3 className={Classes["mba-heading"]}>
            Unlock your potential! Get expert counselor guidance for Psychology Admissions today.
            </h3>
            <div className={Classes["mba-centerlized"]}>
              <div className={Classes["mba-borderLine"]}></div>
            </div>
            <div className="container">
              <p style={{ lineHeight: "150%", textAlign: "center" }}>
              Start your academic journey with Learnerhunt, a gifted consulting corporation situated in Faridabad. With 7 years of experience, we specialize in facilitating admissions for Psychology packages. 
              </p>
              <p style={{ lineHeight: "150%", textAlign: "center" }}>
              Aligned with premiere Psychology institutions across India, we offer first-rate possibilities for aspiring college students. Depending on Psychology admission experts, we provide unfastened counseling and individualized useful resources to each student. 
              </p>
              <p style={{ lineHeight: "150%", textAlign: "center" }}>
              Whether you are interested in undergraduate or graduate programs in Psychology, Learnerhunt is right here that help you. From facilitating online admissions to navigating the front tests and alert last dates, we've given you protection. 
              </p>
              <p style={{ lineHeight: "150%", textAlign: "center" }}>
              Don't permit the traumatic situations of better education to preserve your decrease go back.
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
                Gain exclusive access to top Psychology Admission with Learnerhunt
                comprehensive services, offering personalized guidance, seamless
                admissions, and expert support every step of the way.
              </p>
              <div className="row">
                <div className={Classes.pillouter}>
                  {/* <h3 className="my-2">LLB</h3> */}
                  {psychologyleads["Psychology"].map((c, i) => {
                    return (
                      <div className={Classes.pill}>
                        <a style={{whiteSpace:'break-spaces'}}>{c}</a>
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
              How to Apply in Psychology Programs
            </h3>
            <div className={Classes["mba-centerlized"]}>
              <div className={Classes["mba-borderLine"]}></div>
            </div>
            <div className="container">
              <p style={{ textAlign: "center" }}>
              Start your journey towards Psychology programs by filling out our online application form and submitting your documents.
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
          Learnerhunt proudly partners with 1,000+ leading colleges and universities in India, providing exceptional opportunities for psychology courses, Here’s some popular colleges.
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
              Explore what our students have to say about their experiences with Learnerhunt through their testimonials.
              </p>
              <div className="row">
                <div className="col-md">
                  <div className={Classes["Image-div"]}>
                    {/* <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student1.webp" alt='studentname' width={100} height={100} maxWidth={100}/> */}
                    <p className={Classes["mba-studentname"]}>Rajiv Singhania</p>
                    <p>
                    Learnerhunts mentoring has been invaluable in my psychology journey, providing personalized guidance and knowledge. Their support gave me the confidence to pursue my interest in human behavior. They understood my goals and gave me the right advice. I highly recommend Learnerhunt for academic and career guidance.
                    </p>
                  </div>
                </div>
                <div className="col-md">
                  <div className={Classes["Image-div"]}>
                    {/* <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student2.webp" alt='studentname' width={100} height={100} maxWidth={100}/> */}
                    <p className={Classes["mba-studentname"]}>
                    Vishal Agarwal
                    </p>
                    <p>
                    Enrolling in the psychology application advocated by Learnerhunt became a game-changer for my career. The complete curriculum and hands-on teaching strategies provided me with crucial skills and a better understanding of human behavior. Thank you to Learnerhunt for steering me on this enjoyable academic journey.
                    </p>
                  </div>
                </div>
                <div className="col-md">
                  <div className={Classes["Image-div"]}>
                    {/* <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student3.webp" alt='studentname' width={100} height={100} maxWidth={100}/> */}
                    <p className={Classes["mba-studentname"]}>Yash Bhardwaj</p>
                    <p>
                    Their support gave me the clarity and confidence to pursue my interest in understanding human behavior. Learnerhunts advisors took the time to understand my aspirations and provided advice that fit my goals perfectly. Thank you to Learnerhunt for guiding me on this transformative journey. I would highly recommend their services to anyone seeking professional guidance and support in psychology.

                    </p>
                  </div>
                </div>
                <div className="col-md">
                  <div className={Classes["Image-div"]}>
                    {/* <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student5.webp" alt='studentname' width={100} height={100} maxWidth={100}/> */}
                    <p className={Classes["mba-studentname"]}>
                    Siddharth Jain
                    </p>
                    <p>
                    Enrolling in the psychology application advocated by way of Learnerhunt became a recreation-changer for my career. The complete curriculum and hands-on teaching strategies provided me with crucial skills and better expertise in human behavior. Thank you to Learnerhunt for steering me on this enjoyable academic journey.

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
