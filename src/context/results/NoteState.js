import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const [results, setResults] = useState([localStorage.getItem("updatedData")]);

  return (
    <NoteContext.Provider value={{ results, setResults }}>
      {props.children};
    </NoteContext.Provider>
  );
};

export default NoteState;
