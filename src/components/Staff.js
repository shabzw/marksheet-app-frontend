// import '../Table.css';
import { useState, Fragment, useEffect } from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import { useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";

function Staff(props) {
  const curUserData = localStorage.getItem("curUserData");
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [contacts, setContacts] = useState([
    localStorage.getItem("updatedData"),
  ]);
  const [classValue, setClassValue] = useState(localStorage.getItem("classVal"));
localStorage.setItem("classVal", classValue)
  const [editData, setEditData] = useState(false);
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [sortType, setSortType] = useState(""); // 'name' or 'dateAdded'
  const [sortByButton, setSortByButton] = useState(true);

  const [editFormData, setEditFormData] = useState({
    name: "",
    gender: "",
    phoneNo: "",
    email: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  var role = localStorage.getItem("role");

  if (role != "staff") {
    navigate("/login");
    props.showAlert("Log In as Staff to access this page", "success");
  }

  const handleSearch = () => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (normalizedQuery === "") {
      setFilteredContacts([]);
      setSortByButton(true);
    } else {
      const filtered = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(normalizedQuery)
      );
      setFilteredContacts(filtered);
      setSortByButton(false);
    }
  };

  const handleSort = (selectedSortType) => {
    // Create a copy of filteredContacts to avoid mutating state directly
    setSortType(selectedSortType);

    const sortedContacts = [...filteredContacts];

    if (selectedSortType === "name") {
      sortedContacts.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
      setFilteredContacts(sortedContacts);
    } else if (selectedSortType === "dateAdded") {
      sortedContacts.sort((a, b) => {
        const dateA = new Date(a.dateAdded);
        const dateB = new Date(b.dateAdded);

        // Compare dateB to dateA for descending order
        if (dateA < dateB) return 1;
        if (dateA > dateB) return -1;
        return 0;
      });

      // Update the filteredContacts state with the sorted array
      setFilteredContacts(sortedContacts);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const response = fetch(`${API_BASE_URL}/api/auth/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
          classValue: classValue,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse the JSON from the response
        })
        .then((data) => {
          const fetchedData = data;
          localStorage.setItem("updatedData", fetchedData);
          // localStorage.setItem("updatedData", json)
          setContacts(data);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    } else {
      navigate("/login");
    }
  }, [classValue]);

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact._id);
    setEditData(true);

    const formValues = {
      _id: contact._id,
      name: contact.name,
      gender: contact.gender,
      phoneNo: contact.phoneNo,
      email: contact.email,
      // dateAdded: contact.dateAdded,
      date: contact.date,
    };
    setEditFormData(formValues);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editFormData._id,
      name: editFormData.name,
      gender: editFormData.gender,
      phoneNo: editFormData.phoneNo,
      email: editFormData.email,
      // classN: editFormData.classN,
    };

    const response = fetch(`${API_BASE_URL}/api/auth/edituser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        editedContact,
        classValue,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        setContacts(data);
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
    const response = fetch(`${API_BASE_URL}/api/auth/deleteuser`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        contactId,
        classValue,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        setContacts(data);
        props.showAlert("Data deleted successfully", "success");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const tableCellStyle = {
    border: "1px solid #ffffff",
    textAlign: "left",
    padding: "8px",
    fontSize: "20px",
  };

  const tableHeaderStyle = {
    ...tableCellStyle, // Apply cell styles to headers
    backgroundColor: "rgb(117, 201, 250)", // Additional header style
  };

  const handleClear = () => {
    setSearchQuery("");
  };
  useEffect(() => {
    handleSearch(); // Trigger search logic whenever searchQuery changes
  }, [searchQuery, contacts]);

  const [studentData, setStudentData] = useState(true);

  const currentData = JSON.parse(curUserData);

  const formatDate = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString();
      return `${formattedDate} ${formattedTime}`;
    }
    return ""; // Return empty string if date is not valid
  };
  return (
    <>
      <UserDetails userInfo={currentData} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "1rem",
        }}
      >
        <div>
          <label
            htmlfor="classN"
            className="form-label"
            style={{ marginTop: "15px" }}
          >
            Select Class
          </label>
          <select
          value={localStorage.getItem("classVal")}
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setClassValue(e.target.value)}
            name="classN"
          >
            {/* <option selected>Select</option> */}
            <option>Select</option>
            <option value="class1-A">Class1-A</option>
            <option value="class1-B">Class1-B</option>
            <option value="class1-C">Class1-C</option>
            <option value="class2-A">Class2-A</option>
            <option value="class2-B">Class2-B</option>
            <option value="class2-C">Class2-C</option>
          </select>
        </div>

        {/* {classValue && ( */}
          <>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <h1 style={{ marginBottom: "15px" }}>
                Store your data in the most secure place in{" "}
                <strong>tabData</strong>
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent:"center" }}>
    <input
      type="text"
      placeholder="Search by name..."
      value={searchQuery}
      onChange={handleInputChange}
      style={{
        flex: "1", // Allow the input to grow and take available space
        padding: "8px", // Padding around the input text
        fontSize: "16px", // Font size of the input text
        maxWidth: "400px", // Set a maximum width for the input
      }}
    />
    <button
      onClick={handleClear}
      type="button"
      className="btn btn-secondary btn-sm"
      style={{ padding: "8px", fontSize: "16px" }}
    >
      Clear
    </button>
  </div>
  <div style={{ display: "flex", justifyContent: "center", alignItems:"center"}}>
    <label htmlFor="sortSelect" style={{ marginRight: "5px", fontSize: "16px" }}>
      Sort By:
    </label>
    <select
      disabled={sortByButton}
      id="sortSelect"
      value={sortType}
      onChange={(e) => handleSort(e.target.value)}
      style={{ padding: "8px", fontSize: "16px", maxWidth: "100%" }}
    >
      <option value="">Select</option>
      <option value="name">Name (A-Z)</option>
      <option value="dateAdded">Date Added (Recent First)</option>
    </select>
  </div>
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
                      <th style={tableHeaderStyle}>ID Number</th>
                      <th style={tableHeaderStyle}>Name</th>
                      <th style={tableHeaderStyle}>Gender</th>
                      <th style={tableHeaderStyle}>Phone Number</th>
                      <th style={tableHeaderStyle}>Email</th>
                      <th style={tableHeaderStyle}>Date Added</th>
                      <th style={tableHeaderStyle}>Marksheet</th>
                      <th style={tableHeaderStyle}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(filteredContacts.length > 0
                      ? filteredContacts
                      : contacts
                    ).map((contact) => (
                      <Fragment key={contact?._id}>
                        {editContactId === contact?._id ? (
                          <EditableRow
                            tableCellStyle={tableCellStyle}
                            editFormData={editFormData}
                            handleEditFormChange={handleEditFormChange}
                            handleCancelClick={handleCancelClick}
                            studentData={studentData}
                          />
                        ) : (
                          <ReadOnlyRow
                            tableCellStyle={tableCellStyle}
                            contact={contact}
                            handleEditClick={handleEditClick}
                            handleDeleteClick={handleDeleteClick}
                            studentData={studentData}
                            formatDate={formatDate}
                          />
                        )}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </form>
          </>
      </div>
    </>
  );
}

export default Staff;
