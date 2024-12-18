import React, { useState } from 'react';
import Board from './components/Board';
import GameStatus from './components/GameStatus';
import './App.css';

function App() {
    const [moves, setMoves] = useState(0);
    const [winner, setWinner] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const handleWin = (player) => {
        setWinner(player);
        setGameOver(true);
    };

    const resetGame = () => {
        setMoves(0);
        setWinner(null);
        setGameOver(false);
    };

    return (
        <div className="App">
            <h1>Super Tic-Tac-Toe</h1>
            <GameStatus moves={moves} winner={winner} />
            <Board onWin={handleWin} setMoves={setMoves} gameOver={gameOver} />
            {gameOver && <button onClick={resetGame}>Play Again</button>}
        </div>
    );
}
console.log("App component loaded");

export default App;
