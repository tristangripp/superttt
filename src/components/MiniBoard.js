import React, { useState } from 'react';
import './MiniBoard.css';

const MiniBoard = ({ isSelected, isInactive, onSelect, onWin, gameOver }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);

  const checkWinner = (newBoard) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6],            // Diagonals
    ];
    for (let [a, b, c] of lines) {
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }
    return null;
  };

  const handleMove = (index) => {
    if (board[index] || winner || gameOver || isInactive) return;

    const currentPlayer = board.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    setBoard(newBoard);

    const boardWinner = checkWinner(newBoard);
    if (boardWinner) {
      setWinner(boardWinner);
      onWin(boardWinner); // Notify parent of the win
    }
  };

  return (
      <div
          className={`mini-board ${isSelected ? 'selected' : ''} ${isInactive ? 'inactive' : ''}`}
          onClick={onSelect}
      >
        {board.map((cell, i) => (
            <div key={i} className="cell" onClick={() => handleMove(i)}>
              {cell}
            </div>
        ))}
        {winner && <div className="winner-overlay">{winner} Wins!</div>}
      </div>
  );
};

export default MiniBoard;
