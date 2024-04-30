import React, { useContext, useState, Fragment, useEffect } from "react";
import noteContext from "../context/results/noteContext";
import ReadMarksRow from "./ReadMarksRow";
import { useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";

export default function Home(props) {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const context = useContext(noteContext);
  const { results, setResults } = context;
  const [resultDisplay, setResultDisplay] = useState(true);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(localStorage.getItem("userInfo"));
  const [resultFetched, setResultFetched] = useState(false);
  const [totalMarks, setTotalMarks] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const response = fetch(`${API_BASE_URL}/api/auth/getuserinfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse the JSON from the response
        })
        .then((data) => {
          const userInfo = data;
          localStorage.setItem("userInfo", userInfo);
          setUserInfo(data);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    // Use reduce to sum up the marksScored values
    const totalMarksScored = results.reduce((total, formData) => {
      // Convert marksScored to a number and add it to the total
      return total + Number(formData?.marksScored);
    }, 0);
    setTotalMarks(totalMarksScored);
  }, [results]);


  var role = localStorage.getItem("role");
  if (role && role != "student") {
    navigate("/login");
    props.showAlert("Log In as Student to access this page", "success");
  }

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
  const showResults = () => {
    if (localStorage.getItem("token")) {
      const response = fetch(`${API_BASE_URL}/api/marks/getmarks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
          studentId: userInfo._id,
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
          setResults(data);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    } else {
      navigate("/login");
    }
    setResultFetched(!resultFetched);
  };
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
      <UserDetails userInfo={userInfo} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "1rem",
        }}
      >
        <button
          type="button"
          class="btn btn-success"
          style={{ maxWidth: "500px", margin: "auto" }}
          onClick={showResults}
        >
          Check Results
        </button>
        {resultFetched && (
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              fontSize: "18px", // Adjust font size for smaller screens
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>ID Number</th>
                    <th style={tableHeaderStyle}>Subjects</th>
                    <th style={tableHeaderStyle}>Passing Marks</th>
                    <th style={tableHeaderStyle}>Marks Scored</th>
                    <th style={tableHeaderStyle}>Grade</th>
                    <th style={tableHeaderStyle}>Remarks</th>
                    <th style={tableHeaderStyle}>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => (
                    <Fragment key={result?._id}>
                      <ReadMarksRow
                        tableCellStyle={tableCellStyle}
                        result={result}
                        resultDisplay={resultDisplay}
                        formatDate={formatDate}
                      />
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 style={{ marginTop: "10px" }}>
          Total Marks Scored:{" "}
          <span class="badge text-bg-success">{totalMarks}</span>
        </h4>

          </form>
        )}
        

      </div>
    </>
  );
}
