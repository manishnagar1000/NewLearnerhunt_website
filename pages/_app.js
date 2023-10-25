import Layout from "@/components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {

  return (
    <>
      <Head>
        <meta
          name="facebook-domain-verification"
          content="dlwg9ck6pstfnxvx0h76eu38irnw2x"
        />

<link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.1/font/bootstrap-icons.min.css"
      integrity="sha512-Oy+sz5W86PK0ZIkawrG0iv7XwWhYecM3exvUtMKNJMekGFJtVAhibhRPTpmyTj8+lJCkmWfnpxKgT2OopquBHA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
        {/* og tag */}
        <meta
          property="og:title"
          content="Learnerhunt: Top Colleges & Universities in India | Explore Courses, Exams, Admissions & Latest News"
        />
        <meta property="og:site_name" content="Learnerhunt" />
        <meta property="og:url" content="https://www.learnerhunt.com" />
        <meta
          property="og:description"
          content="Learnerhunt - The one-stop platform to explore top UG &amp; PG colleges, universities and diploma, certificate courses in India and abroad. Get all the latest education news and more at www.learnerhunt.com"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          // content="https://www.learnerhunt.com/assets/images/Svglogo.svg"
          content="https://www.learnerhunt.com/assets/images/Learnerhunt-Logo.png"

        />

        {/* Twitter Tag */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ Learnerhunt" />
        <meta
          name="twitter:title"
          content="Top Colleges & Universities in India | Explore Courses, Admission"
        />
        <meta
          name="twitter:description"
          content="The one-stop platform to explore top UG & PG colleges, universities and diploma, certificate courses in India and abroad. Get all the latest education news and more at www.learnerhunt.com"
        />
        <meta
          name="twitter:image"
          // content="https://www.learnerhunt.com/assets/images/Svglogo.svg"
          content="https://www.learnerhunt.com/assets/images/Learnerhunt-Logo.png"

        />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-3DV03ZC2QY"
        ></script>
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-3DV03ZC2QY');`,
          }}
        />

<script     
  defer
          dangerouslySetInnerHTML={{
            __html: `  window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'AW-11197965039');`}}>

</script>


        {/*  Meta Pixel Code */}
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}
  (window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '312254257795473');
  fbq('track', 'PageView');`,
          }}
        />
     {/* <!-- Google tag (gtag.js) -->  */}
     <script async src="https://www.googletagmanager.com/gtag/js?id=AW-11197965039"></script>
      <script
      defer
      dangerouslySetInnerHTML={{
      __html:` window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-11197965039'); `}}/>

        {/* <noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=312254257795473&ev=PageView&noscript=1"
/></noscript> */}

  



{/* zoho chatbot code my number */}
<script 
defer
dangerouslySetInnerHTML={{
  __html:`var $zoho=$zoho || {};$zoho.salesiq = $zoho.salesiq || {widgetcode: "siqe16fa7414d6dcdfb80e1bb99062822b5844fde693774110e98a5fe3c02f9f5cf", values:{},ready:function(){}};var d=document;s=d.createElement("script");s.type="text/javascript";s.id="zsiqscript";s.defer=true;s.src="https://salesiq.zohopublic.in/widget";t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t);`
}}
type="text/javascript" id="zsiqchat"></script>


      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
