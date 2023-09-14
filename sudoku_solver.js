
       document.getElementById("solve-button").addEventListener("click", function () {
      // Read input values and create a Sudoku board
      const sudokuBoard = [];
      for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
          const inputElement = document.querySelector(`.sudoku-container .row:nth-child(${i + 1}) .cell:nth-child(${j + 1}) input`);
          row.push(Number(inputElement.value));
        }
        sudokuBoard.push(row);
      }

      // Call the solveSudoku function to solve the puzzle
      
      if (solveSudoku(sudokuBoard)) {
        // Update the HTML to display the solved Sudoku
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            const cellElement = document.querySelector(`.sudoku-container .row:nth-child(${i + 1}) .cell:nth-child(${j + 1})`);
            cellElement.innerHTML = sudokuBoard[i][j];
          }
        }
       
        document.getElementById("solved-sudoku").classList.add("solved");
        
      } else {
        alert("No solution exists.");
      }
    }); 
    // JavaScript code for solving Sudoku
    
      // Implementation of the solveSudoku function (same as provided earlier)
      // ...
      function solveSudoku(board) {
  // Find an empty cell
  const emptyCell = findEmptyCell(board);

  // If there are no empty cells, the puzzle is solved
  if (!emptyCell) {
    return true;
  }

  const [row, col] = emptyCell;

  // Try filling the empty cell with numbers from 1 to 9
  for (let num = 1; num <= 9; num++) {
    if (isValidMove(board, row, col, num)) {
      // If the number is valid, place it in the cell
      board[row][col] = num;

      // Recursively try to solve the rest of the puzzle
      if (solveSudoku(board)) {
        return true; // If the rest of the puzzle is solved, return true
      }

      // If placing the number in this cell doesn't lead to a solution,
      // backtrack and try the next number
      board[row][col] = 0;
    }
  }

  // If no number can be placed in this cell to solve the puzzle, return false
  return false;
}

// Helper function to find an empty cell in the board
function findEmptyCell(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return null; // If there are no empty cells, return null
}

// Helper function to check if a number can be placed in a cell
function isValidMove(board, row, col, num) {
  // Check if the number is already in the row or column
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) {
      return false;
    }
  }

  // Check if the number is already in the 3x3 box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === num) {
        return false;
      }
    }
  }

  return true; // If the number can be placed, return true
}

// Example Sudoku board (0 represents empty cells)
// const sudokuBoard = [
//   [5, 3, 0, 0, 7, 0, 0, 0, 0],
//   [6, 0, 0, 1, 9, 5, 0, 0, 0],
//   [0, 9, 8, 0, 0, 0, 0, 6, 0],
//   [8, 0, 0, 0, 6, 0, 0, 0, 3],
//   [4, 0, 0, 8, 0, 3, 0, 0, 1],
//   [7, 0, 0, 0, 2, 0, 0, 0, 6],
//   [0, 6, 0, 0, 0, 0, 2, 8, 0],
//   [0, 0, 0, 4, 1, 9, 0, 0, 5],
//   [0, 0, 0, 0, 8, 0, 0, 7, 9],
// ];

if (solveSudoku(sudokuBoard)) {
  console.log("Solved Sudoku:");
  console.log(sudokuBoard);
} else {
  console.log("No solution exists.");
}

      // The rest of the code remains the same
    

    





