
import { Accordion } from 'react-bootstrap';


const FAQ = ({ faqs }) => {
    return (
        <Accordion >
            {
                faqs.map((item, index) => (
                    <Accordion.Item key={index} eventKey={`${index}`}>
                        <Accordion.Header>
                            {`${index + 1}. ${item.question}`}
                        </Accordion.Header>
                        <Accordion.Body>
                            {item.answer}
                        </Accordion.Body>
                    </Accordion.Item>
                ))
            }
        </Accordion>
    );
};

export default FAQ;
