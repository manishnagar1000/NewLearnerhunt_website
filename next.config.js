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
      },
      {
        source: '/colleges/-sushant-university-',
        destination: '/colleges/sushant-university',
        permanent: true,
      },
      {
        source: '/colleges/ndim',
        destination: '/colleges/new-delhi-institute-of-management',
        permanent: true,
      },
      {
        source: '/colleges/international-school-of-business-media-isb-m-pune-',
        destination: '/colleges/international-school-of-business-and-media-isbm-pune',
        permanent: true,
      },
      {
        source: '/colleges/-upes-university-of-petroleum-and-energy-studies',
        destination: '/colleges/university-of-petroleum-and-energy-studies',
        permanent: true,
      },
      {
        source: '/colleges/-dbs-doon-business-school-dehradun',
        destination: '/colleges/doon-business-school-dbs-dehradun',
        permanent: true,
      },
      {
        source: '/colleges/-sushant-university-',
        destination: '/colleges/sushant-university',
        permanent: true,
      },
      {
        source: '/colleges/narayana-business-school-nbs-',
        destination: '/colleges/narayana-business-school-nbs',
        permanent: true,
      },
      {
        source: '/colleges/sandip-foundation-sandip-institute-of-technology-and-research-centre',
        destination: '/colleges/sandip-institute-of-technology-and-research-centre',
        permanent: true,
      },
      {
        source: '/colleges/-itm-information-technology-management-',
        destination: '/colleges/information-technology-management-itm',
        permanent: true,
      },
      {
        source: '/colleges/-isbr-international-school-of-business-and-research-',
        destination: '/colleges/international-school-of-business-and-research-isbr',
        permanent: true,
      },
      {
        source: '/colleges/-isme-international-school-of-management-excellence',
        destination: '/colleges/international-school-of-management-excellence',
        permanent: true,
      },
      {
        source: '/colleges/-iba-indus-business-academy',
        destination: '/colleges/iba-indus-business-academy',
        permanent: true,
      },
      {
        source: '/colleges/calcutta-business-school-cbs-',
        destination: '/colleges/calcutta-business-school-cbs',
        permanent: true,
      },
      {
        source: '/colleges/delhi-school-of-business-',
        destination: '/colleges/delhi-school-of-business',
        permanent: true,
      },
      {
        source: '/colleges/iilm-university-gurugram-',
        destination: '/colleges/iilm-university-gurugram',
        permanent: true,
      },
      {
        source: '/colleges/birla-global-university-',
        destination: '/colleges/birla-global-university',
        permanent: true,
      },
      {
        source: '/colleges/netaji-subhas-enginerring-college-kolkata',
        destination: '/colleges/netaji-subhash-engineering-college-kolkata',
        permanent: true,
      },
      {
        source: '/colleges/indian-institutes-of-management-iim-sambalpur',
        destination: '/colleges/indian-institutes-of-management-sambalpur',
        permanent: true,
      },
      {
        source: '/colleges/mangalmay-group-of-institution-noida-',
        destination: '/colleges/mangalmay-group-of-institution-noida',
        permanent: true,
      },
      {
        source: '/colleges/aachi-institute-of-management-and-entrepreneurial-development-chennai',
        destination: '/colleges/aachi-business-school-chennai',
        permanent: true,
      },
      {
        source: '/colleges/marathwada-mitra-mandals-institute-of-management-education-research-and-training-',
        destination: '/colleges/institute-of-management-education-research-and-training',
        permanent: true,
      },
      {
        source: '/colleges/g-h-raisoni-foundation-society-g-h-raisoni-school-of-management-',
        destination: '/colleges/g-h-raisoni-college-of-business-management',
        permanent: true,
      },
      {
        source: '/colleges/jankidevi-bajaj-institute-of-management-studies-mumbai-jdbims-',
        destination: '/colleges/jankidevi-bajaj-institute-of-management-studies-mumbai',
        permanent: true,
      },
      {
        source: '/colleges/vishwa-vishwani-institute-of-systems-management-secunderabad',
        destination: '/colleges/vishwa-vishwani-institute-of-systems-and-management-hyderabad',
        permanent: true,
      },
      {
        source: '/colleges/poddar-group-of-institutions-',
        destination: '/colleges/poddar-group-of-institutions',
        permanent: true,
      },
      {
        source: '/colleges/dhole-patil-college-of-engineering-dpes-',
        destination: '/colleges/dhole-patil-college-of-engineering-dpes',
        permanent: true,
      },
      {
        source: '/colleges/-isms-international-school-of-management-studies-sankalp-business-school-pune',
        destination: '/colleges/isms-sankalp-business-school-pune',
        permanent: true,
      },
      {
        source: '/colleges/-indian-academy-degree-college-autonomous',
        destination: '/colleges/indian-academy-degree-college-autonomous',
        permanent: true,
      },
      {
        source: '/colleges/icfai-business-school-ibs-gurgaon-india-college',
        destination: '/colleges/icfai-business-school-ibs-gurgaon',
        permanent: true,
      },
      {
        source: '/colleges/college-of-engineering-pune',
        destination: '/colleges/coep-technological-university',
        permanent: true,
      },
      {
        source: '/colleges/harikisan-jajoo-education-sanstha-college-of-management-and-computer-science-',
        destination: '/colleges/harikisan-jajoo-education-sanstha-college-of-management-and-computer-science',
        permanent: true,
      },
      {
        source: '/colleges/arihant-institute-of-business-management-bawdhan',
        destination: '/colleges/arihant-institute-of-business-management-bavdhan',
        permanent: true,
      },
      {
        source: '/colleges/-rcm-regional-college-of-management',
        destination: '/colleges/rcm-regional-college-of-management',
        permanent: true,
      },
      {
        source: '/colleges/asian-business-school-abs-noida-',
        destination: '/colleges/asian-business-school-abs-noida',
        permanent: true,
      },
      {
        source: '/colleges/sies-college-of-management-studies-mumbai-',
        destination: '/colleges/sies-college-of-management-studies-mumbai',
        permanent: true,
      },
      {
        source: '/colleges/g-h-raisoni-college-of-engineering-management-wagholi-pune',
        destination: '/colleges/g-h-raisoni-college-of-engineering-and-management',
        permanent: true,
      },
      {
        source: '/colleges/annasaheb-chudaman-patil-college-of-engineering-navi-mumbai',
        destination: '/colleges/annasaheb-chudaman-patil-college-of-engineering',
        permanent: true,
      },
      {
        source: '/colleges/jaywant-shikshan-prasarak-mandal-s-rajarshi-shahu-college-of-engineering-tathawade-pune',
        destination: '/colleges/rajarshi-shahu-college-of-engineering-pune',
        permanent: true,
      },
      {
        source: '/colleges/k-j-s-educational-institute-trinity-college-of-engineering-and-research-pisoli-haveli',
        destination: '/colleges/k-j-s-educational-institute-trinity-college-of-engineering-and-research',
        permanent: true,
      },
      {
        source: '/colleges/pune-vidyarthi-griha-s-college-of-engineering-and-technology-and-g-k-pate-wani-institute-of-management',
        destination: '/colleges/college-of-engineering-and-technology-and-g-k-pate-wani-institute-of-management',
        permanent: true,
      },
      {
        source: '/colleges/meerut-institute-of-engineering-and-technology-miet-',
        destination: '/colleges/meerut-institute-of-engineering-and-technology-miet',
        permanent: true,
      },
      {
        source: '/colleges/shree-shankar-narayan-education-trust-s-rohidas-patil-institute-of-management-studies',
        destination: '/colleges/rohidas-patil-institute-of-management-studies',
        permanent: true,
      },
      {
        source: '/colleges/maharshi-karve-sreeshikshan-sanstha-s-smt-hiraben-nanavati-instiute-of-management-research-for-women-pune',
        destination: '/colleges/smt-hiraben-nanavati-institute-of-management-research-for-women',
        permanent: true,
      },
      {
        source: '/colleges/indukaka-ipcowala-institute-of-management-iiim-',
        destination: '/colleges/indukaka-ipcowala-institute-of-management-iiim',
        permanent: true,
      },
      {
        source: '/colleges/global-business-school-and-research-centre-gbsrc-',
        destination: '/colleges/global-business-school-and-research-centre-gbsrc',
        permanent: true,
      },
      {
        source: '/colleges/aims-school-of-business',
        destination: '/colleges/aims-institutes',
        permanent: true,
      },
      {
        source: '/colleges/-great-lakes-institute-of-management',
        destination: '/colleges/great-lakes-institute-of-management',
        permanent: true,
      },
      {
        source: '/colleges/sai-balaji-international-institute-of-management-sciences-sbiims-',
        destination: '/colleges/sai-balaji-international-institute-of-management-sciences-sbiims',
        permanent: true,
      },
      {
        source: '/colleges/sinhgad-technical-education-society-sinhgad-business-school-erandwane-',
        destination: '/colleges/sinhgad-institute',
        permanent: true,
      },
      {
        source: '/colleges/iim-bodh-gaya-',
        destination: '/colleges/iim-bodh-gaya',
        permanent: true,
      },
      {
        source: '/colleges/shri-shivaji-maratha-societys-institute-of-management-research-pune-',
        destination: '/colleges/shri-shivaji-maratha-societys-institute-of-management-research-pune',
        permanent: true,
      },
      {
        source: '/colleges/pibm-tirupati-institute-of-management-pune-',
        destination: '/colleges/pibm-tirupati-institute-of-management-pune',
        permanent: true,
      },
      {
        source: '/colleges/gniot-group-of-institutions-',
        destination: '/colleges/gniot-group-of-institutions',
        permanent: true,
      },
      {
        source: '/colleges/dr-d-y-patil-unitech-society-s-dr-d-y-patil-institute-of-management-research',
        destination: '/colleges/dr-d-y-patil-institute-of-management-and-research',
        permanent: true,
      },
      {
        source: '/colleges/eastern-institute-of-integrated-learning-in-management-eiilm-kolkata-',
        destination: '/colleges/eastern-institute-of-integrated-learning-in-management-kolkata',
        permanent: true,
      },
      {
        source: '/colleges/kiit-school-of-management-bhubaneswar',
        destination: '/colleges/kiit-school-of-rural-management-bhubaneswar',
        permanent: true,
      },
      {
        source: '/colleges/institute-of-management-studies-ims-',
        destination: '/colleges/institute-of-management-studies-noida',
        permanent: true,
      },
      {
        source: '/colleges/iim-amritsar-',
        destination: '/colleges/indian-institute-of-management-iim-amritsar',
        permanent: true,
      },
      {
        source: '/colleges/allana-institute-of-management-science-',
        destination: '/colleges/allana-institute-of-management-science',
        permanent: true,
      },
      {
        source: '/colleges/shree-yash-pratisthan-shreeyash-collage-of-engineering-and-technology-aurangabad-',
        destination: '/colleges/shreeyash-college-of-engineering-and-technology-aurangabad',
        permanent: true,
      },
      {
        source: '/colleges/sipna-shikshan-prasarak-mandal-college-of-engineering-technology-amravati',
        destination: '/colleges/sipna-college-of-engineering-and-technology-amravati',
        permanent: true,
      },
      {
        source: '/colleges/nashik-district-maratha-vidya-prasarak-samaj-s-institute-of-management-research-and-technology-',
        destination: '/colleges/mvp-samaj-s-institute-of-management-research-and-technology',
        permanent: true,
      },
      {
        source: '/colleges/sheila-raheja-school-of-business-management-research-srbs-mumbai-',
        destination: '/colleges/sheil-raheja-school-of-business-management-and-research-srbs',
        permanent: true,
      },
      {
        source: '/colleges/g-s-college-of-commerce-economics-department-of-management-sciences-and-research-nagpur',
        destination: '/colleges/gs-college-of-commerce-and-economics-nagpur',
        permanent: true,
      },
      {
        source: '/colleges/scms-school-of-technology-and-management-',
        destination: '/colleges/scms-school-of-technology-and-management',
        permanent: true,
      },
      {
        source: '/colleges/icfai-business-school-ibs-hyderabad-india-college',
        destination: '/colleges/icfai-business-school-ibs-hyderabad',
        permanent: true,
      },
      {
        source: '/colleges/icfai-business-school-ahemdabad-',
        destination: '/colleges/icfai-business-school-ahemdabad',
        permanent: true,
      },
      {
        source: '/colleges/icfai-business-school-ibs-dehradun-india',
        destination: '/colleges/icfai-business-school-ibs-dehradun',
        permanent: true,
      },
      {
        source: '/colleges/icfai-business-school-ibs-jaipur-india',
        destination: '/colleges/icfai-business-school-ibs-jaipur',
        permanent: true,
      },
      {
        source: '/colleges/icfai-business-school-ibs-pune-india-college',
        destination: '/colleges/icfai-business-school-ibs-pune',
        permanent: true,
      },
      {
        source: '/colleges/-university-business-school',
        destination: '/colleges/university-business-school',
        permanent: true,
      },
      {
        source: '/colleges/-iimt-university-indian-institute-of-management-and-technology',
        destination: '/colleges/iimt-university-meerut',
        permanent: true,
      },
      {
        source: '/colleges/chaudhary-charan-singh-university-formerly-meerut-university-',
        destination: '/colleges/chaudhary-charan-singh-university-meerut',
        permanent: true,
      },
      {
        source: '/colleges/aisect-university-hazaribagh',
        destination: '/colleges/aisect-university-jharkhand',
        permanent: true,
      },
      {
        source: '/colleges/asbm-university',
        destination: '/colleges/asbm-university-bhubaneswar',
        permanent: true,
      },
      {
        source: '/colleges/ashoka-university-sonepat-haryana-',
        destination: '/colleges/ashoka-university-sonepat-haryana',
        permanent: true,
      },
      {
        source: '/colleges/chitkara-university-himachal-pradesh-',
        destination: '/colleges/chitkara-university-himachal-pradesh',
        permanent: true,
      },
      {
        source: '/colleges/department-of-management-science-dr-babasaheb-ambedkar-marathwada-university',
        destination: '/colleges/dr-babasaheb-ambedkar-marathwada-university',
        permanent: true,
      },
      {
        source: '/colleges/department-of-management-science-pumba-university-of-pune-',
        destination: '/colleges/department-of-management-science-pumba',
        permanent: true,
      },
      {
        source: '/colleges/faculty-of-management-studies-fms-university-of-delhi',
        destination: '/colleges/faculty-of-management-studies-fms',
        permanent: true,
      },
      {
        source: '/colleges/gd-goenka-university-delhi-ncr',
        destination: '/colleges/gd-goenka-university',
        permanent: true,
      },
      {
        source: '/colleges/himgiri-zee-university-uttarakhand',
        destination: '/colleges/jigyasa-university-uttarakhand',
        permanent: true,
      },
      {
        source: '/colleges/western-business-school-wbs-',
        destination: '/colleges/western-business-school-wbs',
        permanent: true,
      },
      {
        source: '/colleges/kala-vidyalaya-trust-kala-institute-of-management-studies-research',
        destination: '/colleges/kala-institute-of-management-studies-and-research',
        permanent: true,
      },
      {
        source: '/colleges/svkm-s-nsvmims-deemed-to-be-university-shirpur',
        destination: '/colleges/svkm-s-nmims-deemed-to-be-university-shirpur',
        permanent: true,
      },
      {
        source: '/colleges/vellore-institute-of-technology-vit-chennai-',
        destination: '/colleges/vellore-institute-of-technology-vit-chennai',
        permanent: true,
      },
      {
        source: '/colleges/jb-institutions-of-technology',
        destination: '/colleges/jb-institutions-of-engineering-and-technology',
        permanent: true,
      },
      {
        source: '/colleges/ahmedabad-university-',
        destination: '/colleges/ahmedabad-university',
        permanent: true,
      },
      {
        source: '/colleges/birla-institute-of-technology-noida-',
        destination: '/colleges/birla-institute-of-technology-noida',
        permanent: true,
      },
      {
        source: '/colleges/jagdish-sheth-school-of-management-jagsom-',
        destination: '/colleges/jagdish-sheth-school-of-management-jagsom',
        permanent: true,
      },
      {
        source: '/colleges/iq-city-united-world-school-of-business-kolkata',
        destination: '/colleges/iq-city-unitedworld-school-of-business-kolkata',
        permanent: true,
      },
      {
        source: '/colleges/asia-pacific-institute-of-management-aim-new-delhi',
        destination: '/colleges/asia-pacific-institute-of-management-new-delhi',
        permanent: true,
      },
      {
        source: '/colleges/national-institute-of-technology-nit-trichy-',
        destination: '/colleges/national-institute-of-technology-nit-trichy',
        permanent: true,
      },
      {
        source: '/colleges/dattajirao-kadam-technical-education-society-s-textile-engineering-institute-ichalkaranji-',
        destination: '/colleges/dattajirao-kadam-technical-education-society-s-textile-and-engineering-institute',
        permanent: true,
      },
      {
        source: '/colleges/unique-institute-of-management-',
        destination: '/colleges/unique-institute-of-management',
        permanent: true,
      },
      {
        source: '/colleges/management-education-research-institute-meri-',
        destination: '/colleges/management-education-and-research-institute-meri',
        permanent: true,
      },
      {
        source: '/colleges/modern-education-society-s-neville-wadia-institute-of-management-studies-research-pune',
        destination: '/colleges/neville-wadia-institute-of-management-studies-and-research-pune',
        permanent: true,
      },
      {
        source: '/colleges/shri-ram-murti-smarak-international-business-school-srms-ibs-',
        destination: '/colleges/shri-ram-murti-smarak-international-business-school-srms-ibs',
        permanent: true,
      },
      {
        source: '/colleges/aruna-manharlal-shah-institute-of-management-research-amsimr-',
        destination: '/colleges/aruna-manharlal-shah-institute-of-management-and-research-amsimr',
        permanent: true,
      },
      {
        source: '/colleges/lotus-business-school-pune-',
        destination: '/colleges/lotus-business-school-pune',
        permanent: true,
      },
      {
        source: '/colleges/united-group-of-institutions-noida-',
        destination: '/colleges/united-group-of-institutions-noida',
        permanent: true,
      },
      {
        source: '/colleges/jayawantrao-sawant-institute-of-management-research-jsimr-',
        destination: '/colleges/jayawantrao-sawant-institute-of-management-and-research-jsimr',
        permanent: true,
      },
      {
        source: '/colleges/k-j-s-educational-instiute-trinity-institute-of-management-and-research-haveli-pune',
        destination: '/colleges/trinity-institute-of-management-and-research-haveli-pune',
        permanent: true,
      },
      {
        source: '/colleges/sinhgad-institute-of-management-computer-application-simca-',
        destination: '/colleges/sinhgad-institute-of-management-and-computer-application-simca',
        permanent: true,
      },
      {
        source: '/colleges/-imm-institute-of-marketing-and-management',
        destination: '/colleges/institute-of-marketing-and-management-imm',
        permanent: true,
      },
      {
        source: '/colleges/-fostiima-business-school',
        destination: '/colleges/fostiima-business-school',
        permanent: true,
      },
      {
        source: '/colleges/sri-sukhmani-institute-of-management-delhi-',
        destination: '/colleges/sri-sukhmani-institute-of-management-delhi',
        permanent: true,
      },
      {
        source: '/colleges/entrepreneurship-and-management-processes-international-empi-',
        destination: '/colleges/empi-business-school',
        permanent: true,
      },
      {
        source: '/colleges/srisiim-sri-sharada-institute-of-management',
        destination: '/colleges/srisiim-sri-sharada-institute-of-indian-management',
        permanent: true,
      },
      {
        source: '/colleges/kohinoor-management-school-kms-',
        destination: '/colleges/kohinoor-management-school-kms',
        permanent: true,
      },
      {
        source: '/colleges/indus-business-school-iiebm-pune',
        destination: '/colleges/iiebm-indus-business-school-pune',
        permanent: true,
      },
      {
        source: '/colleges/institute-of-industrial-computer-management-research-nigdi-pune',
        destination: '/colleges/institute-of-industrial-and-computer-management-and-research',
        permanent: true,
      },
      {
        source: '/colleges/i-t-s-school-of-management-mohan-nagar-ghaziabad',
        destination: '/colleges/its-school-of-management-ghaziabad',
        permanent: true,
      },
      {
        source: '/colleges/-gibs-global-institute-of-business-studies-bangalore',
        destination: '/colleges/global-institute-of-business-studies-gibs-bangalore',
        permanent: true,
      },
      {
        source: '/colleges/-iasms-indian-academy-school-of-management-studies',
        destination: '/colleges/indian-academy-school-of-management-studies-bangalore',
        permanent: true,
      },
      {
        source: '/colleges/international-institute-of-business-studies-bengaluru',
        destination: '/colleges/international-institute-of-business-studies-iibs',
        permanent: true,
      },
      {
        source: '/colleges/ifim-business-school',
        destination: '/colleges/ifim-school-of-management',
        permanent: true,
      },
      {
        source: '/colleges/nitte-school-of-management',
        destination: '/colleges/nitte-school-of-management-nsom',
        permanent: true,
      },
      {
        source: '/colleges/jagannath-international-management-school-vasant-kunj',
        destination: '/colleges/jagannath-international-management-school-kalkaji',
        permanent: true,
      },
      {
        source: '/colleges/maratha-vidya-prasarak-samaj-s-karmaveer-adv-baburao-ganpatrao-thakare-college-of-engineering-nashik-',
        destination: '/colleges/maratha-vidya-prasarak-samaj-s-karmaveer-adv-baburao-ganpatrao-thakare-college-of-engineering-nashik',
        permanent: true,
      },
      {
        source: '/colleges/institute-of-business-studies-and-research-ibsar-',
        destination: '/colleges/institute-of-business-studies-and-research-ibsar',
        permanent: true,
      },
      {
        source: '/colleges/-js-kothari-jayshree-sharadchandra-kothari-business-school-',
        destination: '/colleges/js-kothari-jayshree-sharadchandra-kothari-business-school',
        permanent: true,
      },
      {
        source: '/colleges/dr-d-y-patil-school-of-management-lohegaon-pune-',
        destination: '/colleges/dr-d-y-patil-school-of-management-lohegaon-pune',
        permanent: true,
      },
      {
        source: '/colleges/alliance-ascent-college-',
        destination: '/colleges/alliance-ascent-college',
        permanent: true,
      },
      {
        source: '/colleges/pune-institute-of-business-management-pibm-',
        destination: '/colleges/pune-institute-of-business-management-pibm',
        permanent: true,
      },
      //exams 
      {
        source: '/exams/joint-entrance-examination-main-',
        destination: '/exams/joint-entrance-examination-main',
        permanent: true,
      },
      {
        source: '/exams/joint-entrance-examination-advanced-',
        destination: '/exams/joint-entrance-examination-advanced',
        permanent: true,
      },
      //courses  
      {
        source: '/courses/Master-of-Computer-Applications',
        destination: '/courses/master-of-computer-applications',
        permanent: true,
      },
      {
        source: '/courses/Bachelor-of-Medicine-and-Bachelor-of-Surgery',
        destination: '/courses/bachelor-of-medicine-and-bachelor-of-surgery',
        permanent: true,
      },
      {
        source: '/courses/Bachelor-of-Pharmacy',
        destination: '/courses/bachelor-of-pharmacy',
        permanent: true,
      },
      {
        source: '/courses/Bachelor-of-Education',
        destination: '/courses/bachelor-of-education',
        permanent: true,
      },
      {
        source: '/courses/Bachelor-of-Science',
        destination: '/courses/bachelor-of-science',
        permanent: true,
      },
      {
        source: '/courses/Master-of-Arts',
        destination: '/courses/master-of-arts',
        permanent: true,
      },
      {
        source: '/courses/Bachelor-of-Technology',
        destination: '/courses/bachelor-of-technology',
        permanent: true,
      },
      {
        source: '/courses/Master-of-Business-Administration',
        destination: '/courses/master-of-business-administration',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
