import React from 'react';
import { Container, Button} from 'react-bootstrap';

const TalktoExpert = () => {
    

    return (
        <div className="min-vh-50 mb-4 mt-5 " style={{ backgroundColor: "#1c4fa3" }}>
            <Container className="py-5  ">
                <div className="text-center text-light">
                    <h2>Confused about which education loan to opt for?</h2>
                    <Button href='/contact-us'  variant="outline-light mt-5">Talk to an Expert</Button>
                </div>
            </Container>
        </div>
    );
};

export default TalktoExpert;
