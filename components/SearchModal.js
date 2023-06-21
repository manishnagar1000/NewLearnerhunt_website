import React, { useState, useEffect } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import Classes from '/styles/searchmodal.module.css'
import Link from 'next/link'
const SearchModal = ({ onHide }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isApiHitComplete, setIsApiHitComplete] = useState(true)
  const [results, setResults] = useState([])
  useEffect(() => {
    let timeoutId;

    const fetchSearchResults = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/miscellaneous/global-search?term=" + searchTerm);
      const data = await response.json()
      setResults(data.data);
      setIsApiHitComplete(true);
    };

    if (searchTerm.length > 2) {
      setIsApiHitComplete(false);
      timeoutId = setTimeout(fetchSearchResults, 500);
    } else {
      setResults([]);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  return (
    <Modal className={Classes['custom-search-modal']} fullscreen centered show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search colleges, courses, exams & more.' className='form-control' />
      </Modal.Header>
      <Modal.Body style={{ padding: '0' }}>
        <div className={Classes['results']}>
          {
            searchTerm.length > 2 ?
              isApiHitComplete ?
                results.length > 0 ?
                  results.map((el) => {
                    const typeCondition =
                    el.type === 'college'
                      ? `/colleges/${el.slug}`
                      : el.type === 'exam'
                      ? `/exams/${el.slug}`
                      : el.type === 'course'
                      ? `/courses/${el.slug}`
                      : '';
                    return (
                     
                      <Link href={typeCondition}>
                        <div className={Classes['college']}>
                          <span>{el.title}</span>
                          <span>{el.type}</span>
                        </div>
                      </Link>
                    )
                  })
                  :
                  <div className='d-flex justify-content-center align-items-center' style={{ width: "100%", height: "90vh" }}>
                    <span>No Record</span>
                  </div>
                :
                <div className='d-flex justify-content-center align-items-center' style={{ width: "100%", height: "90vh" }}>
                  <Spinner variant='outlined' />
                </div>
              :
              <div className={Classes['trending-searches']}>
                <span>Trending Searches...</span>
                <ul>
                  <li>Upcoming Exams</li>
                  <li>"IIT" in Colleges</li>
                  <li>"CAT" in Exams</li>
                  <li>"CAT Cutoff" in News</li>
                  <li>"MBA Colleges" in Delhi/NCR</li>
                  <li>"MCA Colleges" in Delhi/NCR</li>
                </ul>
              </div>
          }
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default SearchModal