import React, { useEffect } from "react";
import { useRouter, notFound } from "next/router";
import Style from "@/styles/BlogSlug.module.css";
import { Grid } from "@mui/material";
import Carousel from "react-multi-carousel";
import Chip from "@mui/material/Chip";
import "react-multi-carousel/lib/styles.css";
import Classes from "../../styles/blogs.module.css";

const Slug = (blogs) => {
  // console.log(blogs);
  const router = useRouter();
  // console.log(router)
  const { slug } = router.query;
  // useEffect(() => {
  //   fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/blog?slug=${slug}`, {
  //   }).then(async (response) => {
  //     var res = await response.json();
  //     console.log(res)

  //   });
  // }, [])
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
      partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
      slidestoSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      // partialVisibilityGutter: 50, // this is needed to tell the amount of px that should be visible.
      slidestoSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      // partialVisibilityGutter: 80, // this is needed to tell the amount of px that should be visible.
      slidestoSlide: 3,
    },
  };

  return (
    <>
      <div className="container">
        <div className="">
          <div className={Classes["blogs_main"]}>
            <h2>Categories</h2>
          </div>
          <div className="postion-relative">
            <Carousel
              className={Classes["react-multi-carousel-list"]}
              responsive={responsive}
              partialVisbile={false}
            >
              {blogs.data &&
                blogs.data.categories.map((s) => {
                  return (
                    <a href={s.link} style={{textTransform:"capitalize"}}>
                      <Chip
                        key={s.slug}
                        // onClick={(e) => handleTabChange(s)}
                        label={s.name}
                        color="primary"
                      />
                    </a>
                  );
                })}
            </Carousel>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div>
              <hr />

              <h1 className={Style.heading}>
                {blogs.data.post &&
                  blogs.data.post.title.charAt(0).toUpperCase() +
                  blogs.data.post.title.slice(1)}
              </h1>
              <p>
                <strong>
                  {" "}
                  {blogs.data.post &&
                    blogs.data.post.categories.map((c, i) => {
                      let data = blogs.data.categories.find(
                        (bc) => bc._id == c
                      ),
                        name = data?.name,
                        link = data?.link;
                      if (i < blogs.data.post.categories.length - 1) {
                        name = " " + name + ", ";
                      }
                      return (
                        <>
                          {
                            name ?
                              <a style={{textDecoration:'none',textTransform:"capitalize"}} href={link}>
                                {name}
                              </a>
                              :
                              <span style={{ color: "red" }}>
                                Category not found
                              </span>
                          }
                        </>
                      )
                    })}{" "}
                  |&nbsp;
                  {new Date(blogs.data.post && blogs.data.post.createdAt)
                    .toLocaleDateString("en-GB")
                    .replaceAll('/','-')
                   }
                </strong>
              </p>
              <img
                className={Style.img}
                src={`${blogs.data.post && blogs.data.post.banner_image
                  ? "https://learnerhunt-assets.s3.us-east-1.amazonaws.com/" +
                  blogs.data.post.banner_image
                  : ""
                  }`}
                // src="https://www.thesagenext.com/blog/assets/images/What-are-the-Top-5-Emerging-Cybersecurity-Challenges.webp"
                alt="Your Image"
                style={{ width: "100%" }}
              />
              <div
                className="my-1"
                dangerouslySetInnerHTML={{
                  __html: blogs.data.post && blogs.data.post.content,
                }}
              >
                {/* { dangerouslySetInnerHTML={{__html: s.content.split(' ').slice(100).join(' ')}}} */}
              </div>

              {/* <section>
            <h2 className={Style.heading}>Managed IT Services for Law Firms</h2>
            <p className={Style.paragraph}>
              Managed IT services refer to the practice of outsourcing the
              management and maintenance of an organization’s IT systems and
              networks to a specialized third-party provider. For law firms,
              these systems play a crucial role in ensuring smooth day-to-day
              operations, safeguarding sensitive client data, and staying ahead
              in an increasingly competitive legal landscape.
            </p>
            <p className={Style.paragraph}>
              The importance of managed IT services lies in safeguarding
              sensitive client data and maintaining operational efficiency.
              These services offer 24/7 monitoring, proactive maintenance, and
              expert assistance, unlike in-house solutions prone to downtime and
              security breaches.
            </p>
          </section>
          <div className={Style.note}>
          <p className={`${Style.note1} ${Style.paragraph}`}>
              The COVID-19 pandemic has further accelerated the growth of the
              worldwide data center market. According to a report, the market is
              expected to grow at a Compound Annual Growth Rate (CAGR) of 4.5%
              during the 2021 – 2026 period. It is poised to attain a global
              value of $251 billion by 2026.
            </p>
          </div>

          <section>
            <h2 className={Style.heading}>Common Challenges Faced by Law Firms</h2>
            <ul>
              <li>
                <strong>Security Concerns:</strong> Managed IT services address
                security gaps, protecting sensitive legal data from breaches.
              </li>
              <li>
                <strong>Compliance Requirements:</strong> Providers ensure
                adherence to legal and industry-specific compliance standards.
              </li>
              <li>
                <strong>Scalability Issues:</strong> As law firms grow, managed
                services scale seamlessly to accommodate changing needs.
              </li>
              <li>
                <strong>Technology Integration:</strong> Providers integrate
                diverse technologies, streamlining operations.
              </li>
            </ul>
          </section>
          <section>
            <h2 className={Style.heading}>Benefits of Managed IT Services for Law Firms</h2>
            <ol>
              <li>
                <strong>Enhanced Security and Compliance:</strong> Law firms
                deal with highly sensitive client information, making data
                security and regulatory compliance paramount. Managed IT
                services implement robust cybersecurity measures, including
                firewall protection, intrusion detection, and regular security
                audits to safeguard against cyber threats and ensure compliance
                with industry regulations such as HIPAA and GDPR.
              </li>
              <li>
                <strong>24/7 Monitoring and Support:</strong> With managed IT
                service providers, law firms benefit from round-the-clock
                monitoring of their IT systems. Any potential issues or
                vulnerabilities are identified and addressed promptly,
                minimizing downtime and optimizing performance. Additionally,
                dedicated technical support is available at all times to resolve
                any IT-related issues efficiently.
              </li>
              <li>
                <strong>Scalability and Flexibility:</strong> As law firms grow
                and evolve, their IT needs change accordingly. To address these
                evolving needs, managed IT services offer scalable solutions
                that can adapt to the firm’s requirements, whether it involves
                expanding the infrastructure, adding new users, or integrating
                additional software applications. This flexibility ensures that
                the firm’s technology remains aligned with its business
                objectives.
              </li>
              <li>
                <strong>Cost Efficiency:</strong> Outsourcing IT management to a
                managed services provider eliminates the need for in-house IT
                personnel and infrastructure investments. By partnering with an
                MSP, law firms can benefit from predictable monthly expenses and
                pay only for the services they use. This cost-effective approach
                frees up valuable resources, allowing firms to allocate them
                more efficiently and focus on core legal activities.
              </li>
              <li>
                <strong>Data Backup and Disaster Recovery:</strong> Loss of
                critical data can have severe consequences for a law firm,
                ranging from financial loss to reputational damage. Managed IT
                services implement robust data backup and disaster recovery
                solutions, including regular backups, redundant storage, and
                recovery protocols, to ensure business continuity even in the
                face of unforeseen events.
              </li>
              <li>
                <strong>Improved Collaboration and Mobility:</strong> In today’s
                digital age, collaboration and mobility are essential for modern
                legal practice. Managed IT services facilitate seamless
                communication and collaboration among team members, regardless
                of their location, through cloud-based solutions, file sharing
                platforms, and mobile device management. Therefore, lawyers can
                work efficiently from anywhere while maintaining access to
                important case files and documents.
              </li>
            </ol>
          </section>
          <section>
            <h2 className={Style.heading}>Common Challenges Faced by Law Firms</h2>
            <ul>
              <li>
                <strong>Security Concerns:</strong> Managed IT services address
                security gaps, protecting sensitive legal data from breaches.
              </li>
              <li>
                <strong>Compliance Requirements:</strong> Providers ensure
                adherence to legal and industry-specific compliance standards.
              </li>
              <li>
                <strong>Scalability Issues:</strong> As law firms grow, managed
                services scale seamlessly to accommodate changing needs.
              </li>
              <li>
                <strong>Technology Integration:</strong> Providers integrate
                diverse technologies, streamlining operations.
              </li>
            </ul>
          </section> */}
              {/* <section>
            <h2 className={Style.heading}>Benefits of Managed IT Services for Law Firms</h2>
            <ol>
              <li>
                <strong>Enhanced Security and Compliance:</strong> Law firms
                deal with highly sensitive client information, making data
                security and regulatory compliance paramount. Managed IT
                services implement robust cybersecurity measures, including
                firewall protection, intrusion detection, and regular security
                audits to safeguard against cyber threats and ensure compliance
                with industry regulations such as HIPAA and GDPR.
              </li>
              <li>
                <strong>24/7 Monitoring and Support:</strong> With managed IT
                service providers, law firms benefit from round-the-clock
                monitoring of their IT systems. Any potential issues or
                vulnerabilities are identified and addressed promptly,
                minimizing downtime and optimizing performance. Additionally,
                dedicated technical support is available at all times to resolve
                any IT-related issues efficiently.
              </li>
              <li>
                <strong>Scalability and Flexibility:</strong> As law firms grow
                and evolve, their IT needs change accordingly. To address these
                evolving needs, managed IT services offer scalable solutions
                that can adapt to the firm’s requirements, whether it involves
                expanding the infrastructure, adding new users, or integrating
                additional software applications. This flexibility ensures that
                the firm’s technology remains aligned with its business
                objectives.
              </li>
              <li>
                <strong>Cost Efficiency:</strong> Outsourcing IT management to a
                managed services provider eliminates the need for in-house IT
                personnel and infrastructure investments. By partnering with an
                MSP, law firms can benefit from predictable monthly expenses and
                pay only for the services they use. This cost-effective approach
                frees up valuable resources, allowing firms to allocate them
                more efficiently and focus on core legal activities.
              </li>
              <li>
                <strong>Data Backup and Disaster Recovery:</strong> Loss of
                critical data can have severe consequences for a law firm,
                ranging from financial loss to reputational damage. Managed IT
                services implement robust data backup and disaster recovery
                solutions, including regular backups, redundant storage, and
                recovery protocols, to ensure business continuity even in the
                face of unforeseen events.
              </li>
              <li>
                <strong>Improved Collaboration and Mobility:</strong> In today’s
                digital age, collaboration and mobility are essential for modern
                legal practice. Managed IT services facilitate seamless
                communication and collaboration among team members, regardless
                of their location, through cloud-based solutions, file sharing
                platforms, and mobile device management. Therefore, lawyers can
                work efficiently from anywhere while maintaining access to
                important case files and documents.
              </li>
            </ol>
            <h2 className={Style.heading}>Know the author</h2>

            <div className={Style.author_detail}>
              <div className={Style.author} >
               
                <div >
                  <h3  className={Style.heading} class="pt-1 pb-2">Mark Calatrava</h3>
                <p>Mark Calatrava is an experienced content writer with a passion for delivering informative and engaging content. With an impressive 9+ years of experience
                   in the field, Mark has honed his skills in various writing styles and formats. As a certified QuickBooks ProAdvisor, Mark has an extensive understanding 
                   of the QuickBooks platform, where he possesses in-depth knowledge and a deep understanding of the software.</p>
                   </div>
                   </div>
                   </div>
                   <div class="post-content py-3"><article><p><span >In today’s fast-paced business landscape, technology plays a pivotal role in driving growth, efficiency, and security. As organizations increasingly rely on digital infrastructure, the need for reliable and proactive IT support has become paramount. Enter Managed Service Provider (MSPs) the unsung heroes behind seamless operations, robust cybersecurity, and strategic technology planning.</span></p>
<h2 className={Style.heading}><span >What is a Managed IT Services Provider (MSP)</span></h2>
<p className={Style.paragraph}><span >Managed IT services provider is like your business’s outside IT department! They’re an external company that takes over managing and maintaining all your tech systems, from your computers and network to cybersecurity. The best part? They offer a variety of services, like monitoring your network for problems or keeping your data safe from online threats, all customized to fit your company’s specific needs.</span></p>
<h2 className={Style.heading}><span >Importance of MSPs in Today’s Business Landscape</span></h2>
<p className={Style.paragraph}><span >In today’s fast-paced and digitally-driven business landscape, the role of Managed IT Services Providers (MSPs) is paramount. MSPs offer comprehensive solutions tailored to the unique needs of businesses, providing essential services such as network monitoring, cybersecurity, data backup, and technical support.</span></p>
<p className={Style.paragraph}><span >Their expertise ensures that businesses stay ahead of technological advancements, remain secure from cyber threats, and maintain operational efficiency. By partnering with an MSP, organizations can focus on their core objectives while leaving the complexities of IT management to professionals, thereby fostering growth, innovation, and competitiveness in the ever-evolving marketplace.</span></p>
<h2 className={Style.heading}><span >Core Services of a Managed IT Provider</span></h2>
<h3 className={Style.heading}><span >1. Network Monitoring and Management</span></h3>
<p className={Style.paragraph}><span >MSPs continuously monitor network performance, ensuring optimal uptime and identifying potential issues before they escalate. From configuring routers to troubleshooting connectivity problems, network management is at the heart of their services.</span></p>
<h3 className={Style.heading}><span >2. Cybersecurity Solutions</span></h3>
<p className={Style.paragraph}><span >Protecting sensitive data is non-negotiable. MSPs implement robust cybersecurity measures, including firewalls, intrusion detection systems, and regular vulnerability assessments. Their proactive approach helps prevent cyber threats and minimizes the impact of </span><a href="https://www.thesagenext.com/data-security"><span >data security</span></a><span > breaches.</span></p>
<h3 className={Style.heading}><span >3. Data Backup and Disaster Recovery</span></h3>
<p className={Style.paragraph}><span >Data loss can cripple a business. MSPs design and manage backup solutions, ensuring critical data is securely stored and recoverable in case of emergencies. Whether it’s accidental deletion or a natural disaster, MSPs have contingency plans in place.</span></p>
<h3 className={Style.heading}><span >4. Cloud Computing Services</span></h3>
<p className={Style.paragraph}><span >The cloud has revolutionized how businesses operate. MSPs facilitate seamless cloud adoption, from selecting the right platform to migrating data. They manage cloud resources, scalability, and cost optimization, allowing organizations to harness the power of the cloud without the hassle.</span></p>
<h3 className={Style.heading}><span >5. Help Desk and Technical Support</span></h3>
<p className={Style.paragraph}><span >When employees encounter IT issues, MSPs are there to assist. Their help desk services provide timely resolutions, whether it’s troubleshooting software glitches or setting up new devices. A responsive help desk ensures uninterrupted productivity.</span></p>
<h2 className={Style.heading}><span >Benefits of Partnering with Managed IT Services Provider</span></h2>
<p className={Style.paragraph}>Tired of high IT costs, lagging security, and wasted employee time? <a href="https://www.thesagenext.com/blog/benefits-of-managed-it-services">Benefits of managed it services</a> offer a powerful solution. Let’s explore how they can save your business money, boost expertise, enhance security, and increase productivity.</p>
<ul>
<li  aria-level="1"><span >Cost Savings and Predictable Expenses</span></li>
<li  aria-level="1"><span >Access to Expertise and Advanced Technologies</span></li>
<li  aria-level="1"><span >Enhanced Security and Compliance</span></li>
<li  aria-level="1"><span >Increased Efficiency and Productivity</span></li>
</ul>
<h2 className={Style.heading}><span >How Managed IT Services Provider Work</span></h2>
<ul>
<li  aria-level="1"><b>Initial Assessment and Planning: </b><span >MSPs assess the organization’s current IT environment, identify pain points, and create a customized strategy. This roadmap guides subsequent actions.</span></li>
<li  aria-level="1"><b>Implementation of Services and Solutions: </b><span >From deploying security software to setting up cloud infrastructure, MSPs execute the planned solutions efficiently.</span></li>
<li  aria-level="1"><b>Ongoing Monitoring and Maintenance: </b><span >MSPs proactively monitor systems, apply patches, and fine-tune configurations. Regular maintenance prevents issues from escalating.</span></li>
<li  aria-level="1"><b>Regular Reporting and Review: </b><span >Transparency is key. MSPs provide regular reports on performance, security, and compliance, allowing businesses to make informed decisions.</span></li>
</ul>
<h2 className={Style.heading}><span >Factors to Consider When Choosing an MSP</span></h2>
<ul>
<li  aria-level="1"><b>Experience and Reputation: </b><span >Look for MSPs with a proven track record. Client testimonials and case studies speak volumes about their reliability.</span></li>
<li  aria-level="1"><b>Range of Services Offered: </b><span >Evaluate whether the MSP’s services align with your organization’s needs. A comprehensive service portfolio ensures holistic support.</span></li>
<li  aria-level="1"><b>Scalability and Flexibility: </b><span >Choose an MSP that can scale services as your business grows. Flexibility is crucial in a dynamic environment.</span></li>
<li  aria-level="1"><b>Security Measures and Compliance: </b><span >Ensure the MSP follows industry best practices for security and compliance. Ask about certifications and protocols.</span></li>
<li  aria-level="1"><b>Cost and Budget Considerations: </b><span >Balance quality with affordability. Compare pricing models and choose an MSP that fits your budget.</span></li>
</ul>
<h2 className={Style.heading}><span >Conclusion</span></h2>
<p className={Style.paragraph}><span >Managed IT Services Providers (MSPs) play a vital role in ensuring the smooth operation of businesses in today’s digital landscape. With their expertise in network monitoring, cybersecurity, data backup, and more, MSPs offer comprehensive solutions tailored to meet the unique needs of organizations.</span></p>
<p className={Style.paragraph}><span >When selecting an MSP, factors such as experience, reputation, service offerings, scalability, and cost considerations should be taken into account. Ultimately, choosing the right </span><a href="https://www.thesagenext.com/managed-it-services-near-me"><span >managed it services provider near me</span></a><span > ensures convenient access to reliable support and assistance, empowering businesses to thrive in an increasingly competitive environment.</span></p>
<h2 className={Style.heading}><span >FAQ’s</span></h2>
<h3 className={Style.heading}><span >How do I find a managed service provider?</span></h3>
<p className={Style.paragraph}><span >To find a managed service provider (MSP),{Style.star} by researching online directories, asking for recommendations from colleagues or business associates, and checking reviews. Look for MSPs with relevant experience, certifications, and positive client testimonials.</span></p>
<h3 className={Style.heading}><span >What does a managed service provider do?</span></h3>
<p className={Style.paragraph}><span >Managed service providers (MSPs) offer a range of IT services to businesses, including network monitoring, cybersecurity, data backup, cloud computing, and technical support.&nbsp;</span></p>
<h3 className={Style.heading}><span >Are managed service providers worth IT?</span></h3>
<p className={Style.paragraph}><span >Managed service providers (MSPs) can provide significant value to businesses by offering expertise, proactive maintenance, enhanced security, and cost savings compared to hiring an in-house IT team. For many businesses, the benefits of partnering with an MSP far outweigh the costs, making them worth the investment.</span></p>
</article></div>
          </section> */}
              {/* <section>
          <h2>Similar articles</h2>

          <div className={Style.box3} >
            <div  >
              <a class="text-decoration-none" href="/blog/managed-it-services-for-law-firms">
              <img src="https://snb.thesagenext.com/blog/wp-content/uploads/2024/04/Managed-IT-Services-for-Law-Firms.webp" alt="Benefits of Managed IT Services for Law Firms and How its Works" class="img-fluid"  width={250} height={125}/>
                <h3 class="pt-1 pb-1">Benefits of Managed IT Services for Law Firms and How its Works</h3>
                </a><div class="author-name">Mark Calatrava</div></div><div class="col-lg-4 pl-1 pr-1"><a class="text-decoration-none" href="/blog/managed-it-services-for-small-businesses">
                  <img src="https://snb.thesagenext.com/blog/wp-content/uploads/2024/04/Managed-IT-Services-1.jpg" alt="Benefits of Managed IT Services For Small Businesses in 2024" class="img-fluid"  width={250} height={125}/>
                  <h3 class="pt-1 pb-1">Benefits of Managed IT Services For Small Businesses in 2024</h3></a><div class="author-name">Mark Calatrava</div>
                  </div><div class="col-lg-4 pl-1 pr-1"><a class="text-decoration-none" href="/blog/benefits-of-managed-it-services">
                    <img src="https://snb.thesagenext.com/blog/wp-content/uploads/2024/03/Benefits-of-Managed-IT-Services.webp" alt="Top 11 Benefits of Managed IT Services (MIS) for Your Business" class="img-fluid"  width={250} height={125}/>
                    <h3 class="pt-1 pb-1">Top 11 Benefits of Managed IT Services (MIS) for Your Business</h3></a><div class="author-name">Mark Calatrava</div></div></div>
</section> */}
            </div>
          </div>
          <div className="col-md-4">
            <div className={Style.sidebar}>
              <div className={Style.sidebar}>
                <div className={Style.popular_posts}>
                  <h2 className={Style.heading}>Popular Posts</h2>
                  <div className={Style.content}>
                    {blogs.data.popularPosts.map((s) => (
                      <div className={Style.sidebar_content}>
                        <a href={`/blog/${s.slug}`}>
                          {" "}
                          <img
                            src={`${s.banner_image
                              ? "https://learnerhunt-assets.s3.us-east-1.amazonaws.com/" +
                              s.banner_image
                              : "/assets/images/blog/DummyBlogSquare.webp"
                              }`}
                            alt="Your Image"
                            width={90}
                            height={80}
                            border
                            style={{
                              borderRadius: "10px",
                              margin: "10px",
                              cursor: "pointer",
                              objectFit: "cover",
                            }}
                          />{" "}
                        </a>
                        <p>
                          {s.title.charAt(0).toUpperCase() + s.title.slice(1)}
                        </p>
                        <hr />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slug;

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const blogs_res = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + `/blog?slug=${slug}`
    );
    const blogs = await blogs_res.json();
    console.log(blogs);
    return { props: blogs };
  } catch (error) {
    throw error;
  }
}
