(function boardFactory() {
  data = [
    [[0], [0], [0]],
    [[0], [0], [0]],
    [[0], [0], [0]],
  ];
  return (board = {
    getRows: () => {
      let rows = "";
      for (const row of data) {
        rows += row.join("");
      }
      return rows;
    },
    getColumns: () => {
      let col1 = "";
      let col2 = "";
      let col3 = "";

      for (const row of data) {
        col1 += row[0];
        col2 += row[1];
        col3 += row[2];
      }
      return col1 + col2 + col3;
    },
    getDiagonals: () => {
      let diag1 = "";
      let diag2 = "";
      for (let index = 0; index < data.length; index++) {
        let reverseIndex = data.length - 1;
        const row = data[index];
        diag1 += row[index];
        diag2 += row[reverseIndex];
        reverseIndex--;
      }
      return diag1 + diag2;
    },
    addMove: (row, column, sign) => {
      data[row][column] = sign;
    },
    log: () => {
      console.log(`
      Rows:       ${board.getRows()}
      Columns:    ${board.getColumns()}
      Diagonals:  ${board.getDiagonals()}

      `);
    },

    render: () => {
      console.clear();
      console.log("-------------");

      for (let index = 0; index < data.length; index++) {
        const row = data[index];
        console.log("| " + row.join(" | ") + " |");
        console.log("-------------");
      }
    },
  });
})();

function game() {
  //Game State
  let gameState = "Playing";
  let isPlaying = gameState === "Playing" ? true : false;
  // Player Data
  const Player = function (name, sign, score) {
    return { name, sign, score };
  };
  const player1 = new Player(
    prompt("Please enter a name for PLAYER 1:", ""),
    "X",
    0
  );
  const player2 = new Player(
    prompt("Please enter a name for PLAYER 2:", ""),
    "O",
    0
  );
  let currentPlayer = null;

  // Game Logic Functions
  const makeMove = (row, cell, sign) => {
    if (row > 2 || row < 0) {
      throw "Cannot make move - Invalid row input";
    }
    if (cell > 2 || cell < 0) {
      throw "Cannot make move - Invalid cell input";
    }
    if (sign !== "X" || sign !== "O") {
      throw "Error: wrong sign entered";
    }
    return board.addMove(row, cell, sign);
  };
  const getMove = () => {
    const row = Number(prompt(`${currentPlayer.name} select row:`));
    const col = Number(prompt(`${currentPlayer.name} select column:`));
    if (!row && !col) {
      getMove();
    }
    if(row < 0 || row > 2 || !row.isNAN()) return getMove()
    if(col < 0 || col > 2 || !col.isNAN()) return getMove()

    return `${row}, ${col}`;
  };
  const endGame = (state, player) => {
    if (gameState === "win") {
      console.clear();
      board.render();
      console.log(`
        Player ${player.name} "${player.sign}" WINS !!!
        *************************
      `);
      player.score++;
    }
    if (gameState === "tie") {
      console.clear();
      board.render();
      console.log(`
      GAME OVER !!!
      the game is tied
      `);
    }
    if (!gameState === "Playing") {
      isPlaying = false;
    }
  };

  const checkEndGame = (rows, cell, diagonals) => {
    const checkWin = (rows, cell, diagonals) => {
      if (rows.includes("XXX") || rows.includes("OOO")) {
        return true;
      }
      if (cell.includes("XXX") || cell.includes("OOO")) {
        return true;
      }
      if (diagonals.includes("XXX") || diagonals.includes("OOO")) {
        return true;
      }
      return false;
    };
    const checkTie = (rows) => {
      if (!rows.includes("0")) {
        return true;
      }
      return false;
    };

    if (checkWin(rows, cell.diaonals) === true) {
      gameState = "win";
      return true;
    }
    if (checkTie(rows) === true) {
      gameState = "tie";
      return true;
    }
    return false;
  };

  // Main Game Loop
  while (isPlaying === true) {
    if (!currentPlayer) {
      currentPlayer = player1;
    }

    makeMove(getMove());
    if (
      checkEndGame(board.getRows(), board.getColumns(), board.getDiagonals())
    ) {
      endGame(gameState, currentPlayer);
      break;
    }

    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  }
}
board.render();
game();
