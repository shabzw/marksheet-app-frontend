import React, { Fragment } from "react";

export default function ReadMarksRow({
  tableCellStyle,
  result,
  resultDisplay,
  formatDate,
  index
}) {
  const tableHeaderStyle = {
    ...tableCellStyle, // Apply cell styles to headers
    backgroundColor: "rgb(205, 235, 253)",
    // Additional header style
  };
  return (
    <Fragment>
      {resultDisplay && (
        <tr>
          <td style={tableHeaderStyle}>{index+1}</td>
          <td style={tableHeaderStyle}>{result?.subjectName}</td>
          <td style={tableHeaderStyle}>{result?.passingMarks}</td>
          <td style={tableHeaderStyle}>{result?.marksScored}</td>
          <td style={tableHeaderStyle}>{result?.grade}</td>
          <td style={tableHeaderStyle}>{result?.remarks}</td>
          <td style={tableHeaderStyle}>
            {formatDate(new Date(result?.lastUpdated))}
          </td>
        </tr>
      )}
    </Fragment>
  );
}
