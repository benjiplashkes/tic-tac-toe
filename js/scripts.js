const board = (function() {

  const data = [
    [[0], [0], [0]],
    [[0], [0], [0]],
    [[0], [0], [0]],
  ];
  const getRows = () => {
    let rows = "";
    for (const row of data) {
      rows += row.join("");
    }
    return rows;
  };
  const getColumns = () => {
    let col1 = "";
    let col2 = "";
    let col3 = "";

    for (const row of data) {
      col1 += row[0];
      col2 += row[1];
      col3 += row[2];
    }
    return col1 + col2 + col3;
  };
  const getDiagonals = () => {
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
  };
  
  
  /**
   * Description
   * @param {number} row
   * @param {number} column
   * @param {string} sign
   * @returns {void}
   */
  const addMove = (row, column, sign) => {
    if(data[row][column] === "X" || data[row][column] === "O") throw "Cell Not Empty"
    if(data[row][column] == 0 ) {
      data[row][column] = sign
    }
  };
  const reset = () => {
    for(row of data){
      for(cell of row){
        row[cell] = 0
      }
    }

  }
  const log = () => {
    console.log(`
      Rows:       ${board.getRows()}
      Columns:    ${board.getColumns()}
      Diagonals:  ${board.getDiagonals()}

      `);
  };

  const render = () => {
    console.clear();
    console.log("-------------");

    for (let index = 0; index < data.length; index++) {
      const row = data[index];
      console.log("| " + row.join(" | ") + " |");
      console.log("-------------");
    }
  };

  return ( {getRows, getColumns, getDiagonals, addMove, reset, log, render} );
})()

function game() {
  //Game State
  let gameState = "Playing";
  let isPlaying = gameState === "Playing" ? true : false;
  // Player Data
  /**
   * Description
   * @param {String} name
   * @param {String} sign
   * @param {Number} score
   * @returns {Object}
   */
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
  let currentPlayer = player1;

  // Game Logic Functions
  /**
   * Description
   * @param {Number} row
   * @param {Number} cell
   * @param {"X" || "O"} sign
   * @returns {void}
   */
  const makeMove = (row, cell, sign) => {
    if (row > 2 || row < 0) {
      throw "Cannot make move - Invalid row input";
    }
    if (cell > 2 || cell < 0) {
      throw "Cannot make move - Invalid cell input";
    }
    if (!sign === "X" || !sign === "O") {
      throw "Error: wrong sign entered";
    }

    board.addMove(row, cell, sign);
  };
  const getMove = () => {
    const row = Number(prompt(`${currentPlayer.name} select row:`));
    const column = Number(prompt(`${currentPlayer.name} select column:`));

    if (row > 2 || row < 0) {
      throw "getMove() - wrong row size ";
    }
    if (column > 2 || column < 0) {
      throw "getMove() - wrong column size";
    }
    return { row, column: column };
  };
  /**
   * Description
   * @param {"win" || "tie" || "Playing"} state
   * @param {Player} player
   * @returns {void}
   */
  const endGame = () => {
    if (gameState === "win") {
      console.clear();
      board.render();
      console.log(`
        Player ${currentPlayer.name} "${currentPlayer.sign}" WINS !!!
        *************************
      `);
      currentPlayer.score++;
      isPlaying = false;
    }
    if (gameState === "tie") {
      console.clear();
      board.render();
      console.log(`
      GAME OVER !!!
      the game is tied
      `);
      isPlaying = false;
    }
    if (!gameState === "Playing") {
      isPlaying = false;
    }
    board.resetBoard()

  };

  /**
   * Description
   * @param {String} rows
   * @param {String} cell
   * @param {String} diagonals
   * @returns {Boolean}
   */
  const checkEndGame = (rows, cell, diagonals) => {
    const checkWin = () => {
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
    const checkTie = () => {
      if (!checkWin() && rows.includes("0")) {
        return false;
      }
      return true;
    };

    if (checkWin() === true) {
      gameState = "win";
      return true;
    }
    if (checkTie() === true) {
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
    const move = getMove();
    makeMove(move.row, move.column, currentPlayer.sign);
    const boardState = {
      rows: board.getRows(),
      columns: board.getColumns(),
      diagonals: board.getDiagonals(),
    };
    if (
      checkEndGame(boardState.rows, boardState.columns, boardState.diagonals)
    ) {
      endGame();
      break;
    }
    board.render();
    if (currentPlayer === player2) {
      currentPlayer = player1;
    } else {
      currentPlayer = player2;
    }
  }
}
board.reset()
board.render();
game();
