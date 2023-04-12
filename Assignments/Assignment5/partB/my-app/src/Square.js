export default function Square({ value, onSquareClick, style }) {
  let bg = "none";
  if (style){
    bg = "green";
  }

  return (
    <button className="square" style={{background:bg}} onClick={onSquareClick}>
      {value}
    </button>
  );
}