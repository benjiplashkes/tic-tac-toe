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

function game(){
  //Game State
  let isPlaying = true
  // Player Data
  const Player = function(name, sign, score){
    return {name, sign,score}
  }
  const player1 = new Player(prompt("Please enter a name for PLAYER 1:", ""), "X", 0)
  const player2 = new Player(prompt("Please enter a name for PLAYER 2:", ""), "O", 0)
  let currentPlayer = ""

  // Game Logic Functions

  // Main Game Loop
  while(isPlaying){

  }
}

board.render()
game()
