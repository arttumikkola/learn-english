import React, { useState, useEffect } from "react";
import "./WordComponent.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { Link } from "react-router-dom";
import { HiSwitchHorizontal } from "react-icons/hi";
import axios from "axios";
//User table when entering English words
function EnglishWordComponent(props) {
  const [words, setWords] = useState([]); //State for an array which holds all the Finnish words shown in the table
  const [gridApi, setGridApi] = useState(); //State for the Ag Grids APIs
  const [score, setScore] = useState(0); //State for the users score
  const [gameEnded, setGameEnded] = useState(false); //State for the games current situation
  //Gets all the Finnish words from backend
  useEffect(() => {
    axios.get("http://localhost:8080/Words/finnish").then(({ data }) => {
      setWords(data);
    });
  }, []);
  //Checks if entered word is correct
  async function checkWord(e) {
    return new Promise((resolve, reject) => {
      axios
        .post(`http://localhost:8080/Words/${e.data.id}/check2`, {
          english: e.data.english,
        })
        .then((res) => {
          resolve(res.data);
        });
    });
  }
  //Receives the grid APIs from AG Grid
  function onGridReady(params) {
    setGridApi(params.api);
  }
  return (
    <div>
      <div className="ag-theme-alpine">
        <div className="switchLanguage">
          {/*Button to switch the user view to entering Finnish words*/}
          <Link to="/">
            <HiSwitchHorizontal className="switchIcon"></HiSwitchHorizontal>
          </Link>
          <h3 className="score">Your Score: {score}</h3>
        </div>
        <AgGridReact rowData={words} onGridReady={onGridReady}>
          <AgGridColumn field="finnish"></AgGridColumn>
          <AgGridColumn field="english" editable></AgGridColumn>
        </AgGridReact>
        {/*Checks if the game has ended, if not, shows the button the check score,
        if yes, shows the button to restart game*/}
        {gameEnded ? (
          <button
            onClick={() => {
              gridApi.forEachNode((node, index) => {
                node.setData({
                  id: node.data.id,
                  finnish: node.data.finnish,
                  english: "",
                });
                setScore(0);
              });
              setGameEnded(false);
            }}
            className="submitButton"
          >
            Restart
          </button>
        ) : (
          <button
            onClick={() => {
              gridApi.forEachNode(async (node, index) => {
                const data = await checkWord(node);
                if (!data.correct) {
                  node.setData({
                    id: node.data.id,
                    finnish: node.data.english,
                    english: "wrong",
                  });
                } else {
                  setScore((score) => score + 1);
                }
              });
              setGameEnded(true);
            }}
            className="submitButton"
          >
            Check Score
          </button>
        )}
      </div>
    </div>
  );
}

export default EnglishWordComponent;
