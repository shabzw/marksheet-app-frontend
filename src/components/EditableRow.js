import React, { Fragment } from "react";

export default function EditableRow({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  tableCellStyle,
  studentData,
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
          <td style={tableHeaderStyle}>
            <input
              disabled
              type="text"
              required="required"
              placeholder="Not Editable"
              name="_id"
              value={editFormData._id}
              onChange={handleEditFormChange}
            />
          </td>
          <td style={tableHeaderStyle}>
            <input
              type="text"
              required="required"
              placeholder="Enter Name"
              name="name"
              value={editFormData.name}
              onChange={handleEditFormChange}
            />
          </td>
          <td style={tableHeaderStyle}>
            <input
              type="text"
              required="required"
              placeholder="Gender"
              name="gender"
              value={editFormData.gender}
              onChange={handleEditFormChange}
            />
          </td>
          <td style={tableHeaderStyle}>
            <input
              type="text"
              required="required"
              placeholder="Enter Phone Number"
              name="phoneNo"
              value={editFormData.phoneNo}
              onChange={handleEditFormChange}
            />
          </td>
          <td style={tableHeaderStyle}>
            <input
              type="text"
              required="required"
              placeholder="Enter Email"
              name="email"
              value={editFormData.email}
              onChange={handleEditFormChange}
            />
          </td>
          <td style={tableHeaderStyle}>
            <input
              disabled
              type="text"
              required="required"
              placeholder="Not Editable"
              name="date"
              value={editFormData.date}
              onChange={handleEditFormChange}
            />
          </td>
          <td style={tableHeaderStyle}>
            <input
              disabled
              type="text"
              required="required"
              placeholder="Enter Link"
              name="link"
            />
          </td>
          <td style={tableActionsStyle}>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </td>
        </tr>
      )}
      {!studentData && (
        <tr>
          <td style={tableHeaderStyle}>
            <input
              disabled
              type="text"
              required="required"
              placeholder="Not Editable"
              name="_id"
              value={editFormData._id}
              onChange={handleEditFormChange}
            />
          </td>
          <td style={tableHeaderStyle}>
            <input
              type="text"
              required="required"
              placeholder="Enter Subject name"
              name="subjectName"
              value={editFormData.subjectName}
              onChange={handleEditFormChange}
            />
          </td>
          <td style={tableHeaderStyle}>
            <input
              type="text"
              required="required"
              placeholder="Enter Passing Marks"
              name="passingMarks"
              value={editFormData.passingMarks}
              onChange={handleEditFormChange}
            />
          </td>
          <td style={tableHeaderStyle}>
            <input
              type="text"
              required="required"
              placeholder="Enter marks Scored"
              name="marksScored"
              value={editFormData.marksScored}
              onChange={handleEditFormChange}
            />
          </td>
          <td style={tableHeaderStyle}>
            <input
              type="text"
              required="required"
              placeholder="Enter Grade"
              name="grade"
              value={editFormData.grade}
              onChange={handleEditFormChange}
            />
          </td>
          <td style={tableHeaderStyle}>
            <input
              type="text"
              required="required"
              placeholder="Enter Remarks"
              name="remarks"
              value={editFormData.remarks}
              onChange={handleEditFormChange}
            />
          </td>
          <td style={tableHeaderStyle}>
            <input
              disabled
              type="text"
              required="required"
              placeholder="Not Editable"
              name="lastUpdated"
              value={editFormData.lastUpdated}
              onChange={handleEditFormChange}
            />
          </td>
          <td style={tableActionsStyle}>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </td>
        </tr>
      )}
    </Fragment>
  );
}
