import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function ReadOnlyRow({
  contact,
  handleEditClick,
  handleDeleteClick,
  tableCellStyle,
  studentData,
  result,
  formatDate,
}) {
  const tableHeaderStyle = {
    ...tableCellStyle, // Apply cell styles to headers
    backgroundColor: "rgb(205, 235, 253)",
    // Additional header style
  };
  const tableActionsStyle = {
    ...tableCellStyle, // Apply cell styles to headers
    // backgroundColor: 'rgb(205, 235, 253)',
    display: "flex",
    gap: "2px",
    justifyContent: "space-evenly",
    // Additional header style
  };

  return (
    <Fragment>
      {studentData && (
        <tr>
          <td style={tableHeaderStyle}>{contact?._id}</td>
          <td style={tableHeaderStyle}>{contact?.name}</td>
          <td style={tableHeaderStyle}>{contact?.gender}</td>
          <td style={tableHeaderStyle}>{contact?.phoneNo}</td>
          <td style={tableHeaderStyle}>{contact?.email}</td>
          <td style={tableHeaderStyle}>
            {formatDate(new Date(contact?.date))}
          </td>
          <td style={tableHeaderStyle}>
            {<Link to={"/marksheet/" + contact?._id}>Click</Link>}
          </td>
          <td style={tableActionsStyle}>
            <button
              type="button"
              onClick={(event) => handleEditClick(event, contact)}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => handleDeleteClick(contact._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      )}
      {!studentData && (
        <tr>
          <td style={tableHeaderStyle}>{result?.idNumber}</td>
          <td style={tableHeaderStyle}>{result?.subjectName}</td>
          <td style={tableHeaderStyle}>{result?.passingMarks}</td>
          <td style={tableHeaderStyle}>{result?.marksScored}</td>
          <td style={tableHeaderStyle}>{result?.grade}</td>
          <td style={tableHeaderStyle}>{result?.remarks}</td>
          <td style={tableHeaderStyle}>
            {formatDate(new Date(result?.lastUpdated))}
          </td>
          <td style={tableActionsStyle}>
            <button
              type="button"
              onClick={(event) => handleEditClick(event, result)}
            >
              Edit
            </button>
            <button type="button" onClick={() => handleDeleteClick(result._id)}>
              Delete
            </button>
          </td>
        </tr>
      )}
    </Fragment>
  );
}
