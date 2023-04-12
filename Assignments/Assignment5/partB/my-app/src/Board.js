import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }
      onPlay(nextSquares);
    }
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner[0];

    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
  
    return (
      <>
        <div className="status">{status}</div>
        <div className="board-row">
          <Square value={squares[0]} style={ winner ? winner?.includes(0) ? true : false : false} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} style={ winner ? winner?.includes(2) ? true : false : false} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} style={ winner ? winner?.includes(3) ? true : false : false} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} style={ winner ? winner?.includes(4) ? true : false : false} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} style={ winner ? winner?.includes(5) ? true : false : false} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} style={ winner ? winner?.includes(6) ? true : false : false} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} style={ winner ? winner?.includes(7) ? true : false : false} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} style={ winner ? winner?.includes(8) ? true : false : false} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} style={ winner ? winner?.includes(9) ? true : false : false} onSquareClick={() => handleClick(8)} />
        </div>
      </>
    );
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a,b,c];
      }
    }
    return null;
  }