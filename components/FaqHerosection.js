import React from 'react';
import Styles from '@/styles/FAQ.module.css'
import Accordion from 'react-bootstrap/Accordion';
import {Homepagefaq} from "../components/Comps/type";

const FaqHerosection = () => {
  return (
    <>
    <div className='container my-4'>
      <h2 className='my-4'>More About Learnerhunt</h2>
      <div>
        <Accordion>
          {Homepagefaq.map((item, index) => (
            <Accordion.Item key={index} eventKey={index.toString()}>
              <Accordion.Header>
               {`${index + 1}. ${item.question}`}
              </Accordion.Header>
              <Accordion.Body>
               {item.answer}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
      </div>
    </>
  );
};

export default FaqHerosection;
