import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import TalktoExpertModal from './Comps/TalktoExpertModal';
import Swal from 'sweetalert2';


const TalktoExpert = ({ heading, buttonText, buttonLink, paragraphText, Background}) => {

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: ''
    }); 


    const handleButtonClick = (e) => {
        e.preventDefault()
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData("")
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        console.log('Form Data:', formData);
  
        const Data = new FormData();
        Data.append('name', formData.name);
        Data.append('email', formData.email);
        Data.append('mobile', formData.mobile);


        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/student/study-abroad-enquire-form", {
          method: 'POST',
          body: Data
        }).then(async (response) => {
          let resp = await response.json();
          if (resp.message) {
            Swal.fire({
              title: 'Success',
              icon: 'success',
              text: resp.message,
            });
            handleCloseModal();
                setFormData("")
          } else if (resp.error) {
    
            Swal.fire({
              title: 'Error',
              icon: 'error',
              text: resp.error,
            })
          }
        }).catch(error => {
          console.error('Error:', error);
    
        });
    
      };
    
    return (
        <div className="min-vh-50 mb-4 mt-5" style={Background}>
            <Container className="py-5">
                <div className="text-center text-light">
                    <h2 className='fs-1'>{heading}</h2>
                    <p className='fs-5 pt-4 '> {paragraphText}</p>
                    <Button onClick={handleButtonClick} href={buttonLink} variant="outline-light mt-5">{buttonText}</Button>
                    <TalktoExpertModal handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        formData={formData}
                        show={showModal} handleClose={handleCloseModal} />
                </div>
            </Container>
        </div>
    );
};



export default TalktoExpert;