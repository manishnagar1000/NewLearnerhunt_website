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
          content="https://www.learnerhunt.com/assets/images/Svglogo.svg"
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
          content="https://www.learnerhunt.com/assets/images/Svglogo.svg"
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

        {/* <noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=312254257795473&ev=PageView&noscript=1"
/></noscript> */}
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
