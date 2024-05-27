import React, { useState } from "react";
import ResultContext from "./resultContext";

const ResultState = (props) => {
  const [results, setResults] = useState([localStorage.getItem("updatedData")]);

  return (
    <ResultContext.Provider value={{ results, setResults }}>
      {props.children};
    </ResultContext.Provider>
  );
};

export default ResultState;
