import CollegeRanking from '@/components/CollegeRanking'
import HomepageHeroSection from '@/components/HomepageHeroSection'
import StudyAbroad from '@/components/StudyAbroad'
import TopColleges from '@/components/TopColleges'
import TopCourses from '@/components/TopCourses'
import TopExams from '@/components/TopExams'
import Count from '@/components/Count'
import WhyChoose from '@/components/WhyChoose'
import axios from 'axios'



import Head from 'next/head'

export default function Home({colleges,courses,exams,testeligibility}) {
  return (
    <>
      <Head>
        <title>Learnerhunt: Top Colleges & Universities in India | Latest News About Courses & Admission</title>
        <meta name="description" content="Learnerhunt - The one-stop platform to explore top UG & PG colleges, universities and diploma, certificate courses in India and abroad. Get all the latest education news and more at www.learnerhunt.com" />
        <meta name="keyword" content="admission counselling, college admissions, university admissions, student guidance, career counselling, student support, educational portal, college details" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="facebook-domain-verification" content="dlwg9ck6pstfnxvx0h76eu38irnw2x" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomepageHeroSection data={testeligibility}/>
      <Count/>
      <WhyChoose/>
      <TopColleges colleges={colleges}/>
      <TopCourses  courses ={courses}/>
      <CollegeRanking zones={testeligibility.zones} departments={testeligibility.departments} rankingtypes={testeligibility.rankingtypes} />
      <TopExams exams={exams}/>
      <StudyAbroad/>
    </>
  )
}


// export async function getServerSideProps() {
//   try {
//     // Fetch data from external API
//     const colleges_res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/colleges?limit=4&page=0&course=mba");
//     const colleges = await colleges_res.json();

//     const courses_res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/courses?limit=-1&page=0&type=ug`);
//     const courses = await courses_res.json();

//     const exams_res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/exams?limit=4&page=0");
//     const exams = await exams_res.json();

//     const testeligibility_res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/miscellaneous/testeligibility");
//     const testeligibility = await testeligibility_res.json();

//     return {
//       props: {
//         colleges: colleges.data,
//         courses: courses.data,
//         exams: exams.data,
//         testeligibility,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return {
//       props: {
//         colleges: [],
//         courses: [],
//         exams: [],
//         testeligibility: {},
//       },
//     };
//   }
// }
export async function getServerSideProps() {
  try {
    // Fetch data from external API using Axios
    const colleges_res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/colleges?limit=4&page=0&course=mba`);
    const colleges = colleges_res.data;

    const courses_res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/courses?limit=-1&page=0&type=ug`);
    const courses = courses_res.data;

    const exams_res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/exams?limit=4&page=0`);
    const exams = exams_res.data;

    const testeligibility_res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/miscellaneous/testeligibility`);
    const testeligibility = testeligibility_res.data;

    return {
      props: {
        colleges: colleges.data,
        courses: courses.data,
        exams: exams.data,
        testeligibility,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        colleges: [],
        courses: [],
        exams: [],
        testeligibility: {},
      },
    };
  }
}