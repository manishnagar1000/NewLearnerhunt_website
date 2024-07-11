import { Container, Row, Col, Button } from 'react-bootstrap';
import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import { studyAbroadOfferingsData } from './type';


const Offerings = () => {

  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-out',
      delay: 100,
    });
  }, []);
  return (
    <>
      <Container >
        <h5 className='text-secondary'>Offerings</h5>
        <h2>Study Abroad <span className='text-primary'>with us!</span></h2>
        {
          studyAbroadOfferingsData.map((item, index) => {
            return (
              <>
                {
                  index % 2 == 0 ?
                    <Row>
                      <Col >
                        <div className='pt-4 pb-5' data-aos="flip-right" >
                          <Image src={item.image} sizes="100vw"
                            style={{
                              width: '100%',
                              height: 'auto',
                            }}
                            width={500}
                            height={300} alt='icon' />
                        </div>
                      </Col >
                      <Col xs={12} sm={6} className='mt-5'>
                        <div className='pt-4 pb-5' data-aos="flip-left">
                          <h6 className='text-primary'>{item.title}</h6>
                          <h3 className='mt-4'>{item.subtitle}</h3>
                          <h6 className='mt-4 text-secondary'>{item.description}</h6>
                      
                        </div>
                      </Col>
                    </Row>
                    :
                    <Row>
                      <Col xs={12} sm={6} className='mt-5'>
                        <div className='pt-4 pb-5' data-aos="flip-left" >

                          <h6 className='text-primary'>{item.title}</h6>
                          <h3 className='mt-4'>{item.subtitle}</h3>
                          <h6 className='mt-4 text-secondary'>{item.description}</h6>
                         
                        </div>
                      </Col>
                      <Col xs={12} sm={6}>
                        <div data-aos="flip-right" >
                          <Image className='mt-3' src={item.image} sizes="100vw"
                            style={{
                              width: '100%',
                              height: 'auto',
                            }}
                            width={500}
                            height={300} alt='icon' />
                        </div>
                      </Col >
                    </Row>
                }

              </>
            )
          })
        }
        {/* <Row className='mt-5' >
          <Col data-aos="flip-right">
            <div className='mt-5'>
              <h5 className='text-secondary '>LearnerHunt App</h5>
              <h1>Dreaming of studying abroad?</h1>
              <h2 className='text-primary'>Start planning today!</h2>
              <div className='pt-3'>
                <p> <Image className="mx-2 text-secondary" width={20} height={20} src="/assets/images/Offerings/check-button.webp" />Discover universities & courses</p>
                <p><Image className="mx-2 text-secondary" width={20} height={20} src="/assets/images/Offerings/check-button.webp" />Ask doubts and interact with the community </p>
                <p><Image className="mx-2 text-secondary" width={20} height={20} src="/assets/images/Offerings/check-button.webp" />Latest study abroad news & updates</p>
                <p><Image className="mx-2 text-secondary" width={20} height={20} src="/assets/images/Offerings/check-button.webp" />Track applications & offers</p>
                <p><Image className="mx-2 text-secondary" width={20} height={20} src="/assets/images/Offerings/check-button.webp" />And a lot more</p>

              </div>
              <small className='text-secondary'> Download the Study Abroad with LearnerHunt App</small>
            </div>
          </Col>
          <Col xs={12} sm={6} className='mt-5 ' data-aos="flip-left" >

          
            <Image src="/assets/images/Offerings/homepageAppBanner.webp"
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
              }}
              width={500}
              height={300} alt='icon' />
          </Col>
        </Row> */}

      </Container>
    </>
  )
}

export default Offerings
