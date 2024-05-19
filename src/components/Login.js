import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loadingGIF from "../Assets/loading.gif"

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Logged In Successfully", "success");
      setLoading(false)
      const curData = json.loggedInData;
      const curUserData = JSON.stringify(curData[0]);
      localStorage.setItem("curUserData", curUserData);
      const role = json.loggedInData[0].role;
      localStorage.setItem("role", role);
      if (role === "staff") {
        navigate("/staff");
      } else {
        navigate("/");
      }
    } else {
      props.showAlert("Invalid Credentials", "danger");
      setLoading(false)
      navigate("/login")
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-2">
      {loading ? (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <img
    className=""
      style={{ width: "30%" }}
      src={loadingGIF}
      alt="Loading..."
    /><div>Please Wait</div>
  </div>
) : (
  <div>
      <h1>Login to continue to myMarksheet</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlfor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
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
            name="password"
            value={credentials.password}
            onChange={onChange}
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      </div>
)}
    </div>
  );
};

export default Login;
