import React, { useState } from 'react';
import GameStatus from './components/GameStatus';
import checkSuperWinner from './components/Board';
import Board from './components/Board';
import './App.css';

function App() {
    const [moves, setMoves] = useState(0);
    const [winner, setWinner] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [miniBoardWinners, setMiniBoardWinners] = useState(Array(9).fill(null));
    const [wins, setWins] = useState({ X: 0, O: 0 });

    const handleWin = (player) => {
        setWinner(player);
        setGameOver(true);

        // Update global win counts
        setWins((prevWins) => ({
            ...prevWins,
            [player]: prevWins[player] + 1,
        }));
    };

    const handleMiniBoardWin = (boardIndex, winner) => {
        const updatedWinners = [...miniBoardWinners];
        updatedWinners[boardIndex] = winner;
        setMiniBoardWinners(updatedWinners);

        const superWinner = checkSuperWinner(updatedWinners);
        if (superWinner) {
            handleWin(superWinner);
        }
    };

    const resetGame = () => {
        setMoves(0);
        setWinner(null);
        setGameOver(false);
        setMiniBoardWinners(Array(9).fill(null));
        setCurrentPlayer('X');
    };

    return (
        <div className="App">
            <h1>Super Tic-Tac-Toe</h1>
            <GameStatus
                moves={moves}
                winner={winner}
                wins={wins}
                currentPlayer={currentPlayer}
            />
            <Board
                onWin={handleMiniBoardWin}
                setMoves={setMoves}
                currentPlayer={currentPlayer}
                setCurrentPlayer={setCurrentPlayer}
                gameOver={gameOver}
            />
            {gameOver && (
                <button className="reset-button" onClick={resetGame}>
                    Play Again
                </button>
            )}
        </div>
    );
}

export default App;
