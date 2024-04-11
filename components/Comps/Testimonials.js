import React from 'react'
import Classes from "/styles/mbaleads.module.css";

export default function Testimonials() {
  return (
    <div>
        <div className={Classes['mba-Testimonials']}>
        <div className={Classes['mba-Testimonials-inner']}>
          <h3 className={Classes['mba-heading']}>Testimonials</h3>
          <div className={Classes['mba-centerlized']}>
          <div className={Classes['mba-borderLine']}></div>
          </div>
          <div className="container">
            <p style={{textAlign:'center'}}>Explore what our clients have to say about their experiences with Learner Hunt through our testimonials.</p>
            <div className="row">
              
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student1.webp" alt='studentname' width={100} height={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Vishwas Verma </p>
                  <p>Learner Hunt is a game-changer! Their expert guidance made my MBA admission process seamless. I am grateful for their personalized approach and commitment to student success.</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student2.webp" alt='studentname' width={100} height={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Md Kaif </p>
                  <p>Learner Hunt is a game-changer! Their expert guidance made my MBA admission process seamless. I am grateful for their personalized approach and commitment to student success.</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student3.webp" alt='studentname' width={100} height={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Arjun Jaiswal</p>
                  <p>Exceptional service! Learner Hunt provided invaluable insights, helping me secure a spot in a top-tier MBA program. Their dedication to each student sets them apart. Highly recommended!</p>
                </div>
              </div>
              {/* <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student4.webp" alt='studentname' width={100} height={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Ishika Murarka</p>
                  <p>Learner Hunt exceeded my expectations! The team's knowledge of MBA admissions is unmatched. I owe my acceptance to their strategic guidance. Trust them with your aspirations!</p>
                </div>
              </div> */}
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student5.webp" alt='studentname' width={100} height={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Jia Oktey</p>
                  <p>Navigating the complex MBA admission process was a breeze with Learner Hunt. Their support is genuine, and the results speak for themselves. Five stars without a doubt!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  )
}
