// Sudoku solver function (recursive backtracking)

    function solveSudoku(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isSafe(grid, row, col, num)) {
                        grid[row][col] = num;

                        if (solveSudoku(grid)) {
                            return true;
                        }

                        grid[row][col] = 0; // If not a solution, backtrack
                    }
                }
                return false; // If all numbers have been tried and none work, backtrack
            }
        }
    }
    return true; // Puzzle is solved
}

function isSafe(grid, row, col, num) {
    return (
        !usedInRow(grid, row, num) &&
        !usedInCol(grid, col, num) &&
        !usedInBox(grid, row - (row % 3), col - (col % 3), num)
    );
}

function usedInRow(grid, row, num) {
    return grid[row].includes(num);
}

function usedInCol(grid, col, num) {
    return grid.some(row => row[col] === num);
}

function usedInBox(grid, startRow, startCol, num) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i + startRow][j + startCol] === num) {
                return true;
            }
        }
    }
    return false;
}

// Example Sudoku grid
const sudokuGrid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

if (solveSudoku(sudokuGrid)) {
    console.log("Solved Sudoku:");
    console.log(sudokuGrid);
} else {
    console.log("No solution exists.");
}



// Function to extract the Sudoku grid from the HTML table
function extractSudokuGrid() {
    const grid = [];
    const table = document.getElementById('sudoku-grid');

    for (let row = 0; row < 9; row++) {
        const rowData = [];
        for (let col = 0; col < 9; col++) {
            const cell = table.rows[row].cells[col].querySelector('input');
            const cellValue = cell.value.trim();

            // Ensure the value is either empty or a digit from 1 to 9
            if (cellValue === '' || /^[1-9]$/.test(cellValue)) {
                rowData.push(parseInt(cellValue) || 0);
            } else {
                // Handle invalid input (e.g., non-digit characters)
                alert('Invalid input in Sudoku grid!');
                return null;
            }
        }
        grid.push(rowData);
    }
    return grid;
}

// Function to update the HTML table with the solved Sudoku grid
function updateSudokuTable(solvedGrid) {
    const table = document.getElementById('sudoku-grid');

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = table.rows[row].cells[col].querySelector('input');
            cell.value = solvedGrid[row][col];
        }
    }
}

// Solve Sudoku button click event handler
const solveButton = document.getElementById('solve-button');
solveButton.addEventListener('click', function() {
    const sudokuGrid = extractSudokuGrid();
    if (sudokuGrid) {
        if (solveSudoku(sudokuGrid)) {
            updateSudokuTable(sudokuGrid);
            document.getElementById('solution').innerText = 'Sudoku solved!';
        } else {
            document.getElementById('solution').innerText = 'No solution exists.';
        }
    }
});
