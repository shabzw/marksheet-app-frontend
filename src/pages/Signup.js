import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loadingGIF from "../Assets/loading.gif";

const Signup = (props) => {

  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    role: "student",
    gender: "male",
    classN: "class1-A",
    phoneNo: "",
  });

  let navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  //Submit the form for signing up
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, role, gender, classN, phoneNo, secretKey } = credentials;

    if (credentials.password !== credentials.cpassword) {
      return props.showAlert("Passwords don't match", "danger");
    }
    setLoading(true);
    //API call for creating user
    const response = await fetch(`${API_BASE_URL}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        gender: gender,
        classN: classN,
        phoneNo: phoneNo,
        role: role,
        secretKey: secretKey,
      }),
    });

    const json = await response.json();

    if (json.success) {
      setLoading(false);
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("role", credentials.role);
      const curData = json.loggedInData;
      const curUserData = JSON.stringify(curData[0]);
      localStorage.setItem("curUserData", curUserData);
      //Verify credentials of user to direct corresponding landing page based on access
      if (credentials.role === "staff") {
        navigate("/staff");
      } else {
        navigate("/");
      }
      props.showAlert("Account created Successfully!!", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
      setLoading(false);
      navigate("/signup");
    }

  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (e.target.value === "staff") {
      setUserRole(e.target.value);
    } else if (e.target.value === "student") {
      setUserRole("");
    }
  };

  return (
    <div className="container mt-2">
      {/* Display loading GIF until API sends a valid response */}
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <img
            className=""
            style={{ width: "30%" }}
            src={loadingGIF}
            alt="Loading..."
          />
          <div>Please Wait</div>
        </div>
      ) : (
        <div>
          <h1>SignUp to continue to myMarksheet</h1>
          <form onSubmit={handleSubmit}>
            {/* //Signup Form */}
            <div className="mb-3">
              <label
                htmlfor="name"
                className="form-label"
                style={{ marginTop: "15px" }}
              >
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={onChange}
                aria-describedby="emailHelp"
              />

              <label
                htmlfor="email"
                className="form-label"
                style={{ marginTop: "15px" }}
              >
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onChange={onChange}
                aria-describedby="emailHelp"
              />

              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlfor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={onChange}
                required
                minLength={5}
              />
            </div>
            <div>
              <label htmlfor="cpassword" className="form-label">
                Comfirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                name="cpassword"
                onChange={onChange}
                required
                minLength={5}
              />
            </div>
            <label
              htmlfor="role"
              style={{ marginTop: "15px" }}
              className="form-label"
            >
              Select Role
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={onChange}
              name="role"
            >
              <option value="student">Student</option>
              <option value="staff">Staff</option>
            </select>
            {userRole == "staff" && (
              <div className="mt-3">
                <label htmlfor="secretKey" className="form-label">
                  Secret Key (Note: For testing purpose, use the value as
                  "$taFF1Sh3r3")
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="secretKey"
                  name="secretKey"
                  onChange={onChange}
                  required
                  minLength={5}
                />
              </div>
            )}
            <label
              htmlfor="gender"
              style={{ marginTop: "15px" }}
              className="form-label"
            >
              Select Gender
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  [e.target.name]: e.target.value,
                })
              }
              name="gender"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <label
              htmlfor="classN"
              className="form-label"
              style={{ marginTop: "15px" }}
            >
              Select Class
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  [e.target.name]: e.target.value,
                })
              }
              name="classN"
            >
              <option value="class1-A">Class1-A</option>
              <option value="class1-B">Class1-B</option>
              <option value="class1-C">Class1-C</option>
              <option value="class2-A">Class2-A</option>
              <option value="class2-B">Class2-B</option>
              <option value="class2-C">Class2-C</option>
            </select>
            <div className="mb-3">
              <label
                htmlfor="phoneNo"
                className="form-label"
                style={{ marginTop: "15px" }}
              >
                Phone Number
              </label>
              <input
                type="number"
                className="form-control"
                id="phoneNo"
                name="phoneNo"
                onChange={onChange}
                required
                minLength={5}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginBottom: "15px" }}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Signup;
