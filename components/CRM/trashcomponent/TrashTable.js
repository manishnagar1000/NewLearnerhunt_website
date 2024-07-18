import React from "react";

const TrashTable = ({ clgList, dataId, handleRestore }) => (
  <div className="table-responsive">
    <table className="table table-hover">
      <thead>
        <tr>
          {dataId == "1" && (
            <>
              <th>#</th>
              <th>College Name</th>
              <th>Approved By</th>
              <th>State</th>
              <th>Action</th>
            </>
          )}
          {dataId == "2" && (
            <>
              <th>#</th>
              <th>Course Name</th>
              <th>Course Type</th>
              <th>Action</th>
            </>
          )}
          {dataId == "3" && (
            <>
              <th>#</th>
              <th>Exam Name</th>
              <th>Action</th>
            </>
          )}
           {dataId == "4" && (
            <>
              <th>#</th>
              <th>Blog Title</th>
              <th>Author Name</th>
              <th>Action</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {clgList.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            {dataId == "1" && (
              <>
                <td>{item.college_name}</td>
                <td>{item.approved_by}</td>
                <td>{item.state}</td>
              </>
            )}
            {dataId == "2" && (
                <>
                <td>{item.course_name}</td>
                <td>{item.type}</td>
                </>
            )}
            {dataId == "3" && <td>{item.exam_name}</td>}
            {dataId == "4" && (
                <>
                <td>{item.title}</td>
                <td>{item.author_name}</td>
                </>
            )}
            <td>
              <button
                type="button"
                className="btn btn-success"
                onClick={(e) => handleRestore(e, item._id)}
              >
                Restore
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TrashTable;
