import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/Whychoose.module.css";
import Card from "react-bootstrap/Card";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ContactMailIcon from '@mui/icons-material/ContactMail';
const MyComponent = () => {
  const data = [
    {
      title: "Top Colleges",
      content: "Get placed in the best colleges",
      src: <AccountBalanceIcon/>,
    },
    {
      title: "Top Courses",
      content: "Explore various courses with vivid varieties",
      src: <MenuBookIcon/>,

    },
    {
      title: "Counselling",
      content: "Get counselling from the best counsellors",
      src: <ContactPhoneIcon/>,

    },
    {
      title: "150+ Courses",
      content: "Discover the year’s top best course and select the best",
      src: <AutoStoriesIcon/>,

    },
    {
      title: "1000+ Colleges",
      content: "Discover the best college with vivid choices",
      src: <ApartmentIcon />,

    },
    {
      title: "25 Counsellors",
      content: "Get counselling from the best counsellors ",
      src: <ContactMailIcon/>,

    },
  ];

  return (
    <div className={styles.var}>
      <div className={styles.contain}>
        <div className="row gx-0">
            <div className="col-lg-6 col-md-10 col-12 mx-auto">
            <span className={styles.mainHeading}>Why Should Choose Learnerhunt</span>
        <p>
          Learnerhunt: Uncover hidden educational treasures! Discover colleges
          tailored to your passions and aspirations, expanding your horizons
          beyond the ordinary.
        </p>
            </div>
        </div>
      </div>
      <div>
        <Container>
          <Row xs={1} md={2} lg={3}>
            {data &&
              data.length > 0 &&
              data.map((e, i) => {
                return (
                  <Col key={i}>
                    <div className={styles.cardBox}>
                      <div className={styles.imageContainer}>
                        <div className={styles.imageCard}>
                      {e.src}
                        </div>
                        <h5 className={styles.cardContent}>{e.title}</h5>
                      </div>

                      <p>{e.content}</p>
                    </div>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default MyComponent;
