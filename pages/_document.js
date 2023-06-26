import { Html, Head, Main, NextScript } from 'next/document'
const structureddataOrg= {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Learnerhunt",
  "alternateName": "Learnerhunt",
  "url": "https://www.learnerhunt.com/",
  "logo": "https://www.learnerhunt.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+918800756846",
    "contactType": "reservations",
    "contactOption": "TollFree",
    "areaServed": "IN",
    "availableLanguage": "en"
  },
  "sameAs": [
    "https://www.facebook.com/learnerhunt/",
    "https://twitter.com/learnerhunt",
    "https://www.instagram.com/learnerhunt/",
    "https://www.youtube.com/channel/UCz4ZKdDFvEfRfXU68FFk8_g",
    "https://in.linkedin.com/company/learnerhunt-com"
  ]
}
export default function Document() {
  return (
    <Html lang="en">
      <Head >
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structureddataOrg)}}/>
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
