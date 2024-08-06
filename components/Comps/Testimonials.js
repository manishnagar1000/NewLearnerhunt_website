import React from 'react'
import Classes from "/styles/mbaleads.module.css";

export default function Testimonials() {
  return (
    <div>
        <div className={Classes['mba-Testimonials']}>
        <div className={Classes['mba-Testimonials-inner']}>
          <h3 className={Classes['mba-heading']}>Testimonials</h3>
          <div className={Classes['mba-centerlized']}>
          <div className={Classes['mba-borderLine']}></div>
          </div>
          <div className="container">
            <p style={{textAlign:'center'}}>Explore what our clients have to say about their experiences with Learner Hunt through our testimonials.</p>
            <div className="row">

              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student1.webp" alt='studentname' width={100} height={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Vishwas Verma </p>
                  <p>Learner Hunt exceeded my expectations! The team's knowledge of MBA admissions is unmatched. I owe my acceptance to their strategic guidance. Trust them with your aspirations!</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student2.webp" alt='studentname' width={100} height={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Md Kaif </p>
                  <p>Learner Hunt is a game-changer! Their expert guidance made my MBA admission process seamless. I am grateful for their personalized approach and commitment to student success.</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student3.webp" alt='studentname' width={100} height={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Arjun Jaiswal</p>
                  <p>Exceptional service! Learner Hunt provided invaluable insights, helping me secure a spot in a top-tier MBA program. Their dedication to each student sets them apart. Highly recommended!</p>
                </div>
              </div>
              {/* <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student4.webp" alt='studentname' width={100} height={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Ishika Murarka</p>
                  <p>Learner Hunt exceeded my expectations! The team's knowledge of MBA admissions is unmatched. I owe my acceptance to their strategic guidance. Trust them with your aspirations!</p>
                </div>
              </div> */}
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student5.webp" alt='studentname' width={100} height={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Jia Oktey</p>
                  <p>Navigating the complex MBA admission process was a breeze with Learner Hunt. Their support is genuine, and the results speak for themselves. Five stars without a doubt!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}



// import React from 'react';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { Container, Card, Image, Col, Row } from 'react-bootstrap';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// const testimonials = [
//   {
//     name: "Vishwas Verma",
//     image: "/assets/Landing/studentImg/student1.webp",
//     text: "Learner Hunt exceeded my expectations! The team's knowledge of MBA admissions is unmatched. I owe my acceptance to their strategic guidance. Trust them with your aspirations!",
//   },
//   {
//     name: "Md Kaif",
//     image: "/assets/Landing/studentImg/student2.webp",
//     text: "Learner Hunt is a game-changer! Their expert guidance made my MBA admission process seamless. I am grateful for their personalized approach and commitment to student success.",
//   },
//   {
//     name: "Arjun Jaiswal",
//     image: "/assets/Landing/studentImg/student3.webp",
//     text: "Exceptional service! Learner Hunt provided invaluable insights, helping me secure a spot in a top-tier MBA program. Their dedication to each student sets them apart. Highly recommended!",
//   },
//   {
//     name: "Jia Oktey",
//     image: "/assets/Landing/studentImg/student5.webp",
//     text: "Navigating the complex MBA admission process was a breeze with Learner Hunt. Their support is genuine, and the results speak for themselves. Five stars without a doubt!",
//   }
// ];

// const NextArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: 'block', zIndex: '1', right: '10px' }}
//       onClick={onClick}
//     >
//       <ArrowForwardIosIcon style={{ color: 'black', fontSize: '30px' }} />
//     </div>
//   );
// };

// const PrevArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: 'block', zIndex: '1', left: '10px' }}
//       onClick={onClick}
//     >
//       <ArrowBackIosIcon style={{ color: 'black', fontSize: '30px' }} />
//     </div>
//   );
// };

// const Testimonials = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//   };

//   return (
//     <div style={{ backgroundColor: "#ecf0f1", padding: "3rem 0" }}>
//       <Container className="my-5 p-4">
//         <h3 style={{ fontWeight: "bold", fontSize: "26px" }} className='text-center'>Testimonials</h3>
//         <p style={{ textAlign: 'center' }}>Explore what our clients have to say about their experiences with Learner Hunt through our testimonials.</p>
//         <Slider {...settings}>
//           {testimonials.map((testimonial, index) => (
//             <Card key={index} className="text-center p-4 border-0">
//               <Card.Body>
//                 <Row>
//                   <Col xs={12} md={4} className='d-flex justify-content-center'>
//                     <Image src={testimonial.image} roundedCircle className="mb-4" style={{ width: '100%', maxWidth: '200px', height: 'auto' }} />
//                   </Col>
//                   <Col xs={12} md={8} className='mt-4' style={{ textAlign: "start" }}>
//                     <Card.Title>{testimonial.name}</Card.Title>
//                     <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
//                     <Card.Text>{testimonial.text}</Card.Text>
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>
//           ))}
//         </Slider>
//       </Container>
//     </div>
//   );
// };

// export default Testimonials;
