'use client'

import React, { useRef } from 'react';
import Box from "./../../components/box";

export default function Home() {
  const boxIds = Array.from('123456789');

  const poss1 = [1, 2, 3];
  const poss2 = [4, 5, 6];
  const poss3 = [7, 8, 9];
  const poss4 = [1, 4, 7];
  const poss5 = [2, 5, 8];
  const poss6 = [3, 6, 9];
  const poss7 = [3, 5, 7];
  const poss8 = [1, 5, 9];

  const Possibilities = [poss1, poss2, poss3, poss4, poss5, poss6, poss7, poss8];
  var isPlayerXTurn = true;

  const boxRef = useRef([]);

  const checkWin = () => {
    for (let i = 0; i < Possibilities.length; i++) {
      for (let j = 0; j < 1; j++) {
        let box1 = boxRef.current[Possibilities[i][j]];
        let box2 = boxRef.current[Possibilities[i][j + 1]];
        let box3 = boxRef.current[Possibilities[i][j + 2]];
        if (box1.innerHTML !== '' && box2.innerHTML !== '' && box3.innerHTML !== '') {
          if (box1.innerHTML === box2.innerHTML && box2.innerHTML === box3.innerHTML) {
            alert(`Hooray ${box1.innerHTML} You Win`);
            boxRef.current.forEach((box) => {
              box.innerHTML = '';
            });
            return
          } else {
            console.log("Checking...")
          }
        }
      }
    }
  };

  const markBox = (e) => {
    if (e.target.innerHTML === '') {
      e.target.innerHTML = isPlayerXTurn ? 'X' : 'O';
      isPlayerXTurn = !isPlayerXTurn;
    }
  };

  const mark = async (e) => {
    try {
      await markBox(e);
      checkWin();
    } catch (Err) {
      console.log(Err)
    }
  };

  const handleReset = () => {
    boxRef.current.forEach((Box) => {
      Box.innerHTML = ""
    })
  }

  return (
    <div className="tictactoe-board">
      {boxIds.map((id, index) => (
        <Box
          key={id + '1'}
          id={id}
          ref={(el) => (boxRef.current[index + 1] = el)}
          passFunction={(e) => mark(e)}
        />
      ))}

      <div>
        <button onClick={() => handleReset()}> TRY AGAIN </button>
      </div>
    </div>
  );
}
