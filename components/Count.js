import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';

import styles from '../styles/count.module.css'

const div = () => {
    return (
        <div className={[styles.mainBox].join(" ")}>
            <Container>
            <Row>
                <Col className={[styles.column, "text-center"].join(" ")}>
                    <div className="text-white">
                        <span className={styles.heading}>150+</span>

                        <p className={styles.paragraph}>Courses</p>
                    </div>

                </Col>
                <Col className={[styles.column, "text-center"].join(" ")}>
                    <div className="text-white">
                        <span className={styles.heading}>1000+</span>
                        <p className={styles.paragraph}>Colleges</p>
                    </div>
                </Col>
                <Col className="text-center">
                    <div className="text-white">
                        <span className={styles.heading}>50+</span>
                        <p className={styles.paragraph}>Counsellors</p>
                    </div>
                </Col>
            </Row>
            </Container>
        </div>
    )
}

export default div


