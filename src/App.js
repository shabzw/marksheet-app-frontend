import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Alert from "./components/Alert";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useState } from "react";
import Staff from "./pages/Staff";
import Marksheet from "./pages/Marksheet";
import ResultState from "./context/results/ResultState";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  return (
    <>
      <ResultState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route
                exact
                path="/staff"
                element={<Staff showAlert={showAlert} />}
              />
              <Route exact path="/about" element={<About />} />
              <Route
                exact
                path="/marksheet/:id"
                element={<Marksheet showAlert={showAlert} />}
              />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </ResultState>
    </>
  );
}

export default App;
