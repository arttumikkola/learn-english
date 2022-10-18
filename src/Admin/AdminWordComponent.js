import React, { useState, useEffect } from "react";
import "./AdminWordComponent.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
//Admin table to add, update and delete words in the user table
function AdminWordComponent() {
  const [words, setWords] = useState([]);
  const [gridApi, setGridApi] = useState();
  //Gets the words from backend
  useEffect(() => {
    axios.get("http://localhost:8080/Words").then(({ data }) => {
      setWords(data);
    });
  }, []);

  const [word, setWord] = useState("");
  const [word2, setWord2] = useState("");
  //Sends new words to backend
  const addNewWord = () => {
    axios
      .post("http://localhost:8080/Words", {
        english: word,
        finnish: word2,
      })
      .then((res) => {
        const id = res.data.insertId;
        setWords([...words, { english: word, finnish: word2, id: id }]);
        setWord("");
        setWord2("");
      });
  };
  //Deletes word from backend
  const deleteWord = () => {
    const row = gridApi.getSelectedNodes()[0];
    axios.delete(`http://localhost:8080/Words/${row.data.id}`);
    setWords([...words.filter((word) => word.id !== row.data.id)]);
  };
  //Receives the grid APIs from AG Grid
  function onGridReady(params) {
    setGridApi(params.api);
  }

  return (
    <div className="ag-theme-alpine">
      <AgGridReact
        rowSelection="single"
        onGridReady={onGridReady}
        rowData={words}
      >
        <AgGridColumn field="english" editable></AgGridColumn>
        <AgGridColumn field="finnish" editable></AgGridColumn>
      </AgGridReact>
      <input
        className="input"
        type="text"
        value={word}
        placeholder="English"
        onChange={(e) => setWord(e.target.value)}
      ></input>
      <input
        className="input"
        type="text"
        value={word2}
        placeholder="Finnish"
        onChange={(e) => setWord2(e.target.value)}
      ></input>
      <button className="addButton" onClick={addNewWord}>
        Add word
      </button>
      <button className="deleteButton" onClick={deleteWord}>
        Delete word
      </button>
    </div>
  );
}

export default AdminWordComponent;
