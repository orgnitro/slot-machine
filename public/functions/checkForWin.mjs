export default function checkForWin(arr) {
  const wild = "6.png";
  let result;

  const winCombs = [
    arr[0][0][1] !== wild && arr[0][0][1] === arr[1][0][1] && arr[1][0][1] === arr[2][0][1],
    arr[0][0][1] === wild && arr[1][0][1] === wild && arr[2][0][1] !== wild,
    arr[0][0][1] === wild && arr[2][0][1] === wild && arr[1][0][1] !== wild,
    arr[1][0][1] === wild && arr[2][0][1] === wild && arr[0][0][1] !== wild,
    arr[0][0][1] === wild && arr[1][0][1] === arr[2][0][1] && arr[1][0][1] !== wild,
    arr[1][0][1] === wild && arr[0][0][1] === arr[2][0][1] && arr[0][0][1] !== wild,
    arr[2][0][1] === wild && arr[0][0][1] === arr[1][0][1]&& arr[0][0][1] !== wild,

    arr[0][1][1] !== wild && arr[0][1][1] === arr[1][1][1] && arr[1][1][1] === arr[2][1][1],
    arr[0][1][1] === wild && arr[1][1][1] === wild && arr[2][1][1] !== wild,
    arr[0][1][1] === wild && arr[2][1][1] === wild && arr[1][1][1] !== wild,
    arr[1][1][1] === wild && arr[2][1][1] === wild && arr[0][1][1] !== wild,
    arr[0][1][1] === wild && arr[1][1][1] === arr[2][1][1] && arr[1][1][1] !== wild,
    arr[1][1][1] === wild && arr[0][1][1] === arr[2][1][1] && arr[0][1][1] !== wild,
    arr[2][1][1] === wild && arr[0][1][1] === arr[1][1][1] && arr[0][1][1] !== wild,

    arr[0][2][1] !== wild && arr[0][2][1] === arr[1][2][1] && arr[1][2][1] === arr[2][2][1],
    arr[0][2][1] === wild && arr[1][2][1] === wild && arr[2][2][1] !== wild,
    arr[0][2][1] === wild && arr[2][2][1] === wild && arr[1][2][1] !== wild,
    arr[1][2][1] === wild && arr[2][2][1] === wild && arr[0][2][1] !== wild,
    arr[0][2][1] === wild && arr[1][2][1] === arr[2][2][1] && arr[2][2][1] !== wild,
    arr[1][2][1] === wild && arr[0][2][1] === arr[2][2][1] && arr[2][2][1] !== wild,
    arr[2][2][1] === wild && arr[0][2][1] === arr[1][2][1] && arr[1][2][1] !== wild
  ];

  for (let i in winCombs) {
    const combinationAt = [i <= 6, 6 < i && i < 14, i >= 14];
    if (winCombs[i] && combinationAt.includes(true)) {
      result = combinationAt.indexOf(true);
      return result;
    }
  }
  return
}