import React ,{useState,useEffect} from 'react'
import { collegeperexcle } from "/components/Comps/type";
import Table from 'react-bootstrap/Table';
import Tablenav from "../Comps/Tablenav";

export default function CollegePercent() {
    const [searchInput, setSearchInput] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
        const filtered = collegeperexcle.filter((data) =>
          data.College.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredData(filtered);
        setTotalCount(filtered.length); // Update total count based on filtered data
      }, [collegeperexcle, searchInput]);
      
    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
      };
    
    
  return (
    <div>
         <Tablenav
              TotalCount={{
                Total: (
                  <h5>
                    Total Count :
                    {totalCount}
                  </h5>
                ),
              }}
              Actions={{
                Actions: (
                  <div className="d-flex justify-content-between align-items-center">
                      <input
        type="text"
        className="form-control"
        value={searchInput}
        placeholder="Search by College name..."
        onChange={handleSearchChange}
      />
                          
                  </div>
                ),
              }}
            />
            <div style={{ maxHeight: '700px', overflowY: 'auto' }}>
    <Table  bordered hover>
      <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f2f2f2', zIndex: 1 }}>
        <tr>
          <th>College</th>
          <th>Remarks 1 to 10</th>
          <th>Remarks <span style={{fontWeight:'bold',fontSize:'18px'}}>&gt;</span> 10</th>
          <th>Remarks <span style={{fontWeight:'bold',fontSize:'18px'}}>&gt;</span> 20</th>
        </tr>
      </thead>
      <tbody>
  {filteredData.length > 0 ? (
    filteredData.map((data, index) => (
      <tr key={index}>
        <td>{data.College}</td>
        <td>{data.remarks1to10}</td>
        <td>{data.remarks10}</td>
        <td>{data.remarks20}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={4} style={{textAlign:"center"}}>No records found.</td>
    </tr>
  )}
</tbody>
    </Table>
    </div>
    </div>
  )
}
