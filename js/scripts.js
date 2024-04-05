(function boardFactory (){
  data = [
    [
      [0],[0],[0]
    ],[
      [0],[0],[0]
    ],[
      [0],[0],[0]
    ]    
  ]
  return board = {
    getRows: ()=>{
      let rows = ""
      for (const row of data) {
        rows += row.join("")
      }
      return rows
    },
    getColumns: ()=>{
      let col1 = ""
      let col2 = ""
      let col3 = ""
      
      for (const row of data) {
        col1 += row[0]
        col2 += row[1]
        col3 += row[2]
      }
      return col1 + col2 + col3
    },
    getDiagonals: ()=>{
      let diag1 = ""
      let diag2 = ""
      for (let index = 0; index < data.length; index++) {
        let reverseIndex = data.length -1
        const row = data[index];
        diag1 += row[index]
        diag2 += row[reverseIndex]
        reverseIndex --        
      }
      return diag1 + diag2
    },
    
  }
})()

console.log(
  `Get Rows: ${board.getRows()}`,"\n",
  `Get Cols: ${board.getColumns()}`,"\n",
  `Get Diags: ${board.getDiagonals()}`,"\n",

  
)