
import React from 'react';
import styles from "../styles/qrcode.module.css";


const QRCodeComponent = () => {
  return (
    <section class={styles["learnhunt-app-section"]}>
    <div class="container">
        <div class="row">
            <div class="col-sm-7 col-xs-12">
                <div class={styles["app-cont"]}>
                    <h2>Admission Information<br/>through <span>LEARNERHUNT</span> App</h2>
                    <p>Learnerhunt Info and admission app is here to provide all the admission info and solve related queries.</p>
                    <div class="btn-outer">
                        <a href="https://play.google.com/store/apps/details?id=com.learnerhunt.app" target="_blank" onclick="gtag('event', 'Click', {'event_category': 'APPS', 'event_label': 'Google Play'});"><img src="https://allenwebsite-general.s3.ap-south-1.amazonaws.com/allen-website/allen-new/google-play-icon.png"/></a>
                    </div>
				
                </div>
            </div>
            <div class="col-sm-5 col-xs-12" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
               <img src="/assets/images/footer/qrcode.jpg" alt="QR Code" width={250} height={250} />
            </div>
        </div>
    </div>
</section>
  );
};

export default QRCodeComponent;