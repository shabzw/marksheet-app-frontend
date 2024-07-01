// import '../Table.css';
import { useState, Fragment, useEffect, useContext } from "react";
import EditableRow from "../components/EditableRow";
import { useNavigate, useParams } from "react-router-dom";
import ReadOnlyRow from "../components/ReadOnlyRow";
import resultContext from "../context/results/resultContext";

function Marksheet(props) {
  const params = useParams();
  const context = useContext(resultContext);
  const { results, setResults } = context;
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [editData, setEditData] = useState(false);
  const [addFormData, setAddFormData] = useState({
    subjectName: "",
    grade: "",
    passingMarks: "",
    marksScored: "",
    remarks: "",
  });

  const [totalMarks, setTotalMarks] = useState("");

  const [editFormData, setEditFormData] = useState({
    subjectName: "",
    grade: "",
    passingMarks: "",
    marksScored: "",
    remarks: "",
    lastUpdated: ""
  });

  var role = localStorage.getItem("role");

  const [editContactId, setEditContactId] = useState(null);
  if (role != "staff") {
    navigate("/login");
    props.showAlert("Log In as Staff to access this page", "success");
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      //API call to fetch marks of the student
      const response = fetch(`${API_BASE_URL}/api/marks/getmarks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
          studentId: params.id,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse the JSON from the response
        })
        .then((data) => {
          //marks are fetched successfully
          const fetchedData = data;
          localStorage.setItem("updatedData", fetchedData);
          setResults(data);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    } else {
      navigate("/login");
    }
  }, []);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    //Add the input data inside newFormData
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    //Add the edited input data inside newFormData
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  useEffect(() => {
    // Use reduce to sum up the marksScored values
    const totalMarksScored = results.reduce((total, formData) => {
      // Convert marksScored to a number and add it to the total
      return total + Number(formData?.marksScored);
    }, 0);
    setTotalMarks(totalMarksScored);
  }, [results]);

  const handleAddFormSubmit = async (event) => {
    event.preventDefault();
    //set newSubject variable with newly added subject data
    const newSubject = {
      subjectName: addFormData.subjectName,
      grade: addFormData.grade,
      marksScored: addFormData.marksScored,
      passingMarks: addFormData.passingMarks,
      remarks: addFormData.remarks,
    };

    //API call for adding new marks data
    const response = fetch(`${API_BASE_URL}/api/marks/addmarks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        studentId: params.id,
      },
      body: JSON.stringify({
        newSubject,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        setResults(data);
        props.showAlert("Data added successfully", "success");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleEditClick = (event, result) => {
    event.preventDefault();
    setEditContactId(result._id);
    setEditData(true);

    const formValues = {
      //To prepopulate subject data while editing
      _id: result._id,
      subjectName: result.subjectName,
      grade: result.grade,
      marksScored: result.marksScored,
      passingMarks: result.passingMarks,
      remarks: result.remarks,
      lastUpdated: result.lastUpdated,
    };
    setEditFormData(formValues);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedSubject = {
      //Edited data of subjects
      id: editFormData._id,
      subjectName: editFormData.subjectName,
      grade: editFormData.grade,
      passingMarks: editFormData.passingMarks,
      marksScored: editFormData.marksScored,
      remarks: editFormData.remarks,
      lastUpdated: formatDate(new Date())
    };

    //API call for editing marks
    const response = fetch(`${API_BASE_URL}/api/marks/editmarks`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        studentId: params.id,
      },
      body: JSON.stringify({
        editedSubject,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        setResults(data);
        props.showAlert("Data has been updated successfully", "success");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
    setEditContactId(null);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    //API call for deleting Subject data
    const response = fetch(`${API_BASE_URL}/api/marks/deletemarks`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        studentId: params.id,
      },
      body: JSON.stringify({
        contactId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        setResults(data);
        props.showAlert("Data deleted successfully", "success");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const tableCellStyle = {
    // Apply cell styles
    border: "1px solid #ffffff",
    textAlign: "left",
    padding: "8px",
    fontSize: "20px",
  };

  const tableHeaderStyle = {
    ...tableCellStyle, // Apply cell styles to headers
    backgroundColor: "rgb(117, 201, 250)", // Additional header style
  };

  const formatDate = (date) => {
    //Date format conversion
    if (date instanceof Date && !isNaN(date)) {
      const formattedDate = date.toLocaleDateString('en-IN');
      const formattedTime = date.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
      return `${formattedDate} ${formattedTime}`;
    }
    return ""; // Return empty string if date is not valid
  };

  // const editDate = formatDate(new Date())

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "1rem",
      }}
    >
      <>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <h1 style={{ marginBottom: "15px" }}>
            Store your data in the most secure place in{" "}
            <strong>myMarksheet</strong>
          </h1>
        </div>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            fontSize: "18px", // Adjust font size for smaller screens
          }}
          onSubmit={handleEditFormSubmit}
        >
          <div style={{ overflowX: "auto" }}>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Serial Number</th>
                  <th style={tableHeaderStyle}>Subjects</th>
                  <th style={tableHeaderStyle}>Passing Marks</th>
                  <th style={tableHeaderStyle}>Marks Scored</th>
                  <th style={tableHeaderStyle}>Grade</th>
                  <th style={tableHeaderStyle}>Remarks</th>
                  <th style={tableHeaderStyle}>Last Updated</th>
                  <th style={tableHeaderStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <Fragment key={result?._id}>
                    {editContactId === result?._id ? (
                      //Display edit form when clicked on edit button
                      <EditableRow
                        tableCellStyle={tableCellStyle}
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                        index={index}
                        // formatDate={formatDate}
                      />
                    ) : (
                      //Display read only form as default
                      <ReadOnlyRow
                        tableCellStyle={tableCellStyle}
                        result={result}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                        formatDate={formatDate}
                        index={index}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </form>

        <h4 style={{ marginTop: "10px" }}>
          Total Marks Scored:{" "}
          <span class="badge text-bg-success">{totalMarks}</span>
        </h4>

        <h2 style={{ marginTop: "12px" }}>
          Add a result using the below form -
        </h2>
        <form
          style={{
            display: "flex",
            flexDirection: "column", // Stack form elements vertically
            gap: "10px", // Add spacing between form elements
            maxWidth: "400px", // Limit form width
            margin: "0 auto", // Center align the form
            padding: "20px", // Add padding around the form
            fontSize: "19px",
          }}
          onSubmit={handleAddFormSubmit}
        >
          <input
            type="text"
            name="subjectName"
            required="required"
            placeholder="Enter Subject Name"
            onChange={handleAddFormChange}
          />
          <input
            type="text"
            name="grade"
            required="required"
            placeholder="Enter Grade"
            onChange={handleAddFormChange}
          />
          <input
            type="text"
            name="marksScored"
            required="required"
            placeholder="Enter Marks Scored"
            onChange={handleAddFormChange}
          />
          <input
            type="text"
            name="passingMarks"
            required="required"
            placeholder="Enter Passing Marks"
            onChange={handleAddFormChange}
          />
          <input
            type="text"
            name="remarks"
            required="required"
            placeholder="Enter Remarks"
            onChange={handleAddFormChange}
          />
          <button type="submit">Add Data</button>
        </form>
      </>
    </div>
  );
}

export default Marksheet;