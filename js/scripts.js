const board = (function () {
  let data = [
    [[0], [0], [0]],
    [[0], [0], [0]],
    [[0], [0], [0]],
  ];
  const getRows = () => {
    let rows = "";
    for (const row of data) {
      rows += row.join("") + ",";
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
    return `${col1}, ${col2},${col3}`
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
    return `${diag1}, ${diag2}`;
  };

  /**
   * Description
   * @param {number} row
   * @param {number} column
   * @param {string} sign
   * @returns {void}
   */
  const addMove = (row, column, sign) => {
    if (data[row][column] === "X" || data[row][column] === "O")
      throw "Cell Not Empty";
    if (data[row][column] == 0) {
      data[row][column] = sign;
    }
  };
  const reset = () => {
    userInterface.reset()
    return data = [
      [
        [0],[0],[0]
      ],[
        [0],[0],[0]
      ],[
        [0],[0],[0]
      ]
    ]
  };
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

  return { getRows, getColumns, getDiagonals, addMove, reset, log, render };
})();

const game = (function () {
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
  let player1;
  let player2;
  let currentPlayer;
  const createPlayers = (name1, sign1, score1, name2, sign2, score2) => {
    player1 = new Player(name1, sign1, score1);
    player2 = new Player(name2, sign2, score2);
    currentPlayer = player1;
  };
  const getCurrentPlayer = () => {
    return currentPlayer;
  };
  const setCurrentPlayer = () => {
    if (currentPlayer === player2) {
      return currentPlayer = player1;
    } else {
      return currentPlayer = player2;
    }
  };

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

    let boardState = {
      rows: board.getRows(),
      columns: board.getColumns(),
      diagonals: board.getDiagonals(),
    };

    board.addMove(row, cell, sign);
    boardState = {
      rows: board.getRows(),
      columns: board.getColumns(),
      diagonals: board.getDiagonals(),
    };
    if (
      checkEndGame(boardState.rows, boardState.columns, boardState.diagonals)
    ) {
      endGame();
      return;
    }
    
  };

  /**
   * Description
   * @param {"win" || "tie" || "Playing"} state
   * @param {Player} player
   * @returns {void}
   */
  const endGame = () => {
    if (gameState === "win") {
      board.reset();
      console.log(`
        Player ${currentPlayer.name} "${currentPlayer.sign}" WINS !!!
        *************************
      `);
      alert(`Player ${currentPlayer.name} ${currentPlayer.sign} WINS!!!`)
      currentPlayer.score++;
      isPlaying = false;
    }
    if (gameState === "tie") {
      board.reset();
      console.log(`
      GAME OVER !!!
      the game is tied
      `);
      alert(`Game Over : Game is a tie!`)
      isPlaying = false;
    }
    if (!gameState === "Playing") {
      isPlaying = false;
    }
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
      console.log(board.log())
     
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

  return {
    createPlayers,
    getCurrentPlayer,
    setCurrentPlayer,
    makeMove,
  };
})();

const userInterface = (() => {
  const elements = (() => {
    return {
      newGame: document.querySelector("#newGame"),
      startGameButton: document.querySelector("#startGame"),
      player1: {
        nameInput: document.querySelector("#playerName1"),
        signSelect: document.querySelector("#playerSign1"),
        scoreSpan: document.querySelector("#playerScore1"),
      },
      player2: {
        nameInput: document.querySelector("#playerName2"),
        signSelect: document.querySelector("#playerSign2"),
        scoreSpan: document.querySelector("#playerScore2"),
      },
      cells: document.querySelectorAll(".cell"),
      resultDialog: document.querySelector("dialog#gameResult"),
    };
  })();
  console.log(elements.player1)

  // Event Handlers
  const handleCellClick = (e) => {
    const element = e.target;
    const row = element.dataset.row;
    const column = element.dataset.cell;
    const sign = game.getCurrentPlayer().sign;

    if (!row || !column || !sign) throw "Error: varlieble is not set";
    element.dataset.sign = sign;
    game.makeMove(row, column, sign);
    game.setCurrentPlayer();
  };
  const handleNewGame = (e) => {
    playerName1 = "";
    playerSign1 = "";
    playerName2 = "";
    playerSign2 = "";

    elements.player1.nameInput.disabled = false;
    elements.player1.signSelect.disabled = false;
    elements.startGameButton.disabled = false;
    elements.newGame.disabled = true;
    elements.player1.nameInput.addEventListener("change", () => {
      playerName1 = elements.player1.nameInput.value;
    });
    elements.player1.signSelect.addEventListener("change", () => {
      playerSign1 = elements.player1.signSelect.value;

      if (playerSign1 === "X") {
        playerSign2 = "O";
      } else if (playerSign1 === "O") {
        playerSign2 = "X";
      }

      elements.player2.nameInput.disabled = false;
      elements.player2.signSelect.value = playerSign2;
      elements.player2.nameInput.focus();
    });
    elements.player2.nameInput.addEventListener("change", (e) => {
      elements.newGame.disabled = false;
      playerName2 = elements.player2.nameInput.value;
    });
    elements.startGameButton.addEventListener("click", () => {

      elements.player1.signSelect.disabled = true;
      elements.player1.nameInput.disabled = true;
      elements.player2.nameInput.disabled = true;

      game.createPlayers(
        playerName1,
        playerSign1,
        0,
        playerName2,
        playerSign2,
        0
      );
    });

    elements.cells.forEach((cell) =>{
      cell.addEventListener("click", handleCellClick)
      cell.classList.remove('disabled')

    }
    );
  };

  // Utility functions
  const reset = () =>{
    for (const cell of elements.cells) {
      cell.dataset.sign = ""
      cell.classList.add('disabled')
      elements.player1.nameInput = ""
      elements.player1.signSelect = ""
      elements.player2.nameInput = ""

      
    }
  }

  // Event Listeners
  elements.newGame.addEventListener("click", handleNewGame);

  return {
    reset,
  }
})();

// game();
