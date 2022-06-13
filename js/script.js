const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const restartBtn = document.querySelector("[data-restart-btn]");
const winningMessage = document.querySelector("[data-winning-message]");

let isCircleTurn;

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Funções

const startGame = () => {
  isCircleTurn = false;

  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
  winningMessage.classList.remove("showWinningMessage");
};

const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = "Empate";
  } else {
    winningMessageTextElement.innerText = isCircleTurn
      ? "Bola Venceu"
      : "X Venceu";
  }

  winningMessage.classList.add("showWinningMessage");
};

const checkWin = (currentPlayer) => {
  return winningCombination.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, addClass) => {
  cell.classList.add(addClass);
};

const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

const swapTurn = () => {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};

const handleClick = (e) => {
  // Colocar a marcação

  const cell = e.target;
  const addClass = isCircleTurn ? "circle" : "x";

  placeMark(cell, addClass);

  // Verificar vitoria

  const isWin = checkWin(addClass);

  // Verificar empate

  const isDraw = checkDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    // Mudar simbolo
    swapTurn();
  }
};

startGame();

restartBtn.addEventListener("click", startGame);
