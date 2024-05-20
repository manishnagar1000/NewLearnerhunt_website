import React, { useRef } from 'react';
import Classes from "/styles/mbaleads.module.css";
import Link from "next/link";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Head from 'next/head';
import BtechHeroSection from '@/components/Comps/BtechHeroSection';
import Chip from '@mui/material/Chip';
import { ugbtechleads } from "/components/Comps/type";

import Stack from '@mui/material/Stack';

const structureddataOrg= {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://www.Learnerhunt.com/ads/btech-bca-bba-college-admission",
  "name": "BCA/BBA/B.TECH Courses: College Admission 2024",
  "description": "Transform your future with BCA, BBA & B.Tech specialization. Elevate your skills in programming, data management, and software development. Enroll now.",
  "publisher": {
      "@type": "Organization",
      "name": "BCA/BBA/B.TECH Courses: College Admission 2024"
  },
  "author": {
      "@type": "Organization",
      "name": "BCA/BBA/B.TECH Courses: College Admission 2024"
  }
  
}

const colleges = [
  {
    name: 'Bennett University',
    image: '/assets/BtechLanding/bennett.jpeg',
  },
  {
    name: 'Sushant University',
    image: '/assets/BtechLanding/sushant.jpeg',
  },
  {
    name: 'Gd Goenka University',
    image: '/assets/BtechLanding/gd.jpeg',
  },
  {
    name: 'IILM University',
    image: '/assets/BtechLanding/iilm.jpeg',
  },
  {
    name: 'K.R Mangalam University',
    image: '/assets/BtechLanding/kr.webp',
  },
];
export default function btechleads() {
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
    <title>
    BCA/BBA/B.TECH Courses: College Admission 2024
        </title>
        <meta
          name="description"
          content="Transform your future with BCA, BBA & B.Tech specialization. Elevate your skills in programming, data management, and software development. Enroll now."
        />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structureddataOrg)}}/>
    </Head>
    <div className={Classes["Mba-body"]}>
      
      <div className={Classes['mba-nav']}>
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
        <p style={{margin:'0px',fontWeight:'700'}}>
                      Sales/Support +91-8860077807
                    </p>
        </div>
      </div>
      <BtechHeroSection inputRef={inputRef}/>
      {/* about us */}
      
      <div className={Classes['mba-Testimonials']}>
      <div className={Classes['mba-Testimonials-inner']}>
          <h3 className={Classes['mba-heading']}>Unlock your potential! Get expert counselor guidance for B.Tech, BBA, and BCA Admissions today.
</h3>
          <div className={Classes['mba-centerlized']}>
          <div className={Classes['mba-borderLine']}></div>
          </div>
          <div className="container">
         <p style={{lineHeight:'150%',textAlign:'center'}}>Start your educational journey with Learnerhunt, a career consulting firm based in Faridabad. We have 7 years of experience, specializing in BBA, B.Tech, and BCA admissions, and are associated with pinnacle BBA, B.Tech, and BCA colleges in India.</p>
        <p style={{lineHeight:'150%',textAlign:'center'}}>Our large network includes 1,000  prestigious faculties and universities nationwide, presenting unprecedented opportunities for potential college students. As satisfactory BBA, B.Tech, and BCA admissions counselors, we provide loose recommendations and personal assistance to each person.</p>
        <p style={{lineHeight:'150%',textAlign:'center'}}>If you’re inquisitive about a BBA program or looking for new specializations, Learnerhunt is right here to help. From facilitating online admissions to navigating BBA entrance assessments and application deadlines, you are included.</p>
       <p style={{lineHeight:'150%',textAlign:'center'}}>Don’t permit the rigors of higher education to hold you back. Join Learnerhunt nowadays and take the first step toward achieving your gaining knowledge of desires.
</p>
       </div>
        </div>
      </div>
       <div className={Classes['mba-weTieup']}>
      <div className={Classes['mba-Testimonials-inner']}>
          <h3 className={Classes['mba-heading']}>Courses & Specializations</h3>
          <div className={Classes['mba-centerlized']}>
          <div className={Classes['mba-borderLine']}></div>
          </div>
          <div className="container">
            <p style={{textAlign:'center'}}>Gain exclusive access to top MBA programs with Learnerhunt comprehensive services, offering personalized guidance, seamless admissions, and expert support every step of the way.</p>
          <div className='row'>
            <div>
            <h3 className='my-2'>BBA</h3>
            {ugbtechleads['BBA'].map((c, i) => {
                          return (
                            <div className={Classes.pill}>
                              <a>{c}</a>
                          </div>
                          );
                        })}
