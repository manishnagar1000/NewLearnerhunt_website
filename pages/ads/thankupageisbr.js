
import React from 'react'
import styles from 'styles/thankuisbr.module.css'


function ThankupageIsbr() {
  return (
    <>
    <div className={styles["thankyou-page"]}>
    <div className={styles.banner}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className={styles.logo}>
                <img src="/assets/images/isbr-logo.png" alt="isbr" className={styles["img-responsive"]} title="isbr"/>
                </div>
            <div className={styles["banner-cont"]}>
                
            <div className={styles["boxthank"]}>    
              <div className={styles.pgdm}>Thank You</div>
              <div className={styles["pg-txt"]}>Your enquiry has been submitted <strong style={{color: "#ffce41"}}>Successfully!!!</strong> <br/>Our admission team will get in touch with you shortly.</div>
            </div>  
              
             <div className={styles["duration"]}> An <strong style={{color: "#ffce41"}}>Email/SMS</strong> has been sent to your registered <strong style={{color: "#ffce41"}}>Email ID/Mobile No.</strong> with detailed <br/>instructions to complete your application further.</div>
<br/>
<div className={styles["duration"]}>You may also visit <a href="https://www.learnerhunt.com/colleges/-isbr-international-school-of-business-and-research-" target="_self">https://apply.isbr.in</a> to login and complete your application.</div>
 

              
              
              
                </div>
              
             

            </div>
             
          </div>
        </div>
      </div>
      </div>
      </>
  )
}
export default ThankupageIsbr;