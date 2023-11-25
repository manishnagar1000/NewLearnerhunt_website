import React from 'react'
import Link from 'next/link'
const Footer = () => {
  return (
    <div className='custom_footer'>
      <div className="container">
        <div className="custom-row">
          <div className="custom-col">
            <h3>Featured Colleges</h3>
            <ul>
              <li><Link href="/colleges/soil-institute-of-management">SOIL Institute of Management</Link></li>
              <li><Link href="/colleges/-itm-information-technology-management-">[ITM] INFORMATION TECHNOLOGY MANAGEMENT</Link></li>
              <li><Link href="/colleges/bml-munjal-university">BML Munjal University</Link></li>
            </ul>
          </div>
          <div className="custom-col">
            <h3>Top Universities</h3>
            <ul>
              <li><Link href="/colleges/-upes-university-of-petroleum-and-energy-studies">(UPES) University of Petroleum and Energy Studies</Link></li>
              <li><Link href="/colleges/atlas-skilltech-university">ATLAS SkillTech University</Link></li>
              <li><Link href="/colleges/alliance-university">Alliance University</Link></li>
            </ul>
          </div>
          <div className="custom-col">
            <h3>Top Exams</h3>
            <ul>
              <li><Link href="/exams/Joint-Entrance-Examination-Main">JEE Mains</Link></li>
              <li><Link href="/exams/Joint-Entrance-Examination-Advanced">JEE Advanced</Link></li>
              <li><Link href="/exams/National-Eligibility-cum-Entrance-Test">NEET</Link></li>
            </ul>
          </div>
          <div className="custom-col">
            <h3>Quick Links</h3>
            <ul>
              <li><Link href="/privacy">Privacy policy</Link></li>
              <li><Link href="/about-us">About Us</Link></li>
              <li><Link href="/sitemap.xml">Site Map</Link></li>


            </ul>
          </div>
          <div className="custom-col">
            <h3>Contact Us</h3>
            <ul className='last-ul'>
              <li><Link href="mailto:contact@learnerhunt.com">contact@learnerhunt.com</Link></li>
              <li><Link href="tel:+918800756846">+918800756846</Link></li>
              <li><address>SCF 1, 2nd Floor, Shopping Complex, Ashoka Enclave Part II, Sector 37, Faridabad, Haryana 121003</address></li>
            </ul>
          </div>

        </div>
        <div className="row">
          <div className="col-lg-9 col-md-7">
            <p className='cmp-name'>© 2023 Decred Digital Services Pvt. Ltd.</p>
          </div>
          <div className="col-lg-3 col-md-5">
            <div className="social-media">
              <Link target='_blank' href="https://www.facebook.com/learnerhunt/"><img src="/assets/images/footer/facebook.png" alt="facebook" width={50} height={50}/></Link>
              <Link target='_blank' href="https://twitter.com/learnerhunt"><img src="/assets/images/footer/twitter.png" alt="twitter" width={50} height={50}/></Link>
              <Link target='_blank' href="https://www.instagram.com/learnerhunt_india/"><img src="/assets/images/footer/instagram.png" alt="instagram" width={50} height={50}/></Link>
              <Link target='_blank' href="https://in.linkedin.com/company/learnerhunt-com"><img src="/assets/images/footer/linkedin.png" alt="linkedIn" width={50} height={50}/></Link>
              <Link target='_blank' href="https://www.youtube.com/@Learnerhunt"><img src="/assets/images/footer/youtube.png" alt="youtube" width={50} height={50}/></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer