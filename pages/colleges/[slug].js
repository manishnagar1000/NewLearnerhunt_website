import React from 'react'
import Classes from '/styles/colleges.module.css'
import Link from 'next/link'

export default function CollegeName({ collegedata }) {
  console.log(collegedata)
  const dummyBannerImg = collegedata.banner_img_path && collegedata.banner_img_path != "" ? collegedata.banner_img_path : '/assets/images/DummyBG.jpg'
  const dummyLogoImg = collegedata.logo_img_path && collegedata.logo_img_path != "" ? collegedata.logo_img_path : '/assets/images/DummyLOGO.jpg'
  return (
    <div className={Classes['colleges-slug']}>
      <div className={Classes['banner-img']} style={{ backgroundImage: `url(${dummyBannerImg})` }}></div>
      <div className="container">
        <div className={Classes['content-section']}>
          <div className={Classes['heading-section']}>
            <div className={Classes['left-div']}>
              <img src={dummyLogoImg} alt="" />
            </div>
            <div className={Classes['right-div']}>
              <h1>{collegedata.name}</h1>
              <p>
                <img src="/assets/images/location.png" alt="" />
                <span>{collegedata.short_address}</span>&nbsp;&nbsp;
                <img src="/assets/images/bookmark.png" alt="" />
                <span>{collegedata.approved_by}</span>
              </p>

            </div>
          </div>
          <div className={Classes['description-section']}>
            <p>{collegedata.clg_description}</p>
          </div>
          <div className={Classes['small-description']}>
            <h2>Highlights</h2>
            <div className="row">
              <div className="col-md-6">
                <table className='table table-bordered'>
                  <tbody>
                    <tr>
                      <th scope="row">Minimum Fees</th>
                      <td>&#8377;{collegedata.min_fees}</td>
                    </tr>
                    <tr>
                      <th scope="row">Maximum Fees</th>
                      <td>&#8377;{collegedata.max_fees}</td>
                    </tr>
                    <tr>
                      <th scope="row">Number of Courses</th>
                      <td>{collegedata.courses_count}</td>
                    </tr>
                    <tr>
                      <th scope="row">Courses Offered</th>
                      <td>{collegedata.courses_offered}</td>
                    </tr>
                    <tr>
                      <th scope="row">Rating</th>
                      <td>{collegedata.ratings}</td>
                    </tr>
                    {/* <tr>
                      <th scope="row">Application Mode</th>
                      <td>{collegedata.application_process}</td>
                    </tr> */}
                    <tr>
                      <th scope="row">Highest Package</th>
                      <td>{collegedata.placement}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className={Classes['form-buttons']}>
                  <button>Apply Now</button>
                  <button><img src="/assets/images/download.png" alt="" /> Brochure</button>
                </div>
              </div>
            </div>
          </div>
          {
            collegedata.top_rec_companies && collegedata.top_rec_companies != "" &&
            <div className={Classes['small-description']}>
              <h2>Top Companies</h2>
              <p>{collegedata.top_rec_companies}</p>
            </div>
          }
          {
            collegedata.cut_off && collegedata.cut_off != "" &&
            <div className={Classes['small-description']}>
              <h2>Cut off</h2>
              <p>{collegedata.cut_off}</p>
            </div>
          }
          {
            collegedata.eligibility && collegedata.eligibility != "" &&
            <div className={Classes['small-description']}>
              <h2>Eligibility Selection</h2>
              <p>{collegedata.eligibility}</p>
            </div>
          }
          {
            collegedata.scholarship && collegedata.scholarship != "" &&
            <div className={Classes['small-description']}>
              <h2>Scholarship</h2>
              <p>{collegedata.scholarship}</p>
            </div>
          }
          {
            collegedata.application_process && collegedata.application_process != "" &&
            <div className={Classes['small-description']}>
              <h2>Application process</h2>
              <p>{collegedata.application_process}</p>
            </div>
          }
          {
            collegedata.application_link && collegedata.application_link != "" &&
            <div className={Classes['small-description']}>
              <h2>Application Link</h2>
              <p><Link href={collegedata.application_link}>{collegedata.application_link}</Link></p>
            </div>
          }
        </div>
      </div>
    </div>
  )
}


export async function getServerSideProps(context) {
  const { slug } = context.params;
  if (slug) {
    const encodedSlug = encodeURIComponent(slug)
    const url = process.env.NEXT_PUBLIC_API_ENDPOINT + "/college?slug=" + encodedSlug
    console.log(url)
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data)
    if (data.data && data.data.length > 0) {
      return {
        props: { collegedata: data.data[0] },
      };
    } else {
      return {
        notFound: true,
      };
    }
  } else {
    return {
      notFound: true,
    };
  }
}