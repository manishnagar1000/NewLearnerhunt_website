import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import Classes from "/styles/studyAbroad.module.css";

export default function StudyAbroad() {

  return (
    <>
    <div id="studyId" className=" container  my-5" >
      <div  className=" d-flex justify-content-between align-items-center my-4">
        <h2>Study Abroad</h2>
        {/* <Link href={"/courses"}>
          <Button className={Classes.linkButton}>Explore More</Button>
        </Link> */}
      </div>
        <div className="row">
        <div className="col-md-6  col-lg-3">
            <Card className={Classes.studyCard}>
              <Card.Header className={Classes.cardHeader}>
                Study in USA
              </Card.Header>
              <Card.Body>
                <p
                  className={`${Classes.comingSoon}`}
                >
                  Coming Soon
                </p>
              </Card.Body>
              <Card.Footer className={Classes.cardFooter}>
                <Link href={"/comingsoon"}>
                  <Button className={Classes.linkButton}>
                    Learn More
                  </Button>
                </Link>
              </Card.Footer>
            </Card>
          </div>
    </div>
        </div>
    </>
  );
}
