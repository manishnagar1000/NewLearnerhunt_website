import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { LoanOffersData } from '../type';
import Image from 'next/image';
import Styles from '@/styles/Loanpage.module.css'

const LoanOffers = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <section className="loan-features pt-5 pb-5">
            <Container>
                <h3 className={`mb-5 ${Styles.headingMore}`} >What We Offer</h3>
                <Row >
                    {
                        LoanOffersData.map((item, index) => {
                            return (
                                <Col md={4} key={index} className="mb-4">
                                    <Card
                                        className="h-100"
                                        style={{
                                            transition: 'transform 0.3s ease-in-out, box-shadow 0.5s ease-in-out, background-color 0.5s ease-in-out',
                                            transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                                            boxShadow: hoveredIndex === index ? '0 0 20px rgba(0, 0, 0, 0.1)' : 'none',
                                            backgroundColor: hoveredIndex === index ? '#225B87' : 'inherit',
                                            cursor: hoveredIndex === index ? 'pointer' : 'default',
                                        }}
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <Card.Body style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                            <Image src={item.icon} width={40} height={40} />
                                            <Card.Title style={{ color: hoveredIndex === index ? 'white' : 'inherit', marginTop: '10px', textAlign: 'center' }}>{item.title}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </section>
    );
};

export default LoanOffers;
