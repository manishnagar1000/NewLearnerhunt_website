import React from "react";
import Image from "next/image";
import Head from "next/head";


const StructuredDataOrg = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Decred Digital Services Pvt. Ltd.",
    url: "https://www.learnerhunt.com",
    logo: "https://www.learnerhunt.com/assets/images/Logo.webp",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+918860077807",
        contactType: "customer service",
        email: "contact@learnerhunt.com"
      }
    ],
    description: "Learnerhunt is a digital platform for educational career counseling, offering comprehensive information about top colleges and universities in India and abroad that provide undergraduate programs, postgraduate programs, MBBS, and other professional courses. We have over 300 business schools and universities registered with us. We have become a trusted source of detailed information to assist you in making the right college and career decisions."
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Educational Career Counseling",
    description: "Comprehensive educational career counseling services to help you make informed decisions about college and career paths.",
    url: "https://www.learnerhunt.com",
    provider: {
      "@type": "Organization",
      name: "Decred Digital Services Pvt. Ltd.",
      url: "https://www.learnerhunt.com",
      logo: "https://www.learnerhunt.com/assets/images/Logo.webp",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+918860077807",
        contactType: "customer service",
        email: "contact@learnerhunt.com"
      }
    }
  }
]
const AboutUsPage = () => {
  
  return (
    <>
    <Head>
    <title>
    About Us | Premier Educational Career Counseling Platform
        </title>
        <meta
          name="description"
          content="We leading digital platform providing comprehensive information on colleges, universities, courses & career counseling. Trusted by students & professional."
        />
        {/* <!-- Open Graph (OG) Tags --> */}
<meta property="og:title" content="About Us | Premier Educational Career Counseling Platform"/>
<meta property="og:description" content="We leading digital platform providing comprehensive information on colleges, universities, courses & career counseling. Trusted by students & professional."/>
<meta property="og:image" content="https://www.learnerhunt.com/assets/images/ogTag.jpg"/>
<meta property="og:url" content="https://www.learnerhunt.com"/>
<meta property="og:type" content="website"/>
  
  {/* <!-- Twitter Card --> */}
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="About Us | Premier Educational Career Counseling Platform"/>
<meta name="twitter:description" content="We leading digital platform providing comprehensive information on colleges, universities, courses & career counseling. Trusted by students & professional."/>
<meta name="twitter:image" content="https://www.learnerhunt.com/assets/images/Logo.webp"/>
<meta name="twitter:site" content="@learnerhunt"/>
<meta name="twitter:creator" content="@learnerhunt"/>
<script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(StructuredDataOrg),
          }}
        />
    </Head>
    <div className="container">
      <div className="row my-4">
        <div className="col-lg-8 col-sm-12">
          <h1>About Us</h1>
          <p>
          Learner Hunt is a digital platform for educational career counseling, providing detailed information related to educational institutions & universities offering Undergraduate Programs, Postgraduate Programs, MBBS, and other Professional Courses. We are a team of friendly professionals dedicated to helping students like you succeed in their educational journey. Our mission is to make learning easy and enjoyable by providing guidance and support every step of the way. We believe in the power of education to change lives, and we are here to unleash your full potential.
          </p>
          <p> We started our journey in September 2017 and are presently housed at (307A, DLF Centre Point, Sec. 11 Faridabad, Mathura Road). </p>
          <p>
          We are part of Decred Digital Services Pvt. Ltd. Right now, we have mastered detailed information to help you pick the best college and career decisions. With over 1000 colleges and universities, 150+ courses, and advice on 25+ entrance exams, we offer full support for your educational journey.
          </p>
          <p>
          We understand that every student is unique, and we take the time to listen to your individual needs, tailoring our support accordingly. There are endless offers available to electrify prospective students and help them pursue the future and make informed decisions.
          </p>
          <h2>Our Exceptional services:</h2>
          <ul>
            <li>Accurate guidance for the right courses</li>
            <li>Assisting in admissions & placements</li>
            <li>Varied courses - PGDM, MBA, B.Tech, BBA, BCA & many more</li>
            <li>
              College Locations covered - Delhi NCR, Pune, Mumbai, Bangalore,
              Hyderabad, & many more
            </li>
            <li>Scholarship form</li>
          </ul>
        </div>
        <div className="col-lg-4 ">
          <img
            src="/assets/images/about-us/about-us.webp"
            // className="img-fluid"
            alt="Logo"
            width={400}
            height={400}
          />
          {/* <Image
      width={350}
      height={350}
      src="/assets/images/about-us.webp"
      alt="Picture of the art"
      style={{objectFit:"fit"}}
    /> */}
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
             As a rapidly expanding education platform, we are dedicated to providing you with the information you need in education, Counseling, and career guidance to make informed decisions about your future.
            </p>
          </div>
        </div>
        <div className="row p-2">
          <div className=" col-md-4">
            <div className="card text-center p-4">
              <div style={{ width: "100%" }}>
                <img
                  src="/assets/images/about-us/courseimg.webp"
                  alt="Card image cap"
                  width={50}
                  height={50}
                />
              </div>
              <div className="card-body">
                <h3 className="card-title">150+ Courses</h3>
                <p className="card-text">
                We invite you to explore our 150+ courses and take the first steps to unlock your full potential.
                </p>
              </div>
            </div>
          </div>
          <div className=" col-md-4">
            <div className="card text-center p-4">
                <div style={{ width: "100%" }}>
              <img
                src="/assets/images/about-us/collegeimg.webp"
                alt="Card image cap"
                width={50}
                height={50}
              />
              </div>
              <div className="card-body">
                <h3 className="card-title">1000+ Colleges And Universities</h3>
                <p className="card-text">
                We invite you to explore our broad database of 1000+ colleges, and we will be finding the best institution that will help you achieve your academic and career aspirations.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center p-4">
            <div style={{ width: "100%" }}>
              <img
                src="/assets/images/about-us/counsellors.webp"
                alt="Card image cap"
                width={50}
                height={50}
              />
              </div>
              <div className="card-body">
                <h3 className="card-title">50+ Counsellors</h3>
                <p className="card-text">
                Our consultation site is your trusted partner every step of the way. Let us walk you through finding and applying to the perfect college for you.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
    </>
  );
};

export default AboutUsPage;
