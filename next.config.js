/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    webVitalsAttribution: ['CLS','LCP','FCP','FID' ,'TTFB' ,'INP']
  }
  // async redirects() {
  //   return [
  //     {
  //       source: '/404',
  //       destination: '/',
  //       permanent: true,
  //     },
  //     // {
  //     //   source: '/privacy',
  //     //   destination: '/contact-us',
  //     //   permanent: false,
  //     // },
  //     // {
  //     //   source: '/ads/isbr',
  //     //   destination: '/contact-us',
  //     //   permanent: false,
  //     // },
  //   ]
  // },
}

module.exports = nextConfig


