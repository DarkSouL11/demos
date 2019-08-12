import Board, { fillTypes } from "./models/board";

const RENDERERS = {
  renderGame: function(board) {
    const element = document.getElementById("board");
    let boardHtml = `<div class="game">`;
    board.matrix.forEach((row, rowIndex) => {
      boardHtml += `<div class="game-row">`;
      row.forEach((col, colIndex) => {
        const cellClasses = ["game-cell"];
        if (col === fillTypes.FOOD) cellClasses.push("food");
        if (col === fillTypes.SNAKE) cellClasses.push("snake");
        if (board.snake.isHead([rowIndex, colIndex])) {
          cellClasses.push("is-head");
        }

        boardHtml += `
        <div class="${cellClasses.join(" ")}">
        </div>
        `;
      });
      boardHtml += `</div>`;
    });
    boardHtml += `</div>`;

    element.innerHTML = boardHtml;
  },
  renderScore: function(board) {
    const element = document.getElementById("score");
    element.innerText = board.score;
  },
  renderStatus: function(board) {
    if (board.ended) {
      const element = document.getElementById("status");
      element.innerText = "Game ended";
    }
  },
  renderButton: function(board) {
    const button = document.getElementById("action");
    if (board.active) {
      button.innerText = "Reset Game";
      button.className = "button is-danger";
    } else if (board.ended) {
      button.innerText = "Restart Game";
      button.className = "button";
    } else {
      button.innerText = "Start Game";
      button.className = "button";
    }
  }
};

const STATE = {
  board: new Board(40, 40, RENDERERS),
  reset: function() {
    STATE.board.stop();
    STATE.board = new Board(40, 40, RENDERERS);
  }
};

const LISTENERS = {
  start: function() {
    const startButton = document.getElementById("action");
    startButton.addEventListener("click", () => {
      if (STATE.board.started) {
        STATE.reset();
        STATE.board.start();
      } else {
        STATE.board.start();
      }
    });
  },
  actions: function() {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
        case 38:
        case 39:
        case 40:
          STATE.board.changeDirection(event.keyCode);
          break;
        default:
        // Ignore
      }
    });
  }
};

for (const x in LISTENERS) {
  LISTENERS[x]();
}
