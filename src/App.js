import React from "react";
import Table from "./Table.js";
import "./App.css";

const App = () => {
  return (
    <div>
      <div className="App-header">
        <p>Periodic Table</p>
      </div>

      <div className="App">
        <Table />
      </div>
    </div>
  );
};

export default App;
