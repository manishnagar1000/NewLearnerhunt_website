import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Styles from "@/styles/studyAbroad.module.css";
import Image from 'next/image';
import { StudyAbroadInnerPageData, universities } from '@/components/Comps/type';
import { useRouter } from 'next/router';
import Spinner from 'react-bootstrap/Spinner';
import Faq from '@/components/Comps/Faq';
// import TalktoExpert from '@/components/TalktoExpert';
import Carousel from "react-multi-carousel";



function StudyAbroadInnerPage() {
    const router = useRouter();
    const { slug } = router.query;


    const countryData = StudyAbroadInnerPageData.countries.find(country => country.slug.toLowerCase() === slug?.toLowerCase());
console.log(countryData)
    const faqs = countryData?.details.FAQs


    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1200 },
            items: 6,
        },
        desktop: {
            breakpoint: { max: 1200, min: 992 },
            items: 6,
        },
        tablet: {
            breakpoint: { max: 992, min: 576 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 576, min: 0 },
            items: 1,
        },
    };


    return (
        <>

            {countryData ?
                <>
                    <div className={Styles.saMainDiv}>
                        <Container className={Styles.saChildDiv} >
                            <h2 className={Styles.saText}>Study in {countryData.countryName}</h2>
                        </Container>
                    </div>
                    {/* <div style={{ background: `url(${countryData.bannerImage})` }}>
                        <Container className={Styles.saChildDiv} style={{ minHeight: '30vh', backgroundSize: "cover", backgroundPosition: "center" }}>
                            <h2 className={Styles.saText}>Study in {countryData.countryName}</h2>
                        </Container>
                    </div> */}
                    <Container >
                        <Row className='mt-5'>
                            <Col lg={6} md={12} >
                                <Row>
                                    <div >
                                        <img src={countryData.countryImage} className={Styles.slugHeroImage} alt='countryImage' />
                                    </div>

                                </Row>
                            </Col>
                            <Col lg={6} md={12} className='mb-2'>
                                <h4 className={Styles.Overview} >OVERVIEW</h4>
                                <p>{countryData.details.overview}</p>
                                <div className='mb-4 mt-4'>
                                    <strong ><h5>QUICK FACTS</h5></strong>
                                    {countryData.details.highlights.map((item, index) => {
                                        return (
                                            <div className='d-flex'>
                                                <div>
                                                    <Image className="mx-2 " width={20} height={20} src="/assets/images/StudyAbroad/StudyAbroadInner/check-mark.webp" />
                                                </div>
                                                <div>
                                                    <p key={index}>
                                                        {item}
                                                    </p>
                                                </div>
                                            </div>


                                        )
                                    })}
                                </div>

                            </Col>
                        </Row>
                    </Container>

                    <div className={`${Styles.slugWhyStudy} mt-5`} >
                        <Container xs={6}  >
                            <div className='text-center text-light p-4'> <h1>Why Study in {countryData.countryName}?</h1></div>
                            <Row  >
                                {countryData.details.why_study.map((item, index) => (
                                    <Col key={index} className={Styles.choose} md={3} xs={6}>
                                        <div className={Styles.circle} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                                            <Image src={item.icon} alt="icon" width={55} height={55} />
                                        </div>
                                        <p className="text-center">{item.text}</p>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </div>

                    {/* <Container className={`${Styles.main}  `}>
                        <Row className="text-center">
                            <Col>
                                <h2 className={Styles.slugUniversityHeading}>Top Universities</h2>
                          
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                <Carousel
                                    responsive={responsive}
                                    infinite={true}
                                    autoPlay={true}
                                    autoPlaySpeed={2000}
                                    transitionDuration={500}
                                    itemClass="carousel-item-padding-40-px"
                                    keyBoardControl={true}
                                    removeArrowOnDeviceType={["desktop"]}
                                >
                                    {universities && universities.map((item, index) => (
                                        <div key={index} className={Styles.imgg}>
                                            {item.map((item, idx) => (
                                                <img
                                                    key={idx}
                                                    src={item.image}
                                                    alt='eduloan'
                                                    width={130}
                                                    height={100}
                                                />

                                            ))}
                                        </div>
                                    ))}
                                </Carousel>
                            </Col>
                        </Row>
                    </Container> */}

                    {/* <Container className='mt-3 pb-3 '>
                        <p className='text-primary'  >What we Offer</p>
                        <div className='pb-2'>
                            <h2 style={{ fontWeight: "lighter" }}>Do You Have <strong className='text-primary'>Questions ?</strong></h2>
                        </div>
                        <Faq faqs={faqs} />
                    </Container> */}

                    {/* <TalktoExpert
                        Background={{ backgroundColor: "#004b7a" }}
                        heading={`Study in ${countryData.countryName} Now`} paragraphText={"What if you can’t come to our office we can come to you virtually for your study abroad plans ! Get expert counselling services from home or any where ."} 
                        buttonText="Enquire Now" buttonLink="/contact-us" /> */}
                </>
                : <div style={{ minHeight: "80vh", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }
        </>
    );
}

export default StudyAbroadInnerPage;


