import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [isPlayerTurn, setPlayerTurn] = useState(true);
  const [score, setScore] = useState([0, 0]);
  const [stones, setStones] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const line1 = stones[0] + stones[1] + stones[2];
    const line2 = stones[3] + stones[4] + stones[5];
    const line3 = stones[6] + stones[7] + stones[8];
    const line4 = stones[0] + stones[3] + stones[6];
    const line5 = stones[1] + stones[4] + stones[7];
    const line6 = stones[2] + stones[5] + stones[8];
    const line7 = stones[0] + stones[4] + stones[8];
    const line8 = stones[2] + stones[4] + stones[6];

    const lines = [line1, line2, line3, line4, line5, line6, line7, line8];

    const line1State = line1 === 33 || line1 === 69;
    const line2State = line2 === 33 || line2 === 69;
    const line3State = line3 === 33 || line3 === 69;
    const line4State = line4 === 33 || line4 === 69;
    const line5State = line5 === 33 || line5 === 69;
    const line6State = line6 === 33 || line6 === 69;
    const line7State = line7 === 33 || line7 === 69;
    const line8State = line8 === 33 || line8 === 69;

    const lineStates = [
      line1State,
      line2State,
      line3State,
      line4State,
      line5State,
      line6State,
      line7State,
      line8State,
    ];

    if (lineStates.some((v) => v)) {
      lines.forEach((eachLineState, id) => {
        if (eachLineState === 33) {
          setScore((score) => {
            score[0] += 1;
            return score;
          });
          setStones([0, 0, 0, 0, 0, 0, 0, 0, 0]);
          const allTds = document.querySelectorAll("tbody td");
          allTds.forEach((td) => {
            td.className = "";
          });
        }
        if (eachLineState === 69) {
          setScore((score) => {
            score[1] += 1;
            return score;
          });
          setStones([0, 0, 0, 0, 0, 0, 0, 0, 0]);
          const allTds = document.querySelectorAll("tbody td");
          allTds.forEach((td) => {
            td.className = "";
          });
        }
      });
    }
  }, [stones]);

  return (
    <div className="App">
      <div
        className="wrapper"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div id="player">
          player
          <div>{score[0]}</div>
        </div>
        <div id="tic">
          <table>
            <tbody
              onClick={(ev) => {
                const clickedIndex = +ev.target.getAttribute("id") - 1;
                ev.target.classList.add(isPlayerTurn ? "player" : "computer");
                const clickedStones = JSON.parse(JSON.stringify(stones));
                clickedStones[clickedIndex] = isPlayerTurn ? 11 : 23;
                setStones(clickedStones);
                setPlayerTurn(!isPlayerTurn);
              }}
            >
              <tr>
                <td id="1">1</td>
                <td id="2">2</td>
                <td id="3">3</td>
              </tr>
              <tr>
                <td id="4">4</td>
                <td id="5">5</td>
                <td id="6">6</td>
              </tr>
              <tr>
                <td id="7">7</td>
                <td id="8">8</td>
                <td id="9">9</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="computer">
          computer
          <div style={{ textAlign: "center" }}>{score[1]}</div>
        </div>
      </div>
    </div>
  );
}
