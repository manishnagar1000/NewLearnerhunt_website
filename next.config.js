/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // experimental: {
  //   webVitalsAttribution: ["CLS", "LCP", "FCP", "FID", "TTFB", "INP"],
  // },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: "/",
  //     },
  //   ];
  // },
  async redirects() {
    return [
      {
        source: '/sepratecollege/NA',
        destination: '/',
        permanent: true,
      },
      {
        source: '/sepratecollege/[college]',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/contact@learnerhunt.com',
        destination: '/',
        permanent: true,
      },
      {
        source: '/bml-munjal-university',
        destination: '/',
        permanent: true,
      },
      {
        source: '/dev-bhoomi-uttarakhand-university',
        destination: '/',
        permanent: true,
      },
      {
        source: '/quantum-university',
        destination: '/',
        permanent: true,
      },
      {
        source: '/-dbs-doon-business-school-dehradun',
        destination: '/',
        permanent: true,
      },
      {
        source: '/fortune-institute-of-international-business',
        destination: '/',
        permanent: true,
      },
      {
        source: '/-upes-university-of-petroleum-and-energy-studies',
        destination: '/',
        permanent: true,
      },
      {
        source: '/shoolini-university',
        destination: '/',
        permanent: true,
      },
      {
        source: '/Learnerhunt',
        destination: '/',
        permanent: true,
      },
      {
        source: '/Jaipur-National-University',
        destination: '/',
        permanent: true,
      },
      {
        source: '/St.-Thomas-Management-Institute',
        destination: '/',
        permanent: true,
      },
      {
        source: '/nit-trichy-national-institute-of-technology',
        destination: '/',
        permanent: true,
      },
      {
        source: '/courses/[slug]',
        destination: '/',
        permanent: true,
      },
      {
        source: '/colleges/mitwpu.edu.in/application-process',
        destination: '/',
        permanent: true,
      },
      {
        source: '/colleges/(IIMT-UNIVERSITY)-Indian-Institute-of-Management-and-Technology-',
        destination: '/',
        permanent: true,
      },
      {
        source: '/colleges/[slug]',
        destination: '/',
        permanent: true,
      },
      {
        source: '/exams/Joint-Entrance-Examination-(Main)',
        destination: '/',
        permanent: true,
      },
      {
        source: '/colleges/iilm-university-gurugram',
        destination: '/',
        permanent: true,
      },
      {
        source: '/colleges/sage-university-indore/btech-course',
        destination: '/',
        permanent: true,
      },
      {
        source: '/colleges/narayana-business-school',
        destination: '/',
        permanent: true,
      },
      {
        source: '/colleges/Vivekanand-Business-School',
        destination: '/',
        permanent: true,
      },
      {
        source: '/colleges/Xavier-Institute-of-Management-Entrepreneurship',
        destination: '/',
        permanent: true,
      },
      {
        source: '/colleges/LLOYD-Institute-of-Engineering-and-Technology',
        destination: '/',
        permanent: true,
      },
      {
        source: '/colleges/faculty-of-management-studies-university-of-delhi',
        destination: '/',
        permanent: true,
      },
      {
        source: '/exams/[slug]',
        destination: '/',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/',
        permanent: true,
      },
      {
        source: '/colleges/Manipal-University',
        destination: '/',
        permanent: true,
      },
      {
        source: '/colleges/K-R-MANGALAM-UNIVERSITY',
        destination: '/',
        permanent: true,
      },
      {
        source: '/colleges/ITS-Engineering-College',
        destination: '/',
        permanent: true,
      },
      {
        source: '/colleges/Xavier-Institute-of-Management-Design',
        destination: '/',
        permanent: true,
      },
      {
        source: '/assets/images/footer/footer-image.webp',
        destination: '/',
        permanent: true,
      },
      // {
      //   source: '/assets/images/Learnerhunt-Logo.webp',
      //   destination: '/',
      //   permanent: true,
      // },
      {
        source: '/ndim',
        destination: '/',
        permanent: true,
      },
      {
        source: '/soil-institute-of-management',
        destination: '/',
        permanent: true,
      }
    ]
  },
};

module.exports = nextConfig;
