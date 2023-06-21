import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import Classes from "/styles/TopColleges.module.css";

export default function TopColleges({ colleges }) {
  console.log(colleges);
  const [loadingColleges, setLoadingColleges] = useState([]); // Added loadingColleges state
  const handleCollegeClick = (collegeId) => {
    setLoadingColleges((prevLoadingColleges) => {
      return [...prevLoadingColleges, collegeId]; // Add collegeId to the loadingColleges array
    });
  };
  return (
    <>
    
      <section id="collegeId" className=" container my-5">
        <div className="d-flex justify-content-between align-items-center my-4">
          <h2>Top Colleges</h2>
          <Link href={"/colleges"}>
            <Button className={Classes.linkButton}>Explore More</Button>
          </Link>
        </div>
        <div className="row">
          {colleges.map((s) => {
            const cardImg =
              s.square_img_path && s.square_img_path !== ""
                ? s.square_img_path
                : "/assets/images/DummySQUARE.jpg";
            return (
              <div className="col-lg-3 col-md-6 mb-3">
                <Card key={s._id} className={Classes.CustomCard}>
                  <span className={Classes.Custombadge}> {s.ratings}</span>
                  <Card.Img variant="top" src={cardImg} alt="Image not Found" />
                  <Card.Body className="card-body">
                    <Card.Title>{s.name}</Card.Title>
                    <Card.Text>{s.short_address}</Card.Text>
                  </Card.Body>
                  <Card.Footer className={Classes["custom-card-footer"]}>
                    <Link href={`/colleges/${s.slug}`}>
                      {loadingColleges.includes(s.slug) ? (
                        <Button variant="danger">Loading...</Button>
                      ) : (
                        <Button
                        className={Classes.linkButton}
                          onClick={() => handleCollegeClick(s.slug)}
                        >
                          <>View College</>
                        </Button>
                      )}
                    </Link>
                  </Card.Footer>
                </Card>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
