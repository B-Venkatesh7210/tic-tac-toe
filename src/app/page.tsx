"use client";
import React from "react";
import { useState } from "react";

export default function Home() {

  const [isXturn, setisXTurn] = useState(true);
  const [board, setBoard] = useState<string[]>(["", "", "", "", "", "", "", "", ""])
  const [history, setHistory] = useState<string[][]>([]);

  const handleClick = (index: any) => {
    if(board[index]!== "" || winner){
      return;
    }
    setHistory([...history, board])
    const newBoard = [...board];
    newBoard[index] = isXturn ? "X" : "O";
    setBoard(newBoard);
    setisXTurn(!isXturn);
  }

  const resetGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setHistory([])
    setisXTurn(true)
  }

  const checkWinner = (currentBoard: any) => {
    const winningPatterns = [
      [0,1,2],
      [3,4,5],
      [6,4,2]
    ]

    for(let pattern of winningPatterns){
      const [a,b,c] = pattern;
      if(currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c])
      {
        return currentBoard[a];
      }
    }

    return null;
  }

  const undoMove = () => {
    if(history.length === 0) {
      return;
    }
    const prev = history[history.length - 1]
    setBoard(prev);
    setHistory(history.slice(0,history.length-1))
    setisXTurn(!isXturn);
  }

  const winner = checkWinner(board);



  return (
    <main>
      <h1>Tic Tac Toe</h1>
      <h2>{winner ? `Winner: ${winner}` : `Turn: ${isXturn ? "X" : "O"}`}</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 80px)",
        gap: "8px",
        justifyContent: "center",
        margin: "20px"
      }}>
        {board.map((value, index) => (
          <button style={{
            width: "80px",
            height: "80px",
            fontSize: "40px"
          }} key={index} onClick={() => handleClick(index)}>
{value}
          </button>
        ))}

      </div>
      <button onClick={resetGame}>Reset</button>
      <button onClick={undoMove}>Undo</button>
    </main>
  );
}
