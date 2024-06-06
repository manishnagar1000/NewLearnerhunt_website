import Layout from "@/components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.css";
import Head from "next/head";
// import { useReportWebVitals } from 'next/web-vitals'
export default function App({ Component, pageProps }) {

  // useReportWebVitals((metric) => {
  //   console.log(metric)
  // })

  
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
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
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
          
            gtag('config', 'AW-11197965039');`,
          }}
        ></script>

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
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-11197965039"
        ></script>
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: ` window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'AW-11197965039'); `,
          }}
        />

        {/* zoho chatbot code my number */}
        {/* <script
          defer
          dangerouslySetInnerHTML={{
            __html: `var $zoho=$zoho || {};$zoho.salesiq = $zoho.salesiq || {widgetcode: "siqe16fa7414d6dcdfb80e1bb99062822b5844fde693774110e98a5fe3c02f9f5cf", values:{},ready:function(){}};var d=document;s=d.createElement("script");s.type="text/javascript";s.id="zsiqscript";s.defer=true;s.src="https://salesiq.zohopublic.in/widget";t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t);`,
          }}
          type="text/javascript"
          id="zsiqchat"
        ></script> */}
        {/* talk.to chatbot */}
        <script defer type="text/javascript" dangerouslySetInnerHTML={{
          __html: `
        var Tawk_API=Tawk_API||{ }, Tawk_LoadStart=new Date();
        (function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/6631ec9ca0c6737bd1332c4a/1hspg8hsh';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
})();
`}}>
        </script>


        {/* google clearty of website */}
        {/* vidhi */}
        {/* <script
          defer
          dangerouslySetInnerHTML={{
            __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "m9tbmmk5bx");`,
          }}
        /> */}
        {/* me  */}
          <script
          defer
          dangerouslySetInnerHTML={{
            __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "mjh2w7pwsq");`,
          }}
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

