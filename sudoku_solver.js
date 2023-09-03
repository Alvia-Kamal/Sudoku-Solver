// Sudoku solver function (recursive backtracking)
function solveSudoku(grid) {
    // Your Sudoku solving code (as shown in previous answers)
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