<hr/>

</div>
<div>
            <h3 className='my-2'>B.Tech</h3>
            {ugbtechleads['B.Tech'].map((c, i) => {
                          return (
                            <div className={Classes.pill}>
                              <a>{c}</a>
                          </div>
                          );
                        })}
<hr/>

</div>
<div>
            <h3 className='my-2'>BCA</h3>
            {ugbtechleads['BCA'].map((c, i) => {
                          return (
                            <div className={Classes.pill}>
                              <a>{c}</a>
                          </div>
                          );
                        })}
<hr/>

</div>

          </div>
          </div>




          <div className={Classes["Landing-button"]}>
          <div id="u_content_divider_12" className="u_content_divider v-container-padding-padding" style={{ overflowWrap: 'break-word', padding: '10px' }}>
      <div style={{ textAlign: 'center', lineHeight: 0 }}>
        <div style={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: '#BBBBBB', width: '100%', display: 'inline-block', lineHeight: '1px', height: '0px', verticalAlign: 'middle' }}></div>
      </div>
    </div>
          <div id="u_content_button_8" className="u_content_button v-container-padding-padding" style={{ overflowWrap: 'break-word', padding: '10px' }}>
      <div className="v-text-align" style={{ textAlign: 'center' }}>
        <a href="#" target="_self" className="v-size-width v-line-height v-padding v-button-colors v-border v-border-radius v-font-family v-font-size v-font-weight" style={{ color: '#FFFFFF', backgroundColor: '#950304', borderRadius: '4px', lineHeight: '120%', display: 'inline-block', textDecoration: 'none', textAlign: 'center', padding: '10px 20px', width: 'auto', maxWidth: '100%', wordWrap: 'break-word', fontSize: '21px' }} onClick={focusInput}>
          Apply Now 
        </a>
      </div>
    </div>
    <div id="u_content_divider_12" className="u_content_divider v-container-padding-padding" style={{ overflowWrap: 'break-word', padding: '10px' }}>
      <div style={{ textAlign: 'center', lineHeight: 0 }}>
        <div style={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: '#BBBBBB', width: '100%', display: 'inline-block', lineHeight: '1px', height: '0px', verticalAlign: 'middle' }}></div>
      </div>
    </div>
    </div>
        </div>
      </div>
      <div className={Classes['mba-Testimonials']}>
      <div className={Classes['mba-Testimonials-inner']}>
          <h3 className={Classes['mba-heading']}>How to Apply in B.Tech, BBA, BCA Programs</h3>
          <div className={Classes['mba-centerlized']}>
          <div className={Classes['mba-borderLine']}></div>
          </div>
          <div className="container">
          <p style={{textAlign:'center'}}>Start your journey towards BBA, B.Tech, or BCA programs by filling out our online application form and submitting your documents.</p>

            <div className="row">
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-studentImg']} src="/assets/Landing/diff1.webp" alt='studentname' width={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Register Yourself</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-studentImg']} src="/assets/Landing/diff2.webp" alt='studentname' width={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Verify Via OTP / email</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-studentImg']} src="/assets/Landing/diff3.webp" alt='studentname' width={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Fill Application Form Online</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-studentImg']} src="/assets/Landing/diff4.webp" alt='studentname' width={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Upload Required Documents</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-studentImg']} src="/assets/Landing/diff5.webp" alt='studentname' width={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Pay the Application Fee</p>
                </div>
              </div>
          
            </div>
          </div>
        </div>
        <div className={Classes["Landing-button"]}>
          <div id="u_content_divider_12" className="u_content_divider v-container-padding-padding" style={{ overflowWrap: 'break-word', padding: '10px' }}>
      <div style={{ textAlign: 'center', lineHeight: 0 }}>
        <div style={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: '#BBBBBB', width: '100%', display: 'inline-block', lineHeight: '1px', height: '0px', verticalAlign: 'middle' }}></div>
      </div>
    </div>
          <div id="u_content_button_8" className="u_content_button v-container-padding-padding" style={{ overflowWrap: 'break-word', padding: '10px' }}>
      <div className="v-text-align" style={{ textAlign: 'center' }}>
        <a href="#" target="_self" className="v-size-width v-line-height v-padding v-button-colors v-border v-border-radius v-font-family v-font-size v-font-weight" style={{ color: '#FFFFFF', backgroundColor: '#950304', borderRadius: '4px', lineHeight: '120%', display: 'inline-block', textDecoration: 'none', textAlign: 'center', padding: '10px 20px', width: 'auto', maxWidth: '100%', wordWrap: 'break-word', fontSize: '21px' }} onClick={focusInput}>
          Apply Now 
        </a>
      </div>
    </div>
    <div id="u_content_divider_12" className="u_content_divider v-container-padding-padding" style={{ overflowWrap: 'break-word', padding: '10px' }}>
      <div style={{ textAlign: 'center', lineHeight: 0 }}>
        <div style={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: '#BBBBBB', width: '100%', display: 'inline-block', lineHeight: '1px', height: '0px', verticalAlign: 'middle' }}></div>
      </div>
    </div>
    </div>
      </div>
      <div className={Classes['mba-weTieup']}>
      <h3 className={Classes['mba-heading']}>Associated Colleges & Universities</h3>
          <div className={Classes['mba-centerlized']}>
          <div className={Classes['mba-borderLine']}></div>
          </div>
          
          <p style={{textAlign:'center'}}>Learnerhunt proudly partners with 1,000+ leading colleges and universities in India, providing exceptional opportunities for BBA courses, B.Tech courses, and BCA admissions, Here’s some popular colleges.</p>

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
        <div key={index} className='container'>
          <div className={Classes["Image-div"]}>
            <img className="mba-studentImg" style={{objectFit:'contain'}} src={college.image} alt={college.name} width={100} height={100} />
            {/* <p className="mba-studentname">{college.name}</p> */}
          </div>
        </div>
      ))}
    </Carousel>
          <div className={Classes["Landing-button"]}>
          <div id="u_content_divider_12" className="u_content_divider v-container-padding-padding" style={{ overflowWrap: 'break-word', padding: '10px' }}>
      <div style={{ textAlign: 'center', lineHeight: 0 }}>
        <div style={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: '#BBBBBB', width: '100%', display: 'inline-block', lineHeight: '1px', height: '0px', verticalAlign: 'middle' }}></div>
      </div>
    </div>
          <div id="u_content_button_8" className="u_content_button v-container-padding-padding" style={{ overflowWrap: 'break-word', padding: '10px' }}>
      <div className="v-text-align" style={{ textAlign: 'center' }}>
        <a href="#" target="_self" className="v-size-width v-line-height v-padding v-button-colors v-border v-border-radius v-font-family v-font-size v-font-weight" style={{ color: '#FFFFFF', backgroundColor: '#950304', borderRadius: '4px', lineHeight: '120%', display: 'inline-block', textDecoration: 'none', textAlign: 'center', padding: '10px 20px', width: 'auto', maxWidth: '100%', wordWrap: 'break-word', fontSize: '21px' }} onClick={focusInput}>
          Apply Now 
        </a>
      </div>
    </div>
    <div id="u_content_divider_12" className="u_content_divider v-container-padding-padding" style={{ overflowWrap: 'break-word', padding: '10px' }}>
      <div style={{ textAlign: 'center', lineHeight: 0 }}>
        <div style={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: '#BBBBBB', width: '100%', display: 'inline-block', lineHeight: '1px', height: '0px', verticalAlign: 'middle' }}></div>
      </div>
    </div>
    </div>
      </div>
      <div className={Classes['mba-Testimonials']}>
        <div className={Classes['mba-Testimonials-inner']}>
          <h3 className={Classes['mba-heading']}>Real Story, Real Result</h3>
          <div className={Classes['mba-centerlized']}>
          <div className={Classes['mba-borderLine']}></div>
          </div>
          <div className="container">
            <p style={{textAlign:'center'}}>Explore what our clients have to say about their experiences with Learnerhunt through our testimonials.</p>
            <div className="row">
              
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  {/* <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student1.webp" alt='studentname' width={100} height={100} maxWidth={100}/> */}
                  <p className={Classes['mba-studentname']}>Alex Patel</p>
                  <p>Learnerhunt has certainly changed my BBA admissions! Their guidance has been priceless, making the entire procedure easy and stress-unfastened. What sets them apart is their intensity of expertise and knowledge in BBA admissions; that's unequaled. Their commitment to scholarly success is evident in their commitment to expertise in each man's or woman’s desires and aspirations.
