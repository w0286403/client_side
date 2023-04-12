import { useState, useEffect, useRef } from 'react';
import Board from "./Board.js";

function MoveCounter({ currentMove, history }) {
  const [xMoves, setXMoves] = useState(0);
  const [oMoves, setOMoves] = useState(0);

  const prevCurrentMoveRef = useRef();
  const prevHistoryRef = useRef();

  useEffect(() => {
    const prevCurrentMove = prevCurrentMoveRef.current;
    const prevHistory = prevHistoryRef.current;

    let xCount = 0;
    let oCount = 0;
    for (let i = 0; i <= currentMove; i++) {
      const squares = history[i];
      const moves = squares.filter(square => square !== null).length;
      if (i % 2 === 0) {
        xCount += moves;
      } else {
        oCount += moves;
      }
    }

    if (prevCurrentMove !== undefined && prevHistory !== undefined && 
        (prevCurrentMove !== currentMove || prevHistory !== history)) {
      setXMoves(xCount);
      setOMoves(oCount);
    }

    prevCurrentMoveRef.current = currentMove;
    prevHistoryRef.current = history;
  }, [currentMove, history]);

  return (
    <>
      <div>X moves: {xMoves}</div>
      <div>O moves: {oMoves}</div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <MoveCounter currentMove={currentMove} history={history}/>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