</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  {/* <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student2.webp" alt='studentname' width={100} height={100} maxWidth={100}/> */}
                  <p className={Classes['mba-studentname']}>Ankit Singh</p>
                  <p>However, Lernerhunt’s consulting service was a game changer. The counselor I partnered with provided appropriate guidance based on my interests and goals. Thanks to Learnerhunt, I got into the college of my choice.</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  {/* <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student3.webp" alt='studentname' width={100} height={100} maxWidth={100}/> */}
                  <p className={Classes['mba-studentname']}>Natasha Khan</p>
                  <p>Learnerhunt fulfilled my dream of studying BCA abroad. Their mentors provided practical help at every step, from choosing the right state and college to preparing for visa interviews. Now, I’m so excited for the whole world, and it goes all the way to Learnerhunt!</p>
                </div>
              </div>
              {/* <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student4.webp" alt='studentname' width={100} height={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Ishika Murarka</p>
                  <p>Learnerhunt exceeded my expectations! The team's knowledge of MBA admissions is unmatched. I owe my acceptance to their strategic guidance. Trust them with your aspirations!</p>
                </div>
              </div> */}
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  {/* <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student5.webp" alt='studentname' width={100} height={100} maxWidth={100}/> */}
                  <p className={Classes['mba-studentname']}>Sofia Reddy</p>
                  <p>A BCA direction that Learnerhunt suggested I enroll in proved to be a recreation changer for my career. The nicely rounded curriculum and practical teaching strategies supplied me with crucial abilities and more desirable information on PC hardware. Thank you to Learnerhunt for guiding me in this rewarding instructional adventure.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={Classes["Landing-button"]}>
          <div id="u_content_divider_12" className="u_content_divider v-container-padding-padding" style={{ overflowWrap: 'break-word', padding: '10px' }}>
      <div style={{ textAlign: 'center', lineHeight: 0 }}>
        <div style={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: '#BBBBBB', width: '100%', display: 'inline-block', lineHeight: '1px', height: '0px', verticalAlign: 'middle' }}></div>
      </div>
    </div>
          <div id="u_content_button_8" className="u_content_button v-container-padding-padding" style={{ overflowWrap: 'break-word', padding: '10px' }}>
      <div className="v-text-align" style={{ textAlign: 'center' }}>
        <a href="#" target="_self" className="v-size-width v-line-height v-padding v-button-colors v-border v-border-radius v-font-family v-font-size v-font-weight" style={{ color: '#FFFFFF', backgroundColor: '#950304', borderRadius: '4px', lineHeight: '120%', display: 'inline-block', textDecoration: 'none', textAlign: 'center', padding: '10px 20px', width: 'auto', maxWidth: '100%', wordWrap: 'break-word', fontSize: '21px' }} onClick={focusInput}>
          Apply Now 
        </a>
      </div>
    </div>
    <div id="u_content_divider_12" className="u_content_divider v-container-padding-padding" style={{ overflowWrap: 'break-word', padding: '10px' }}>
      <div style={{ textAlign: 'center', lineHeight: 0 }}>
        <div style={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: '#BBBBBB', width: '100%', display: 'inline-block', lineHeight: '1px', height: '0px', verticalAlign: 'middle' }}></div>
      </div>
    </div>
    </div>
      </div>
      <div className={Classes["mba-footer"]}>
        <p className="mba-footer-para">© 2024 Learnerhunt - <Link href={'/privacy'}>PRIVACY POLICY</Link></p>
      </div>
      <button type="button" className={Classes["npfWidgetButton"]} onClick={focusInput}>Enquire Now!</button>
    </div>
    </>
  );
}
